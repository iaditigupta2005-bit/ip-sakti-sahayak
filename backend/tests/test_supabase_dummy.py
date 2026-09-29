import os
import sys

os.environ["SUPABASE_URL"] = "https://example.supabase.co"
os.environ["SUPABASE_KEY"] = "sb_publishable_dummy_test_key"
os.environ["SUPABASE_SERVICE_ROLE_KEY"] = "sb_secret_dummy_test_key"

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.db.supabase_client import get_supabase_client, get_supabase_service_client, supabase_init_status
from app.main import app
from fastapi.testclient import TestClient

anon = get_supabase_client()
service = get_supabase_service_client()
print("anon_type=" + type(anon).__name__)
print("service_type=" + type(service).__name__)
status = supabase_init_status()
print("status_keys=" + str(sorted(status.keys())))
print("status_values=" + str({k: bool(v) for k, v in status.items()}))

r = TestClient(app).get("/health")
print("health_status=" + str(r.status_code))
print("health_supabase=" + str({k: bool(v) for k, v in r.json().get("supabase", {}).items()}))
