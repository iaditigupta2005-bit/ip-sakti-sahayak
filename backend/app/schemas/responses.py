from __future__ import annotations

from pydantic import BaseModel, Field


class ArticleResult(BaseModel):
    id: str | None = None
    title: str
    authority: str | None = None
    jurisdiction: str | None = None
    type: str | None = None
    year: str | None = None
    language: str | None = None
    url: str | None = None
    score: float | None = None
    snippet: str | None = None


class AssistantAnswer(BaseModel):
    answer: str
    language: str
    jurisdiction: str
    sources: list[ArticleResult] = Field(default_factory=list)
    confidence: str = "medium"


class ComplianceAssessment(BaseModel):
    product_name: str|None = None
    jurisdiction: str
    category: str
    checks: list[dict[str, str | bool]] = Field(default_factory=list)
    requirements: list[str] = Field(default_factory=list)
    sources: list[ArticleResult] = Field(default_factory=list)


class DashboardActivity(BaseModel):
    actions: list[dict[str, str]] = Field(default_factory=list)
    recent_questions: list[str] = Field(default_factory=list)
    recent_searches: list[str] = Field(default_factory=list)
    saved_sources: list[str] = Field(default_factory=list)
    total_documents: int = 0
