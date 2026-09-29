from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.supabase_client import supabase_init_status
from app.routes.assistant import router as assistant_router
from app.routes.compliance import router as compliance_router
from app.routes.dashboard import router as dashboard_router
from app.routes.ingestion import router as ingestion_router
from app.routes.knowledge_base import router as knowledge_base_router
from app.routes.prior_art import router as prior_art_router

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    description="FastAPI backend for IP-SAKTI Sahayak and its legal/IP research workflows.",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(assistant_router, prefix="/api/assistant")
app.include_router(knowledge_base_router, prefix="/api/knowledge-base")
app.include_router(prior_art_router, prefix="/api/prior-art")
app.include_router(compliance_router, prefix="/api/compliance")
app.include_router(dashboard_router, prefix="/api/dashboard")
app.include_router(ingestion_router, prefix="/api/ingestion")


@app.get("/health")
async def healthcheck() -> dict[str, object]:
    return {
        "status": "ok",
        "service": settings.app_name,
        "environment": settings.app_env,
        "supabase": supabase_init_status(),
    }


@app.get("/health/supabase")
async def supabase_healthcheck() -> dict[str, object]:
    return {"supabase": supabase_init_status()}


@app.get("/")
async def root() -> dict[str, str]:
    return {
        "message": "IP-SAKTI Sahayak API is running.",
        "docs": "/docs",
    }
