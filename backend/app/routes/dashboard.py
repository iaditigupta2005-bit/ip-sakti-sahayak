from __future__ import annotations

from fastapi import APIRouter

from app.services.document_service import get_recent_activity

router = APIRouter()


@router.get("/summary")
async def dashboard_summary() -> dict[str, object]:
    activity = await get_recent_activity()
    return {
        "actions": [
            {"label": "Ask AI", "route": "/assistant", "description": "Multilingual IP guidance"},
            {"label": "Search Prior Art", "route": "/prior-art", "description": "Patents and research"},
            {"label": "Check Compliance", "route": "/compliance", "description": "Regulatory roadmap"},
        ],
        "recent_questions": activity["recent_questions"],
        "recent_searches": activity["recent_searches"],
        "saved_sources": activity["saved_sources"],
        "total_documents": activity["total_documents"],
    }
