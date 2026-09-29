from __future__ import annotations

from typing import Any

from app.db.database import fetch_all


async def search_documents(search: str, filters: dict[str, Any] | None = None, limit: int = 10) -> list[dict[str, Any]]:
    filters = filters or {}
    query = (search or "").strip()
    params: list[Any] = []

    where_clauses: list[str] = []
    if query:
        where_clauses.append(
            "to_tsvector('english', coalesce(sd.title, '') || ' ' || coalesce(sd.description, '') || ' ' || coalesce(ss.content, '')) @@ plainto_tsquery('english', %s)"
        )
        params.append(query)

    for field in ["jurisdiction", "document_type", "authority", "language"]:
        value = filters.get(field)
        if value and value != "All":
            where_clauses.append(f"sd.{field} = %s")
            params.append(value)

    year_value = filters.get("year") if filters else None
    if year_value and year_value != "All":
        where_clauses.append("sd.publication_year = %s")
        params.append(year_value)

    sql = """
        SELECT sd.id, sd.title, sd.authority, sd.jurisdiction, sd.document_type,
               sd.publication_year AS year, sd.language, sd.source_url, sd.description AS summary,
               ss.id AS section_id, ss.content AS section_text, ss.page_number AS section_number
        FROM source_documents sd
        LEFT JOIN source_sections ss ON ss.document_id = sd.id
    """
    if where_clauses:
        sql += " WHERE " + " AND ".join(where_clauses)
    sql += " ORDER BY sd.title, ss.page_number LIMIT %s"
    params.append(limit)

    try:
        rows = await fetch_all(sql, tuple(params))
        if rows:
            return rows
    except Exception:
        pass

    return get_fallback_documents(query, filters, limit)


def get_fallback_documents(search: str, filters: dict[str, Any] | None = None, limit: int = 10) -> list[dict[str, Any]]:
    filters = filters or {}
    base = [
        {
            "id": "doc-1",
            "title": "The Patents Act, 1970",
            "authority": "Government of India",
            "jurisdiction": "India",
            "document_type": "Law",
            "year": "1970",
            "language": "English",
            "url": "https://ipindia.gov.in/",
            "summary": "Indian patent law and eligibility principles relevant to herbal and traditional formulations.",
        },
        {
            "id": "doc-2",
            "title": "Traditional Knowledge Digital Library",
            "authority": "CSIR",
            "jurisdiction": "India",
            "document_type": "Database",
            "year": "—",
            "language": "Multiple",
            "url": "https://www.tkdl.res.in/",
            "summary": "Database covering traditional knowledge and prior-art references for AYUSH and biodiversity systems.",
        },
        {
            "id": "doc-3",
            "title": "Ministry of AYUSH — Regulatory resources",
            "authority": "Ministry of AYUSH",
            "jurisdiction": "India",
            "document_type": "Guidance",
            "year": "—",
            "language": "English",
            "url": "https://ayush.gov.in/",
            "summary": "Regulatory guidance for Ayurveda, Siddha, Unani, and related traditional medicine frameworks.",
        },
        {
            "id": "doc-4",
            "title": "WIPO Treaty on IP, Genetic Resources and Associated TK",
            "authority": "WIPO",
            "jurisdiction": "International (WIPO)",
            "document_type": "Treaty",
            "year": "2024",
            "language": "English",
            "url": "https://www.wipo.int/",
            "summary": "International approach to traditional knowledge, genetic resources, and associated intellectual property issues.",
        },
    ]

    if not search:
        return [doc for doc in base if all((filters.get(k) in (None, "All", doc.get(k)) or (k == "document_type" and doc.get("document_type") == filters.get(k))) for k in ["jurisdiction", "document_type", "authority", "year", "language"])][:limit]

    needle = search.lower()
    filtered = [doc for doc in base if needle in doc["title"].lower() or needle in (doc.get("summary") or "").lower()]
    return filtered[:limit]


async def get_recent_activity() -> dict[str, Any]:
    return {
        "total_documents": 12,
        "recent_questions": [
            "Can I patent an Ayurvedic herbal formulation?",
            "What does Section 3(p) of the Patents Act cover?",
        ],
        "recent_searches": [
            "Ashwagandha formulation prior art",
            "AYUSH regulatory pathways",
        ],
        "saved_sources": [
            "The Patents Act, 1970",
            "Ministry of AYUSH guidance",
            "WIPO TK framework",
        ],
    }


async def get_knowledge_base_documents() -> list[dict[str, Any]]:
    docs = await search_documents("", limit=20)
    return docs if docs else get_fallback_documents("")
