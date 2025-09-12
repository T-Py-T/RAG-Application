from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple in-memory document store with real-estate and crime facts
DOCUMENTS = [
    "Housing prices in Gotham City average $350,000.",
    "Metropolis crime rates have fallen 5% year over year.",
    "Riverside has top-rated schools and low crime levels.",
]

_embeddings = HuggingFaceEmbeddings()
_vectorstore = FAISS.from_texts(DOCUMENTS, _embeddings)


class Query(BaseModel):
    question: str


class Answer(BaseModel):
    answer: str


@app.post("/ask", response_model=Answer)
async def ask(query: Query) -> Answer:
    """Return the most relevant document using LangChain vector search."""
    docs = _vectorstore.similarity_search(query.question, k=1)
    if not docs:
        return Answer(answer="No relevant information found.")
    return Answer(answer=docs[0].page_content)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
