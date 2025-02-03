export async function generateFreeLLMResponse(prompt: string): Promise<string> {
  // Replace the URL below with a valid free LLM endpoint if available.
  const response = await fetch("https://api.free-llm.example.com/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // Do not include secret keys here!
    },
    body: JSON.stringify({ prompt })
  });
  if (!response.ok) {
    throw new Error("LLM API request failed");
  }
  const data = await response.json();
  // Return the generated text from the response
  return data.result || "תגובה לא זמינה";
}
