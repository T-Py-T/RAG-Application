const askButton = document.getElementById("ask");
const questionInput = document.getElementById("question");
const answerDisplay = document.getElementById("answer");

askButton.addEventListener("click", async () => {
  const question = questionInput.value;
  const res = await fetch("http://localhost:8000/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  const data = await res.json();
  answerDisplay.textContent = data.answer;
});
