"""backend/app.py
Serve a minimal, locally runnable semantic-retrieval example over synthetic text.
Do not treat the bundled statements as live housing facts or decision guidance.
"""

from collections.abc import Callable, Sequence
from functools import lru_cache
from typing import Annotated, Protocol, cast

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

DOCUMENTS = (
    "Sample record: Gotham City has an illustrative median price of $350,000.",
    "Sample record: Metropolis has an illustrative year-over-year crime-rate decrease.",
    "Sample record: Riverside has illustrative school and safety labels.",
)


class RetrievedDocument(Protocol):
    """Describe the result shape consumed from a vector store."""

    @property
    def page_content(self) -> str:
        """Return the document's text content."""


class VectorStore(Protocol):
    """Define the narrow vector-store behavior required by the API."""

    def similarity_search(
        self, question: str, *, k: int
    ) -> Sequence[RetrievedDocument]:
        """Return the nearest documents for a question."""


class Query(BaseModel):
    """Validate a semantic-retrieval request."""

    question: str = Field(min_length=1, max_length=500)


class Answer(BaseModel):
    """Represent a semantic-retrieval response."""

    answer: str


def build_vector_store() -> VectorStore:
    """Build the local embedding model only when the retrieval endpoint needs it."""
    from langchain_community.embeddings import HuggingFaceEmbeddings
    from langchain_community.vectorstores import FAISS

    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    return cast(VectorStore, FAISS.from_texts(list(DOCUMENTS), embeddings))


@lru_cache(maxsize=1)
def get_vector_store() -> VectorStore:
    """Reuse one lazily initialized local vector store per process."""
    return build_vector_store()


def create_app(store_provider: Callable[[], VectorStore] = get_vector_store) -> FastAPI:
    """Create the API with an injectable retrieval boundary for deterministic tests."""
    application = FastAPI(
        title="HomeScope retrieval example",
        description="Local semantic retrieval over three synthetic statements.",
    )
    application.add_middleware(
        CORSMiddleware,
        allow_origins=["http://127.0.0.1:3000", "http://localhost:3000"],
        allow_credentials=False,
        allow_methods=["GET", "POST"],
        allow_headers=["Content-Type"],
    )

    @application.get("/")
    async def root() -> dict[str, str]:
        """Return a side-effect-free health response."""
        return {"message": "HomeScope retrieval example is running.", "docs": "/docs"}

    @application.post("/ask", response_model=Answer)
    async def ask(
        query: Query,
        vector_store: Annotated[VectorStore, Depends(store_provider)],
    ) -> Answer:
        """Return the closest synthetic statement from the local vector store."""
        documents = vector_store.similarity_search(query.question, k=1)
        if not documents:
            return Answer(answer="No relevant sample statement was found.")
        return Answer(answer=documents[0].page_content)

    return application


app = create_app()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
