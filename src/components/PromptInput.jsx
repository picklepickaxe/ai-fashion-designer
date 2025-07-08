'use client';

import { useState } from "react";

export default function PromptInput({ onImageReady }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const { imageUrl, specs } = await res.json();
      onImageReady(imageUrl, prompt, specs);
    } catch (err) {
      console.error("Failed to generate design:", err);
    }

    setLoading(false);
    setPrompt("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* 🟩 Prompt Input Box */}
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your fashion idea..."
        className="p-4 rounded-md text-white bg-[#6d8b84] border border-gray-400 focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-200"
      />

      {/* 🖤 Generate Button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-[#cbd4cb] text-gray-900 font-semibold py-2 px-4 rounded transition duration-200 disabled:opacity-50 hover:bg-[#1a1414] hover:text-white"
      >
        {loading ? "Generating..." : "Generate"}
      </button>
    </form>
  );
}
