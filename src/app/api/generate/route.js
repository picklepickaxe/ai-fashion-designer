import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

    // 🧠 Generate Specs (GPT)
    const specRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",  // For free-tier users, use 3.5-turbo
        messages: [
          {
            role: "system",
            content:
              "You are a fashion tech pack assistant. Return results in plain text, not markdown or JSON.",
          },
          {
            role: "user",
            content: `Give the following for this design idea: "${prompt}"\n- Style Name\n- Recommended Fabric\n- Basic Measurements (in cm)`,
          },
        ],
      }),
    });

    const specData = await specRes.json();
    console.log("📦 GPT Raw Response:", JSON.stringify(specData, null, 2));

    const specs = specData?.choices?.[0]?.message?.content || "No specs generated.";

    // 🖼️ Generate DALL·E Image
    const imageRes = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "dall-e-2",  // Ensure this is correct
        prompt: `Fashion sketch of ${prompt}, flat style, minimal background, full outfit`,
        n: 1,
        size: "512x512",
      }),
    });

    const imageData = await imageRes.json();
    console.log("🎨 DALL·E Raw Response:", JSON.stringify(imageData, null, 2));

    const imageUrl = imageData?.data?.[0]?.url || null;

    if (!imageUrl) {
      console.error("❌ DALL·E failed:", imageData?.error || "No image returned");
    }

    return NextResponse.json({ imageUrl, specs });
  } catch (err) {
    console.error("🚨 Backend error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
