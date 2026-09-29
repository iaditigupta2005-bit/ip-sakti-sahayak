from __future__ import annotations

import re
from functools import lru_cache
from importlib import import_module
from typing import Any

from supabase import Client, create_client

from app.core.config import settings

_MODERN_SUPABASE_KEY_RE = re.compile(r"^sb_(publishable|secret)_[A-Za-z0-9_-]+$")
_LEGACY_JWT_KEY_RE = re.compile(r"^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$")


def _normalize_supabase_key(value: str | None) -> str | None:
    if value is None:
        return None

    key = value.strip().strip('"').strip("'")
    if not key:
        return None

    if key.lower().startswith("bearer "):
        key = key.split(maxsplit=1)[1].strip()

    return key or None


def _is_compatible_supabase_key(value: str | None) -> bool:
    if not value:
        return False
    return bool(_MODERN_SUPABASE_KEY_RE.fullmatch(value) or _LEGACY_JWT_KEY_RE.fullmatch(value))


def _patch_supabase_key_validation() -> None:
    for module_name in ("supabase._sync.client", "supabase._async.client"):
        try:
            module = import_module(module_name)
        except Exception:
            continue

        if not hasattr(module, "re"):
            continue

        if getattr(module.re, "_ip_sakti_compat_patch", False):
            continue

        original_match = module.re.match

        def compat_match(pattern: str, text: str, *args: Any, **kwargs: Any):
            if pattern == _LEGACY_JWT_KEY_RE.pattern and _MODERN_SUPABASE_KEY_RE.fullmatch(text):
                return _MODERN_SUPABASE_KEY_RE.fullmatch(text)
            return original_match(pattern, text, *args, **kwargs)

        module.re.match = compat_match
        module.re._ip_sakti_compat_patch = True


def _build_supabase_client(url: str | None, key: str | None) -> Client | None:
    normalized_url = (url or "").strip().strip('"').strip("'")
    normalized_key = _normalize_supabase_key(key)

    if not normalized_url or not normalized_key or not _is_compatible_supabase_key(normalized_key):
        return None

    try:
        _patch_supabase_key_validation()
        return create_client(normalized_url, normalized_key)
    except Exception:
        return None


@lru_cache(maxsize=2)
def get_supabase_client() -> Client | None:
    return _build_supabase_client(settings.supabase_url, settings.supabase_key)


@lru_cache(maxsize=2)
def get_supabase_service_client() -> Client | None:
    return _build_supabase_client(settings.supabase_url, settings.supabase_service_role_key)


def supabase_init_status() -> dict[str, bool]:
    return {
        "supabase_url_configured": bool(settings.supabase_url),
        "supabase_key_configured": bool(settings.supabase_key),
        "supabase_service_role_key_configured": bool(settings.supabase_service_role_key),
        "anon_client_initialized": get_supabase_client() is not None,
        "service_client_initialized": get_supabase_service_client() is not None,
    }


def supabase_query_source_documents(limit: int = 10, query: str | None = None, filters: dict[str, Any] | None = None) -> list[dict[str, Any]]:
    client = get_supabase_client()
    if client is None:
        return []

    table = client.table("source_documents")
    request = table.select("*")
    if query and query.strip():
        request = request.ilike("title", f"%{query.strip()}%")
    if filters:
        for key, value in filters.items():
            if not value or value == "All":
                continue
            normalized_key = "publication_year" if key == "year" else key
            if normalized_key in {"summary", "content", "metadata", "url", "year"}:
                continue
            request = request.eq(normalized_key, value)
    result = request.limit(limit).execute()
    rows = getattr(result, "data", []) or []
    return [dict(item) for item in rows]


def supabase_query_source_sections(source_document_id: str | None = None, limit: int = 20) -> list[dict[str, Any]]:
    client = get_supabase_client()
    if client is None:
        return []

    table = client.table("source_sections")
    request = table.select("*")
    if source_document_id:
        request = request.eq("document_id", source_document_id)
    result = request.limit(limit).execute()
    rows = getattr(result, "data", []) or []
    return [dict(item) for item in rows]
