from __future__ import annotations

from typing import Any

from psycopg import Connection
from psycopg.rows import dict_row

from app.core.config import settings


def get_connection() -> Connection[Any]:
    if not settings.database_url:
        raise ValueError("DATABASE_URL is not configured.")

    import psycopg

    return psycopg.connect(settings.database_url, row_factory=dict_row)


async def fetch_one(query: str, params: tuple[Any, ...] = ()) -> dict[str, Any] | None:
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(query, params)
            row = cur.fetchone()
            return dict(row) if row else None
    finally:
        conn.close()


async def fetch_all(query: str, params: tuple[Any, ...] = ()) -> list[dict[str, Any]]:
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(query, params)
            rows = cur.fetchall()
            return [dict(row) for row in rows]
    finally:
        conn.close()
