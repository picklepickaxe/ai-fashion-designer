export async function generateDalleImage(prompt) {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: `Fashion sketch of ${prompt}, flat style, minimal background, full outfit`,
      n: 1,
      size: "512x512",
    }),
  });

  const data = await response.json();

  // Optional: log the image URL for debugging
  console.log("Generated DALL·E image URL:", data?.data?.[0]?.url);

  return data?.data?.[0]?.url;
}
