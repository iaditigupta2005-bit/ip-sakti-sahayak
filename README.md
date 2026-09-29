# IP-SAKTI Sahayak

### Multilingual AI-Assisted Intellectual Property & Regulatory Guidance for Ayurveda

IP-SAKTI Sahayak is a multilingual, source-cited AI assistant concept designed to help Ayurveda innovators, researchers, startups, IP professionals and regulatory teams navigate Intellectual Property and regulatory information across national and international regimes.

The platform brings together **IP research, prior-art discovery, regulatory guidance and a structured knowledge base** into a single workflow.

> **Ask. Verify. Protect. Comply.**

---

# Problem Statement

Ayurveda and traditional-knowledge-based innovators often need to navigate fragmented information across:

- Patent and IP databases
- Indian intellectual property laws
- AYUSH-related regulatory information
- Traditional knowledge resources
- International IP frameworks
- Prior-art documents
- Multiple languages and jurisdictions

Existing platforms provide powerful patent search, document discovery or legal resources, but users may still need to move between multiple sources to understand how the information relates to their specific innovation.

IP-SAKTI Sahayak addresses this gap by providing a **unified, guided workflow for IP research and regulatory understanding**, with a specific focus on Ayurveda and traditional knowledge.

---

# Our Solution

IP-SAKTI Sahayak provides a single platform through which users can:

1. Ask IP and regulatory questions using the AI Assistant.
2. Explore potentially relevant prior-art documents.
3. Assess regulatory considerations through a structured compliance workflow.
4. Search and explore a curated knowledge base.
5. Work across different languages and jurisdictions.
6. Trace important guidance back to relevant sources.

The platform is designed as an **evidence-grounded research and assistance layer**, rather than simply a generic chatbot.

---

# Key Features

# Multilingual AI Assistant

Users can ask questions related to:

- Patents
- Trademarks
- Ayurveda
- Traditional knowledge
- IP regulations
- Regulatory requirements

The prototype supports multiple language options including:

- English
- हिन्दी
- தமிழ்
- తెలుగు
- বাংলা
- मराठी

It also provides jurisdiction selection for:

- India
- United States
- European Union
- International / WIPO

---

# Prior-Art Discovery

The Prior-Art module allows users to enter an invention description and explore potentially relevant documents.

The prototype displays:

- Document title
- Identifier
- Jurisdiction
- Document type
- Summary
- Relevance / similarity
- Document details

> **Important:** Similarity results are research signals and are not legal conclusions.

---

# Compliance Assessment

The Compliance workflow guides the user through a structured assessment:

1. Product
2. Formulation
3. Intended Use
4. Jurisdiction
5. Generate

The resulting prototype assessment can present:

- Regulatory considerations
- Applicable frameworks
- Documentation requirements
- Manufacturing considerations
- Labelling considerations
- IP considerations
- Traditional knowledge considerations
- Sources and next steps

The system uses statuses such as:

- Applicable
- Review
- Needs Verification

This avoids presenting the prototype as an absolute legal or regulatory determination.

---

# Knowledge Base

The Knowledge Base provides a structured interface for exploring relevant legal, regulatory and traditional-knowledge resources.

Users can search and filter documents using parameters such as:

- Jurisdiction
- Document type
- Authority
- Year
- Language

---

# Jurisdiction-Aware Workflow

IP-SAKTI Sahayak is designed to consider different legal and regulatory contexts.

The prototype includes:

- 🇮🇳 India
- 🇺🇸 United States
- 🇪🇺 European Union
- International / WIPO

This allows the platform to maintain jurisdictional context while presenting IP and regulatory information.

---
 How It Works

````
                    USER
                      │
                      ▼
              ┌───────────────┐
              │  IP-SAKTI     │
              │   Sahayak     │
              └───────┬───────┘
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
   AI Assistant   Prior-Art     Compliance
        │          Search        Assessment
        │             │             │
        └─────────────┼─────────────┘
                      ▼
              Knowledge Base
                      │
                      ▼
          Sources / Evidence / Guidance
                      │
                      ▼
             Actionable Research
````
 # Intended RAG Workflow

The planned evidence-grounded architecture follows:
User Question
      ↓
Query Understanding
      ↓
Knowledge Retrieval
      ↓
Relevant Documents
      ↓
Evidence Analysis
      ↓
Source-Cited Response
      ↓
Actionable Guidance
# Existing Solutions & Our Differentiation

Several established platforms already support IP and patent research, including patent databases and advanced patent analytics systems.

These platforms are valuable for:

Patent discovery
Full-text search
Prior-art research
Patent analytics
Classification and document analysis

IP-SAKTI Sahayak is not intended to replace these established databases.

Instead, our approach focuses on creating a unified workflow around the user's innovation, connecting:
 Innovation
    ↓
IP Question
    ↓
Prior-Art Research
    ↓
Legal / Regulatory Understanding
    ↓
Compliance Considerations
    ↓
Relevant Sources
    ↓
Actionable Research Guidance

The key focus is the combination of Indian IP + Ayurveda + traditional knowledge + regulatory guidance + multilingual interaction within one user-oriented workflow.

# System Architecture

The project is structured into a frontend application and a separate backend service.
````

┌─────────────────────────────────────────┐
│              USER / RESEARCHER          │
└────────────────────┬────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│             FRONTEND LAYER              │
│      TanStack Start + React             │
│             Tailwind CSS                │
│                                         │
│  Dashboard                              │
│  AI Assistant                           │
│  Prior-Art                              │
│  Compliance                             │
│  Knowledge Base                         │
└────────────────────┬────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│              API LAYER                  │
│               FastAPI                   │
│                                         │
│  Assistant Routes                       │
│  Prior-Art Routes                       │
│  Compliance Routes                      │
│  Knowledge Routes                       │
│  Ingestion Routes                       │
└────────────────────┬────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│           DATA / KNOWLEDGE LAYER        │
│                                         │
│      PostgreSQL via Supabase            │
│                                         │
│  Documents                              │
│  Sections                               │
│  Conversations                          │
│  Citations                              │
│  Prior-Art Results                      │
│  Compliance Assessments                 │
│  Activity / Saved Sources               │
└─────────────────────────────────────────┘
````
#Technology Stack
Frontend
TanStack Start
React
TypeScript
Tailwind CSS
Lucide React
#Backend
Python
FastAPI
#Database
PostgreSQL
Supabase
#Version Control
Git
GitHub
#Deployment
Vercel


# Crrent Prototype

The current SIH prototype demonstrates the complete frontend workflow using structured prototype/demo data.

Available prototype modules
Landing Page
Login / Demo Access
Dashboard
AI Assistant
Prior-Art Search
Compliance Assessment
Knowledge Base
Multilingual interface
Jurisdiction selection

The prototype is designed to demonstrate the user experience and end-to-end workflow while the backend architecture is maintained separately for deeper integration.

# Future Scope
The platform can be extended with:

Large-scale official document ingestion
Semantic search
Embeddings and vector retrieval
Advanced RAG pipelines
Automated source extraction and citation
Larger patent and prior-art datasets
More comprehensive AYUSH regulatory resources
Automated document processing
Advanced multilingual generation
User accounts and personalized workspaces
Saved research sessions
Advanced analytics and reporting
Deeper integration with official Indian IP and regulatory sources
# Target Users

IP-SAKTI Sahayak is designed for:

Ayurveda researchers
Traditional knowledge researchers
Innovators and startups
IP professionals
Patent researchers
Regulatory teams
Academic researchers
Product developers

Why IP-SAKTI Sahayak?

The platform aims to move the user from:

“Where do I find the information?”

to:

“What does this information mean for my innovation, what should I verify, and what should I do next?”

By combining IP research, regulatory context, prior-art discovery and source-oriented knowledge into one workflow, IP-SAKTI Sahayak aims to make complex IP and regulatory research more accessible and structured.

 # Disclaimer

IP-SAKTI Sahayak is a research and information-assistance platform.

The information and prototype assessments provided by the system do not constitute professional legal, patent or regulatory advice and should be independently verified with qualified professionals and authoritative sources before making legal or regulatory decisions.

# Live Prototype

Live Demo:
https://ip-sakti-sahayak-rosy.vercel.app/

# Run Locally
Frontend
npm install
npm run dev
The development server will provide a local URL such as:

http://localhost:8080/

Backend
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload

Backend API documentation:

http://127.0.0.1:8000/docs
