import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import re
import ipaddress
import httpx
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from lib.db import client, db, ensure_indexes


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.index_task = asyncio.create_task(ensure_indexes())
    yield
    client.close()


app = FastAPI(lifespan=lifespan)
api_router = APIRouter(prefix="/api")


class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


class EnquiryCreate(BaseModel):
    name: str
    company: Optional[str] = None
    email: EmailStr
    phone: Optional[str] = None
    project_type: Optional[str] = None
    location: Optional[str] = None
    requirement: Optional[str] = None
    message: str

class Enquiry(EnquiryCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Pushpalata Infratech")
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL")

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)

def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)

def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)

class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []
    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []
    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)
    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []

def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan(); scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")

async def send_email(*, to: str, subject: str, html: str) -> "str | None":
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if EMAIL_REPLY_TO:
        payload["contact_email"] = EMAIL_REPLY_TO
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")

def _enquiry_email_html(e: Enquiry) -> str:
    rows = [
        ("Name", e.name), ("Company", e.company), ("Email", e.email), ("Phone", e.phone),
        ("Project Type", e.project_type), ("Location", e.location),
        ("Approximate Requirement", e.requirement), ("Message", e.message),
    ]
    trs = "".join(
        f'<tr><td style="padding:8px 14px;border:1px solid #e1dcd0;font-family:Arial,sans-serif;'
        f'font-size:12px;color:#5c6660;text-transform:uppercase;letter-spacing:1px">{k}</td>'
        f'<td style="padding:8px 14px;border:1px solid #e1dcd0;font-family:Arial,sans-serif;'
        f'font-size:14px;color:#131a17">{escape(v) if v else "-"}</td></tr>'
        for k, v in rows
    )
    return (
        '<table role="presentation" width="100%" style="background:#f8f6f1;padding:24px"><tr><td>'
        '<table role="presentation" width="100%" style="max-width:640px;background:#ffffff">'
        '<tr><td style="background:#0a261e;padding:18px 24px;font-family:Arial,sans-serif;'
        'font-size:16px;font-weight:bold;color:#f8f6f1">New Project Enquiry &mdash; '
        f'{escape(EMAIL_FROM_NAME)}</td></tr>'
        f'<tr><td style="padding:20px 24px"><table role="presentation" width="100%">{trs}</table></td></tr>'
        '<tr><td style="padding:14px 24px;font-family:Arial,sans-serif;font-size:11px;color:#888">'
        f'Sent by the {escape(EMAIL_FROM_NAME)} website enquiry form &mdash; '
        '<a href="https://pushpalatainfratech.com">pushpalatainfratech.com</a></td></tr>'
        '</table></td></tr></table>'
    )


@api_router.get("/")
async def root():
    return {"message": "Pushpalata Infratech API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    _ = await db.status_checks.insert_one(status_obj.model_dump())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    docs = await db.status_checks.find().to_list(1000)
    out = []
    for d in docs:
        d.pop("_id", None)
        ts = d.get("timestamp")
        if isinstance(ts, datetime) and ts.tzinfo is None:
            d["timestamp"] = ts.replace(tzinfo=timezone.utc)
        out.append(StatusCheck(**d))
    return out

@api_router.post("/enquiries", response_model=Enquiry)
async def create_enquiry(input: EnquiryCreate):
    enquiry = Enquiry(**input.model_dump())
    _ = await db.enquiries.insert_one(enquiry.model_dump())
    if EMAIL_KEY and OWNER_EMAIL:
        try:
            email_id = await send_email(
                to=OWNER_EMAIL,
                subject=f"New Project Enquiry — {enquiry.name}",
                html=_enquiry_email_html(enquiry),
            )
            logger.info(f"Enquiry notification email sent: {email_id}")
        except Exception as e:
            logger.error(f"Enquiry saved but notification email failed: {e}")
    return enquiry

@api_router.get("/enquiries", response_model=List[Enquiry])
async def list_enquiries():
    docs = await db.enquiries.find().sort("created_at", -1).to_list(1000)
    out = []
    for d in docs:
        d.pop("_id", None)
        ts = d.get("created_at")
        if isinstance(ts, datetime) and ts.tzinfo is None:
            d["created_at"] = ts.replace(tzinfo=timezone.utc)
        out.append(Enquiry(**d))
    return out


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
