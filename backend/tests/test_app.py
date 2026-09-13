"""backend/tests/test_app.py
Verify the public API contract with an in-memory vector-store substitute.
Do not download an embedding model or contact an external service.
"""

from collections.abc import Sequence
from dataclasses import dataclass

from fastapi.testclient import TestClient

from backend.app import RetrievedDocument, create_app


@dataclass(frozen=True)
class FakeDocument:
    """Represent one deterministic retrieval result."""

    page_content: str


class FakeVectorStore:
    """Record retrieval input and return a configured response."""

    def __init__(self, documents: Sequence[RetrievedDocument]) -> None:
        self.documents = documents
        self.calls: list[tuple[str, int]] = []

    def similarity_search(
        self, question: str, *, k: int
    ) -> Sequence[RetrievedDocument]:
        """Return the configured documents without external work."""
        self.calls.append((question, k))
        return self.documents[:k]


def test_health_response_is_local_and_truthful() -> None:
    """Expose a stable health response without initializing retrieval."""
    store = FakeVectorStore([])
    client = TestClient(create_app(lambda: store))

    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {
        "message": "HomeScope retrieval example is running.",
        "docs": "/docs",
    }
    assert store.calls == []


def test_ask_returns_the_injected_retrieval_result() -> None:
    """Return the nearest synthetic statement and request only one result."""
    store = FakeVectorStore([FakeDocument("A synthetic result.")])
    client = TestClient(create_app(lambda: store))

    response = client.post("/ask", json={"question": "Which sample is closest?"})

    assert response.status_code == 200
    assert response.json() == {"answer": "A synthetic result."}
    assert store.calls == [("Which sample is closest?", 1)]


def test_ask_handles_an_empty_result_set() -> None:
    """Return an explicit empty-result message without inventing an answer."""
    store = FakeVectorStore([])
    client = TestClient(create_app(lambda: store))

    response = client.post("/ask", json={"question": "Unknown sample"})

    assert response.status_code == 200
    assert response.json() == {"answer": "No relevant sample statement was found."}


def test_ask_rejects_blank_or_oversized_questions() -> None:
    """Keep malformed requests away from the retrieval boundary."""
    store = FakeVectorStore([])
    client = TestClient(create_app(lambda: store))

    assert client.post("/ask", json={"question": ""}).status_code == 422
    assert client.post("/ask", json={"question": "x" * 501}).status_code == 422
    assert store.calls == []
