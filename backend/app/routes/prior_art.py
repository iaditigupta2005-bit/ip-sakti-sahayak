from __future__ import annotations

from fastapi import APIRouter

from app.models.documents import PriorArtRequest
from app.schemas.responses import ArticleResult
from app.services.document_service import search_documents

router = APIRouter()


@router.post("/search")
async def search_prior_art(payload: PriorArtRequest) -> dict[str, list[ArticleResult]]:
    docs = await search_documents(
        payload.query,
        {"jurisdiction": payload.jurisdiction, "document_type": payload.document_type},
        limit=payload.limit,
    )

    return {
        "results": [
            ArticleResult(
                id=str(doc.get("id")),
                title=doc.get("title", "Untitled document"),
                authority=doc.get("authority"),
                jurisdiction=doc.get("jurisdiction"),
                type=doc.get("document_type"),
                year=doc.get("year"),
                language=doc.get("language"),
                url=doc.get("url"),
                score=0.8,
                snippet=(doc.get("summary") or "")[:220],
            )
            for doc in docs
        ]
    }
