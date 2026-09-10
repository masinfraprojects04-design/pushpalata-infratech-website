"""Admin auth + admin-only endpoints tests (iteration 2)."""
import os
import io
import pytest
import requests
from pymongo import MongoClient

BASE_URL = "https://pushpa-transmission.preview.emergentagent.com"
ADMIN_EMAIL = "admin@pushpalatainfratech.com"
ADMIN_PASSWORD = "Pushpalata@2026"
LOCK_EMAIL = "lock-test@example.com"

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "app")


@pytest.fixture(scope="module")
def mongo():
    c = MongoClient(MONGO_URL)
    yield c[DB_NAME]
    c.close()


@pytest.fixture(scope="module")
def admin_session():
    s = requests.Session()
    r = s.post(f"{BASE_URL}/api/admin/auth/login",
               json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=30)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["email"] == ADMIN_EMAIL
    assert "id" in data
    # cookie was set
    assert "admin_token" in s.cookies.get_dict()
    return s


# ---------- Auth ----------
def test_login_wrong_password():
    r = requests.post(f"{BASE_URL}/api/admin/auth/login",
                      json={"email": ADMIN_EMAIL, "password": "wrong-xyz"}, timeout=30)
    assert r.status_code == 401
    assert "Invalid email or password" in r.json().get("detail", "")


def test_me_without_cookie():
    r = requests.get(f"{BASE_URL}/api/admin/auth/me", timeout=30)
    assert r.status_code == 401


def test_me_with_cookie(admin_session):
    r = admin_session.get(f"{BASE_URL}/api/admin/auth/me", timeout=30)
    assert r.status_code == 200
    assert r.json()["email"] == ADMIN_EMAIL


def test_bearer_token_works(admin_session):
    token = admin_session.cookies.get("admin_token")
    assert token
    r = requests.get(f"{BASE_URL}/api/admin/auth/me",
                     headers={"Authorization": f"Bearer {token}"}, timeout=30)
    assert r.status_code == 200


def test_logout_clears_cookie():
    s = requests.Session()
    r = s.post(f"{BASE_URL}/api/admin/auth/login",
               json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=30)
    assert r.status_code == 200
    r = s.post(f"{BASE_URL}/api/admin/auth/logout", timeout=30)
    assert r.status_code == 200
    # After logout, /me should be 401 using the same session (cookie cleared)
    r2 = s.get(f"{BASE_URL}/api/admin/auth/me", timeout=30)
    assert r2.status_code == 401


# ---------- Admin-only lists ----------
def test_enquiries_requires_auth():
    r = requests.get(f"{BASE_URL}/api/enquiries", timeout=30)
    assert r.status_code == 401


def test_enquiries_with_cookie(admin_session):
    r = admin_session.get(f"{BASE_URL}/api/enquiries", timeout=30)
    assert r.status_code == 200
    assert isinstance(r.json(), list)


def test_applications_requires_auth():
    r = requests.get(f"{BASE_URL}/api/applications", timeout=30)
    assert r.status_code == 401


def test_applications_with_cookie(admin_session):
    r = admin_session.get(f"{BASE_URL}/api/applications", timeout=30)
    assert r.status_code == 200
    assert isinstance(r.json(), list)


# ---------- Resume download (admin) ----------
@pytest.fixture(scope="module")
def created_application(mongo):
    tiny_pdf = b"%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF"
    files = {"resume": ("test.pdf", io.BytesIO(tiny_pdf), "application/pdf")}
    data = {
        "name": "qa-test-admin",
        "email": "qa-test-admin@example.com",
        "phone": "9999999999",
        "discipline": "Testing",
    }
    r = requests.post(f"{BASE_URL}/api/applications", data=data, files=files, timeout=30)
    assert r.status_code == 200, r.text
    app_id = r.json()["id"]
    yield app_id
    # cleanup
    doc = mongo.applications.find_one({"id": app_id})
    if doc:
        try:
            from pathlib import Path
            p = Path("/app/backend/uploads/resumes") / doc.get("stored_name", "")
            if p.exists():
                p.unlink()
        except Exception:
            pass
    mongo.applications.delete_many({"id": app_id})


def test_admin_resume_download_unauth(created_application):
    r = requests.get(f"{BASE_URL}/api/admin/applications/{created_application}/resume", timeout=30)
    assert r.status_code == 401


def test_admin_resume_download_ok(admin_session, created_application):
    r = admin_session.get(f"{BASE_URL}/api/admin/applications/{created_application}/resume", timeout=30)
    assert r.status_code == 200
    assert r.content.startswith(b"%PDF")


def test_admin_resume_download_404(admin_session):
    r = admin_session.get(f"{BASE_URL}/api/admin/applications/does-not-exist/resume", timeout=30)
    assert r.status_code == 404


# ---------- Brute force ----------
def test_brute_force_lockout(mongo):
    # ensure clean slate
    mongo.login_attempts.delete_many({"email": LOCK_EMAIL})
    for _ in range(5):
        r = requests.post(f"{BASE_URL}/api/admin/auth/login",
                          json={"email": LOCK_EMAIL, "password": "nope"}, timeout=30)
        assert r.status_code == 401
    r = requests.post(f"{BASE_URL}/api/admin/auth/login",
                      json={"email": LOCK_EMAIL, "password": "nope"}, timeout=30)
    assert r.status_code == 429
    # cleanup
    mongo.login_attempts.delete_many({"email": LOCK_EMAIL})


# ---------- Regression: public forms ----------
def test_public_enquiry_still_works(mongo):
    r = requests.post(f"{BASE_URL}/api/enquiries", json={
        "name": "qa-test-regression",
        "email": "qa-test-regression@example.com",
        "message": "regression check"
    }, timeout=30)
    assert r.status_code == 200
    mongo.enquiries.delete_many({"email": "qa-test-regression@example.com"})
