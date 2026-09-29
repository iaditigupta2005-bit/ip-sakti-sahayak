from __future__ import annotations

import io
import re
from pathlib import PurePosixPath
from typing import Any
from urllib.parse import urlparse

import httpx
from pypdf import PdfReader

from app.db.supabase_client import get_supabase_service_client


def normalize_text(text: str) -> str:
    text = text.replace("\xa0", " ")
    text = text.replace("\r\n", "\n")
    return re.sub(r"\s+", " ", text).strip()


def extract_document_title(pdf_url: str, pdf_reader: PdfReader | None) -> str:
    metadata = getattr(pdf_reader, "metadata", None) if pdf_reader else None
    title = None
    if metadata:
        title = metadata.get("/Title") or metadata.get("Title")
    if title:
        return str(title).strip()

    parsed = urlparse(pdf_url)
    candidate = PurePosixPath(parsed.path).name or "Official PDF"
    if candidate.lower().endswith(".pdf"):
        candidate = candidate[:-4]
    return candidate.replace("_", " ").strip() or "Official PDF"


def infer_document_summary(full_text: str) -> str:
    normalized = normalize_text(full_text)
    if not normalized:
        return ""
    return normalized[:500]


async def fetch_pdf_bytes(pdf_url: str) -> bytes:
    async with httpx.AsyncClient(timeout=30.0, follow_redirects=True) as client:
        response = await client.get(pdf_url, headers={"User-Agent": "IP-SAKTI-Sahayak/1.0"})
        response.raise_for_status()
        content_type = (response.headers.get("content-type") or "").lower()
        pdf_bytes = response.content
        if not pdf_bytes:
            raise ValueError("Received an empty response body from the PDF URL.")
        if "pdf" not in content_type and not pdf_bytes.startswith(b"%PDF"):
            raise ValueError(f"URL did not return a PDF document: content-type={content_type or 'unknown'}")
        return pdf_bytes


def extract_pdf_pages(pdf_bytes: bytes) -> tuple[list[str], int]:
    reader = PdfReader(io.BytesIO(pdf_bytes))
    pages: list[str] = []
    for page_number, page in enumerate(reader.pages, start=1):
        page_text = page.extract_text() or ""
        cleaned_text = normalize_text(page_text)
        if cleaned_text:
            pages.append(f"Page {page_number}\n{cleaned_text}")
        else:
            pages.append(f"Page {page_number}\n")
    return pages, len(reader.pages)


def build_document_payload(pdf_url: str, title: str, pages: list[str], page_count: int) -> dict[str, Any]:
    full_text = "\n\n".join(pages)
    description = infer_document_summary(full_text)
    parsed = urlparse(pdf_url)
    return {
        "title": title,
        "authority": parsed.netloc or "Official source",
        "jurisdiction": "Unknown",
        "document_type": "Official PDF",
        "publication_year": None,
        "language": "English",
        "source_url": pdf_url,
        "description": description,
        "status": "completed",
    }


def _first_supabase_row(response: Any) -> dict[str, Any] | None:
    rows = getattr(response, "data", []) or []
    if not rows:
        return None
    first = rows[0]
    return dict(first) if isinstance(first, dict) else None


async def ingest_official_pdfs(urls: list[str]) -> list[dict[str, Any]]:
    results: list[dict[str, Any]] = []
    client = get_supabase_service_client()

    for pdf_url in urls:
        cleaned_url = (pdf_url or "").strip()
        if not cleaned_url:
            results.append({
                "url": "",
                "title": "",
                "ingestion_status": "failed",
                "pages_extracted": 0,
                "sections_extracted": 0,
                "error": "Empty PDF URL provided.",
            })
            continue

        try:
            if client is None:
                raise ValueError("Supabase service client is not configured; PDF content could not be stored.")

            pdf_bytes = await fetch_pdf_bytes(cleaned_url)
            pages, page_count = extract_pdf_pages(pdf_bytes)
            if not pages:
                raise ValueError("PDF was downloaded but no extractable text was found.")

            reader = PdfReader(io.BytesIO(pdf_bytes))
            title = extract_document_title(cleaned_url, reader)
            document_payload = build_document_payload(cleaned_url, title, pages, page_count)

            existing_document: dict[str, Any] | None = None
            existing_response = client.table("source_documents").select("*").eq("source_url", cleaned_url).limit(1).execute()
            rows = getattr(existing_response, "data", []) or []
            if rows:
                first_row = rows[0]
                if isinstance(first_row, dict):
                    existing_document = dict(first_row)

            document_id = existing_document.get("id") if existing_document else None
            payload = dict(document_payload)

            if document_id:
                client.table("source_documents").update(payload).eq("id", document_id).execute()
            else:
                insert_result = client.table("source_documents").insert(payload).execute()
                inserted_rows = getattr(insert_result, "data", []) or []
                if inserted_rows:
                    first_inserted = inserted_rows[0]
                    if isinstance(first_inserted, dict):
                        document_id = first_inserted.get("id")

            if document_id is None:
                raise ValueError("Document was not created or updated in source_documents.")

            client.table("source_sections").delete().eq("document_id", document_id).execute()
            section_rows = []
            for page_number, text in enumerate(pages, start=1):
                section_rows.append({
                    "document_id": document_id,
                    "content": text,
                    "page_number": page_number,
                })
            if section_rows:
                client.table("source_sections").insert(section_rows).execute()

            result = {
                "url": cleaned_url,
                "title": title,
                "ingestion_status": "completed",
                "pages_extracted": page_count,
                "sections_extracted": len(pages),
                "error": None,
            }
            results.append(result)
        except Exception as exc:  # pragma: no cover - defensive branch for operational failures
            results.append({
                "url": cleaned_url,
                "title": extract_document_title(cleaned_url, None),
                "ingestion_status": "failed",
                "pages_extracted": 0,
                "sections_extracted": 0,
                "error": str(exc),
            })

    return results
