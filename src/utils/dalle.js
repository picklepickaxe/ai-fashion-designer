export async function generateDalleImage(prompt) {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,  // ✅ updated here
    },
    body: JSON.stringify({
      prompt: `Fashion sketch of ${prompt}, flat style, minimal background, full outfit`,
      n: 1,
      size: "256x256",
    }),
  });

  const data = await response.json();

  console.log("Generated DALL·E image URL:", data?.data?.[0]?.url);

  return data?.data?.[0]?.url;
}
