from __future__ import annotations

from fastapi import APIRouter, HTTPException

from app.models.documents import OfficialPdfIngestionRequest
from app.services.ingestion.pdf_ingestor import ingest_official_pdfs

router = APIRouter()


@router.post("/official-pdfs")
async def ingest_official_pdf_sources(payload: OfficialPdfIngestionRequest) -> dict[str, object]:
    urls = payload.normalized_urls
    if not urls:
        raise HTTPException(status_code=400, detail="At least one official PDF URL is required.")

    results = await ingest_official_pdfs(urls)
    successful = sum(1 for item in results if item.get("ingestion_status") == "completed")
    failed = len(results) - successful

    return {
        "message": "Official PDF ingestion completed for the provided URLs." if not failed else "Official PDF ingestion finished with errors.",
        "success_count": successful,
        "error_count": failed,
        "documents": results,
    }
