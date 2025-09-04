# HomeScope: RAG-Powered Real Estate Assistant

A real estate discovery platform that solves the challenge of finding suitable neighborhoods by combining property data, crime statistics, school ratings, and community insights with AI-powered search. Uses retrieval-augmented generation (RAG) to provide intelligent, context-aware responses to user queries about housing and neighborhoods.

## Tech Stack

- **Backend:** Python 3.11 with [FastAPI](https://fastapi.tiangolo.com/) and [LangChain](https://python.langchain.com/)
- **Frontend:** [Next.js 15](https://nextjs.org/) with React 19, TypeScript, and Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **AI/ML:** HuggingFace embeddings with FAISS vector search
- **Deployment:** GitHub Actions CI/CD

## Prerequisites

- Python 3.11+
- Node.js 20+
- pnpm (recommended) or npm
- Git

## Quick Start

### Option 1: Dev Container (Recommended)

1. Open in VS Code
2. Install Dev Containers extension
3. Run: `Dev Containers: Reopen in Container`
4. Container builds and installs dependencies automatically
5. Backend and frontend ready at:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000

### Option 2: Local Development

#### Backend Setup

```bash
# Install Python dependencies
pip install -r backend/requirements.txt

# Start the development server
uvicorn backend.app:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

## Running the Application

Once both servers are running:

1. Frontend: Open http://localhost:3000
2. Backend API: Available at http://localhost:8000
3. API Documentation: Visit http://localhost:8000/docs

## Development Workflow

### Code Quality Tools

This project uses automated code quality checks:

```bash
# Install pre-commit hooks (runs automatically on commit)
./setup-precommit.sh  # Linux/Mac
# or
setup-precommit.bat   # Windows

# Manual code formatting
cd frontend && pnpm lint
cd backend && black . && isort .

# Run all checks manually
pre-commit run --all-files
```

### Available Scripts

#### Frontend (`cd frontend`)

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run linting and formatting
```

#### Backend

```bash
uvicorn backend.app:app --reload  # Development server
uvicorn backend.app:app           # Production server
```

### Testing

```bash
# Frontend tests (when implemented)
cd frontend && pnpm test

# Backend tests (when implemented)
cd backend && python -m pytest

# Manual API testing
curl -X POST "http://localhost:8000/ask" \
     -H "Content-Type: application/json" \
     -d '{"question": "What are the safest neighborhoods in Austin?"}'
```

## Project Structure

```
RAG-Application/
├── backend/                    # FastAPI backend
│   ├── app.py                 # Main application
│   └── requirements.txt       # Python dependencies
├── frontend/                  # Next.js frontend
│   ├── app/                   # Next.js app directory
│   ├── components/            # React components
│   ├── lib/                   # Utility functions
│   └── package.json           # Node dependencies
├── .devcontainer/             # Dev container configuration
├── .github/workflows/         # CI/CD pipelines
└── .pre-commit-config.yaml    # Code quality hooks
```

## Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Supabase Setup

1. Create a new Supabase project
2. Run SQL scripts in `frontend/scripts/` to set up tables
3. Update environment variables
4. Configure authentication and RLS policies

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes
4. Run tests: `pre-commit run --all-files`
5. Commit: `git commit -m "Add amazing feature"`
6. Push: `git push origin feature/amazing-feature`
7. Create Pull Request

### Code Style

- Python: Black formatting, isort imports
- TypeScript/React: Prettier formatting, ESLint rules
- Commits: Use conventional format

## Deployment

### Frontend (Vercel)

```bash
cd frontend
pnpm build
# Deploy to Vercel (connect your GitHub repo)
```

### Backend (Railway, Render, or similar)

```bash
# Build and deploy FastAPI app
# Environment variables required for production
```

## API Documentation

When the backend is running, visit:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
- OpenAPI Schema: http://localhost:8000/openapi.json

## Troubleshooting

### Common Issues

Frontend won't start:
```bash
cd frontend && rm -rf .next && pnpm dev
```

Backend import errors:
```bash
pip install -r backend/requirements.txt --force-reinstall
```

Dev container issues:
```bash
# In VS Code: Ctrl+Shift+P → "Dev Containers: Rebuild Container"
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

