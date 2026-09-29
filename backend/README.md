# IP-SAKTI Sahayak Backend

This backend is intentionally separated from the existing TanStack frontend and keeps the current UI intact.

## Overview

The API is designed for the existing frontend workflow:

- AI Assistant
- Knowledge Base / source search
- Prior-art discovery
- Compliance assessment
- Dashboard activity summary
- Official PDF ingestion for legal and guidance documents

The implementation uses:

- Python
- FastAPI
- PostgreSQL via Supabase
- environment variables for secrets
- CORS for the current frontend

## Phase 1 constraints

- No pgvector
- No embeddings
- No vector database
- PostgreSQL full-text search is used for document lookups
- Official legal and policy PDFs are fetched from their source websites and ingested automatically
- Existing database tables are not recreated or altered

## FastAPI app entry

- backend/app/main.py

## Local development

1. Create and activate a virtual environment.
2. Install dependencies:

   pip install -r backend/requirements.txt

3. Copy and adjust environment variables:

   cp backend/.env.example backend/.env

4. Start the app:

   uvicorn app.main:app --reload --app-dir backend

5. Open the docs:

   http://127.0.0.1:8000/docs

## Environment variables

See backend/.env.example for the required keys.

## Notes

- When the Supabase PostgreSQL connection is configured, the app attempts to run full-text search against the existing document tables.
- If the database is not yet wired up or the schema differs, the backend gracefully falls back to curated source data to keep the API responsive.
- The ingestion pipeline does not hardcode law text; it downloads public official PDF sources at runtime and extracts text for indexing.
