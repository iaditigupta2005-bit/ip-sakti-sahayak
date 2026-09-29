from __future__ import annotations

from fastapi import APIRouter, Query

from app.models.documents import KnowledgeSearchRequest
from app.schemas.responses import ArticleResult
from app.services.document_service import search_documents

router = APIRouter()


@router.post("/search")
async def search_knowledge_base(payload: KnowledgeSearchRequest) -> dict[str, list[ArticleResult]]:
    docs = await search_documents(
        payload.query,
        {
            "jurisdiction": payload.jurisdiction,
            "document_type": payload.document_type,
            "authority": payload.authority,
            "year": payload.year,
            "language": payload.language,
        },
        limit=payload.limit,
    )

    results = [
        ArticleResult(
            id=str(doc.get("id")),
            title=doc.get("title", "Untitled document"),
            authority=doc.get("authority"),
            jurisdiction=doc.get("jurisdiction"),
            type=doc.get("document_type"),
            year=doc.get("year"),
            language=doc.get("language"),
            url=doc.get("url"),
            score=0.90,
            snippet=(doc.get("description") or doc.get("summary") or doc.get("content") or "")[:250],
        )
        for doc in docs
    ]
    return {"results": results}


@router.get("/documents")
async def list_documents(
    q: str = Query(default=""),
    jurisdiction: str | None = None,
    document_type: str | None = None,
    authority: str | None = None,
    year: str | None = None,
    language: str | None = None,
    limit: int = 20,
) -> dict[str, list[ArticleResult]]:
    docs = await search_documents(
        q,
        {
            "jurisdiction": jurisdiction,
            "document_type": document_type,
            "authority": authority,
            "year": year,
            "language": language,
        },
        limit=limit,
    )

    results = [
        ArticleResult(
            id=str(doc.get("id")),
            title=doc.get("title", "Untitled document"),
            authority=doc.get("authority"),
            jurisdiction=doc.get("jurisdiction"),
            type=doc.get("document_type"),
            year=doc.get("year"),
            language=doc.get("language"),
            url=doc.get("url"),
            score=0.88,
            snippet=(doc.get("description") or doc.get("summary") or doc.get("content") or "")[:220],
        )
        for doc in docs
    ]
    return {"results": results}
