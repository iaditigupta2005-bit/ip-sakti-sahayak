from __future__ import annotations

from fastapi import APIRouter

from app.models.documents import ComplianceRequest
from app.schemas.responses import ArticleResult, ComplianceAssessment

router = APIRouter()


@router.post("/assess", response_model=ComplianceAssessment)
async def assess_compliance(payload: ComplianceRequest) -> ComplianceAssessment:
    checks = [
        {"label": "Product name", "ok": bool(payload.product_name)},
        {"label": "Product category", "ok": True},
        {"label": "Ingredient list", "ok": bool(payload.ingredients)},
        {"label": "Intended use", "ok": bool(payload.intended_use)},
        {"label": "Labelling information", "ok": False},
        {"label": "Manufacturing licence", "ok": False},
    ]

    requirements = [
        f"Review product classification under {payload.jurisdiction} regulations.",
        "Confirm ingredient and dosage declarations against the applicable AYUSH or drug framework.",
        "Verify label, claims, and licensing obligations before manufacturing or distribution.",
    ]

    sources = [
        ArticleResult(
            id="doc-3",
            title="Ministry of AYUSH — Regulatory resources",
            authority="Ministry of AYUSH",
            jurisdiction="India",
            type="Guidance",
            year="—",
            language="English",
            url="https://ayush.gov.in/",
            score=0.87,
            snippet="Regulatory guidance for Ayurveda and related traditional medicine frameworks.",
        ),
        ArticleResult(
            id="doc-1",
            title="The Patents Act, 1970",
            authority="Government of India",
            jurisdiction="India",
            type="Law",
            year="1970",
            language="English",
            url="https://ipindia.gov.in/",
            score=0.82,
            snippet="Eligibility and patentability rules can influence product assessment and strategic protection planning.",
        ),
    ]

    return ComplianceAssessment(
        product_name=payload.product_name,
        jurisdiction=payload.jurisdiction,
        category=payload.category,
        checks=checks,
        requirements=requirements,
        sources=sources,
    )
