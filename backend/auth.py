import os
import uuid
import logging
from datetime import datetime, timedelta, timezone
from typing import Optional

import bcrypt
import jwt
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from pydantic import BaseModel, EmailStr

from lib.db import db

logger = logging.getLogger(__name__)

JWT_SECRET = os.environ["JWT_SECRET"]
ADMIN_EMAIL = os.environ["ADMIN_EMAIL"].lower()
ADMIN_PASSWORD = os.environ["ADMIN_PASSWORD"]
ACCESS_TTL = timedelta(hours=12)
COOKIE = "admin_token"
MAX_ATTEMPTS = 5
LOCK_WINDOW = timedelta(minutes=15)

router = APIRouter(prefix="/api/admin/auth", tags=["admin-auth"])


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class AdminOut(BaseModel):
    id: str
    email: str


async def ensure_admin_user():
    if await db.users.find_one({"email": ADMIN_EMAIL}):
        return
    pw_hash = bcrypt.hashpw(ADMIN_PASSWORD.encode(), bcrypt.gensalt(12)).decode()
    await db.users.insert_one({
        "id": str(uuid.uuid4()), "email": ADMIN_EMAIL, "password_hash": pw_hash, "role": "admin",
        "created_at": datetime.now(timezone.utc),
    })
    logger.info("Seeded admin user")


def _token(user_id: str) -> str:
    now = datetime.now(timezone.utc)
    return jwt.encode({"sub": user_id, "role": "admin", "iat": now, "exp": now + ACCESS_TTL}, JWT_SECRET, algorithm="HS256")


async def _locked(email: str) -> bool:
    since = datetime.now(timezone.utc) - LOCK_WINDOW
    n = await db.login_attempts.count_documents({"email": email, "at": {"$gte": since}})
    return n >= MAX_ATTEMPTS


async def current_admin(request: Request) -> dict:
    token = request.cookies.get(COOKIE)
    if not token:
        auth = request.headers.get("Authorization", "")
        token = auth[7:] if auth.startswith("Bearer ") else None
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Session expired, please log in again")
    user = await db.users.find_one({"id": payload.get("sub"), "role": "admin"}, {"_id": 0, "password_hash": 0})
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user


@router.post("/login", response_model=AdminOut)
async def login(body: LoginIn, response: Response):
    email = body.email.lower()
    if await _locked(email):
        raise HTTPException(status_code=429, detail="Too many attempts. Try again in 15 minutes.")
    user = await db.users.find_one({"email": email, "role": "admin"})
    ok = bool(user) and bcrypt.checkpw(body.password.encode(), user["password_hash"].encode())
    if not ok:
        await db.login_attempts.insert_one({"email": email, "at": datetime.now(timezone.utc)})
        raise HTTPException(status_code=401, detail="Invalid email or password")
    await db.login_attempts.delete_many({"email": email})
    response.set_cookie(
        COOKIE, _token(user["id"]), httponly=True, secure=True, samesite="lax",
        max_age=int(ACCESS_TTL.total_seconds()), path="/",
    )
    return AdminOut(id=user["id"], email=user["email"])


@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(COOKIE, path="/")
    return {"ok": True}


@router.get("/me", response_model=AdminOut)
async def me(user: dict = Depends(current_admin)):
    return AdminOut(id=user["id"], email=user["email"])


AdminDep = Depends(current_admin)
