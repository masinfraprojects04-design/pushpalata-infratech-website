"""Tests for /api/applications (career resume upload) and regressions."""
import io
import os
import asyncio
import pytest
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "app")

MIN_PDF = b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF\n"


def _mp(name="qa-test", email="qa-test@example.com", phone="+919999999999",
        discipline="Lineman", extra=None, resume=("resume.pdf", MIN_PDF, "application/pdf")):
    data = {"name": name, "email": email, "phone": phone, "discipline": discipline}
    if extra:
        data.update(extra)
    files = {"resume": resume} if resume else {}
    return data, files


# --- POST /api/applications: happy path ---
def test_create_application_success(client):
    data, files = _mp()
    r = client.post("/applications", data=data, files=files)
    assert r.status_code == 200, r.text
    body = r.json()
    assert body["id"]
    assert body["resume_filename"] == "resume.pdf"
    assert body["resume_size"] == len(MIN_PDF)
    assert "created_at" in body
    # Ensure sensitive fields are NOT leaked in the response
    assert "download_token" not in body
    assert "stored_name" not in body


# --- POST /api/applications: wrong file type ---
def test_create_application_wrong_content_type(client):
    data, files = _mp(resume=("photo.png", b"\x89PNG\r\n\x1a\n", "image/png"))
    r = client.post("/applications", data=data, files=files)
    assert r.status_code == 400
    assert "PDF" in r.json()["detail"]


# --- POST /api/applications: missing required ---
def test_create_application_missing_required(client):
    files = {"resume": ("r.pdf", MIN_PDF, "application/pdf")}
    r = client.post("/applications", data={"email": "a@b.com"}, files=files)
    assert r.status_code == 422


# --- POST /api/applications: too large ---
def test_create_application_too_large(client):
    big = b"%PDF-1.4\n" + b"0" * (5 * 1024 * 1024 + 10)
    data, files = _mp(resume=("big.pdf", big, "application/pdf"))
    r = client.post("/applications", data=data, files=files)
    assert r.status_code == 400
    assert "5" in r.json()["detail"]


# --- GET /api/applications/{id}/resume: wrong token 404 ---
def test_download_resume_wrong_token(client):
    data, files = _mp(email="qa-test-dl@example.com")
    r = client.post("/applications", data=data, files=files)
    assert r.status_code == 200
    app_id = r.json()["id"]
    r2 = client.get(f"/applications/{app_id}/resume", params={"token": "nope-nope-nope"})
    assert r2.status_code == 404


# --- GET /api/applications/{id}/resume: valid token from mongo works ---
def test_download_resume_valid_token(client):
    data, files = _mp(email="qa-test-dl2@example.com")
    r = client.post("/applications", data=data, files=files)
    assert r.status_code == 200
    app_id = r.json()["id"]

    async def _get_token():
        c = AsyncIOMotorClient(MONGO_URL)
        try:
            doc = await c[DB_NAME].applications.find_one({"id": app_id})
            return doc.get("download_token") if doc else None
        finally:
            c.close()

    token = asyncio.get_event_loop().run_until_complete(_get_token())
    assert token, "download_token should exist in Mongo"
    r2 = client.get(f"/applications/{app_id}/resume", params={"token": token})
    assert r2.status_code == 200
    assert r2.headers["content-type"].startswith("application/pdf") or \
           r2.headers["content-type"].startswith("application/octet-stream")
    assert r2.content.startswith(b"%PDF")


# --- Regression: POST /api/enquiries ---
def test_enquiries_regression(client):
    payload = {"name": "QA Test", "email": "qa-test@example.com", "message": "regression"}
    r = client.post("/enquiries", json=payload)
    assert r.status_code == 200, r.text
    body = r.json()
    assert body["name"] == "QA Test"
    assert body["email"] == "qa-test@example.com"
    assert "id" in body


# --- Cleanup TEST_ / qa-test@ records + files ---
def test_zzz_cleanup():
    async def _cleanup():
        from pathlib import Path
        c = AsyncIOMotorClient(MONGO_URL)
        try:
            coll = c[DB_NAME].applications
            docs = await coll.find({"email": {"$regex": "^qa-test"}}).to_list(1000)
            up = Path("/app/backend/uploads/resumes")
            for d in docs:
                sn = d.get("stored_name")
                if sn:
                    p = up / sn
                    if p.exists():
                        p.unlink()
            await coll.delete_many({"email": {"$regex": "^qa-test"}})
            await c[DB_NAME].enquiries.delete_many({"email": {"$regex": "^qa-test"}})
        finally:
            c.close()
    asyncio.get_event_loop().run_until_complete(_cleanup())
