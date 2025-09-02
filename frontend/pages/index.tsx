// frontend/pages/index.tsx
// Home page letting users query the backend.
// Not for complex application logic.

import { useState } from "react";

export default function Home() {
  // store user input and backend response
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // send the question to the FastAPI backend
  async function handleAsk() {
    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer);
    } catch (error) {
      // logging helps us debug network issues without extra UI
      console.error("Failed to ask backend", error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Ask the backend a question</h1>
      <input
        className="w-full max-w-md rounded border p-2"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask something..."
      />
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white"
        onClick={handleAsk}
      >
        Ask
      </button>
      {answer && <p className="max-w-md text-center">{answer}</p>}
    </main>
  );
}
