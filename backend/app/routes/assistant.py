from __future__ import annotations

from fastapi import APIRouter

from app.models.documents import AssistantQueryRequest
from app.schemas.responses import AssistantAnswer, ArticleResult

router = APIRouter()


@router.post("/ask", response_model=AssistantAnswer)
async def ask_assistant(payload: AssistantQueryRequest) -> AssistantAnswer:
    question = payload.question.strip()
    if not question:
        raise ValueError("Question is required.")

    answer = (
        "Potential IP protection pathways may include patent protection where applicable, subject to novelty, "
        "inventive step and other legal requirements. This answer is based on relevant public sources and should be "
        "validated against the applicable jurisdiction and the specific formulation details."
    )

    return AssistantAnswer(
        answer=answer,
        language=payload.language,
        jurisdiction=payload.jurisdiction,
        sources=[
            ArticleResult(
                id="doc-1",
                title="The Patents Act, 1970",
                authority="Government of India",
                jurisdiction="India",
                type="Law",
                year="1970",
                language="English",
                url="https://ipindia.gov.in/",
                score=0.91,
                snippet="Patentability assessment depends on novelty, inventive step, and exclusions under the applicable law.",
            ),
            ArticleResult(
                id="doc-2",
                title="Ministry of AYUSH — Regulatory resources",
                authority="Ministry of AYUSH",
                jurisdiction="India",
                type="Guidance",
                year="—",
                language="English",
                url="https://ayush.gov.in/",
                score=0.86,
                snippet="Ayurveda and related products are governed by a combination of AYUSH, drugs, and product-specific rules.",
            ),
        ],
        confidence="medium",
    )


@router.get("/suggested-questions")
async def suggested_questions() -> dict[str, list[str]]:
    return {
        "questions": [
            "Can I patent an Ayurvedic herbal formulation?",
            "What does Section 3(p) of the Patents Act cover?",
            "How is traditional knowledge protected internationally?",
            "What licence do I need to manufacture Ayurvedic medicine?",
        ]
    }
