# PUMEX RAG System

Production-ready RAG (Retrieval-Augmented Generation) system for the Pumex knowledge base.

## Features

- **Semantic Search**: Vector embeddings with OpenAI
- **Truth Status Weighting**: Prioritizes canonical > current > context > archive
- **Supabase Backend**: PostgreSQL + pgvector for storage
- **ChatGPT Integration**: Custom GPT Actions support
- **Smart Chunking**: Intelligent document segmentation

## Quick Start

### 1. Setup

```bash
npm install
```

### 2. Configure Environment

Create `.env` file:
```
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENAI_API_KEY=your-openai-key
```

### 3. Run SQL Setup

Execute `sql/setup.sql` in Supabase SQL Editor.

### 4. Ingest Documents

```bash
npm run ingest
```

### 5. Query

```bash
npm run query "What is vePUMX?"
```

## API Server

Start the API server for ChatGPT integration:

```bash
npm start
```

Server runs on `http://localhost:3000`

- Health: `GET /health`
- Query: `POST /api/query`
- OpenAPI: `GET /openapi.yaml`

## ChatGPT Custom GPT Setup

See [CHATGPT_SETUP.md](./CHATGPT_SETUP.md) for full instructions.

## Project Structure

```
├── canonical/     # Highest authority documents
├── current/       # Active, may change
├── drafts/        # Speculative/future
├── archive/        # Historical only
├── context/       # Style/tone guidance
├── scripts/       # Ingestion & query scripts
├── sql/           # Database setup
└── server.js      # API server
```

## License

Private - Pumex Internal

