from __future__ import annotations

from pydantic import BaseModel, Field


class SourceDocument(BaseModel):
    id: str | None = None
    title: str
    authority: str | None = None
    jurisdiction: str | None = None
    document_type: str | None = None
    language: str | None = None
    source_url: str | None = None
    description: str | None = None


class KnowledgeSearchRequest(BaseModel):
    query: str = ""
    jurisdiction: str | None = None
    document_type: str | None = None
    authority: str | None = None
    year: str | None = None
    language: str | None = None
    limit: int = 10


class PriorArtRequest(BaseModel):
    query: str
    jurisdiction: str = "All"
    document_type: str = "All"
    limit: int = 5


class ComplianceRequest(BaseModel):
    product_name: str | None = None
    category: str = "Classical Ayurvedic medicine"
    ingredients: str | None = None
    intended_use: str | None = None
    jurisdiction: str = "India"


class AssistantQueryRequest(BaseModel):
    question: str
    language: str = "English"
    jurisdiction: str = "India"


class OfficialPdfIngestionRequest(BaseModel):
    urls: list[str] = Field(default_factory=list)

    @property
    def normalized_urls(self) -> list[str]:
        return [url.strip() for url in self.urls if isinstance(url, str) and url.strip()]


class OfficialPdfIngestionResult(BaseModel):
    url: str
    title: str
    ingestion_status: str
    pages_extracted: int = 0
    sections_extracted: int = 0
    error: str | None = None


class DashboardSummary(BaseModel):
    total_documents: int
    recent_questions: list[str]
    recent_searches: list[str]
    saved_sources: list[str]
