# RAG-Application

Simple proof-of-concept retrieval augmented generation application with a FastAPI backend and a minimal JavaScript frontend.

## Tech Stack

- **Backend:** Python 3 with [FastAPI](https://fastapi.tiangolo.com/) and [LangChain](https://python.langchain.com/)
- **Frontend:** Static HTML and vanilla JavaScript

FastAPI is preferred for this project because its type hints, automatic documentation, and async-first design make it easy to maintain and extend.

## Code Style

- Format Python code with `black` and follow PEP 8.
- Format JavaScript with `prettier`.

## Backend

1. Install dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
2. Start the server:
   ```bash
   uvicorn backend.app:app --reload
   ```
   The backend uses LangChain with FAISS and HuggingFace embeddings to search a small in-memory set of real-estate and crime facts.

## Frontend

Serve the static files (for example with Python's built-in server) and open the page in a browser:
```bash
cd frontend
python -m http.server 3000
```
Then navigate to `http://localhost:3000` and ask a question.
