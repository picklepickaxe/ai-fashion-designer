export async function getFashionSpecs(prompt) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // ✅ safe key
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a fashion tech pack assistant. Return results in simple plain text, not JSON or markdown.",
        },
        {
          role: "user",
          content: `Give the following for this design idea: "${prompt}"\n- Style Name\n- Recommended Fabric\n- Basic Measurements (in cm)`,
        },
      ],
    }),
  });

  const data = await response.json();
  return data?.choices?.[0]?.message?.content || "No specs generated.";
}
