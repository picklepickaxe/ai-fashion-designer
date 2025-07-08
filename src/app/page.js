'use client';

import { useState } from "react";
import PromptInput from "../components/PromptInput";

export default function Home() {
  const [currentDesign, setCurrentDesign] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleDesign = (imageUrl, prompt, specs) => {
    if (currentDesign) {
      setDesigns([currentDesign, ...designs]); // move current to history
    }
    setCurrentDesign({ imageUrl, prompt, specs }); // set new current
  };

  return (
    <main className="min-h-screen bg-[#374b43] text-gray-100 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-white mb-2 tracking-tight">
   AI Fashion Design Generator 
</h1>
<p className="text-center text-gray-300 mb-8">
  Describe your idea and watch it come to life.
</p>


        <PromptInput onImageReady={handleDesign} />

        {/* Current Design */}
        {currentDesign && (
          <div className="mt-10 bg-[#6d8b84] shadow-md border border-gray-200 rounded-lg overflow-hidden">
            <img src={currentDesign.imageUrl} alt="Current Fashion" className="w-full" />
            <div className="p-4">
              <p className="text-sm text-gray-100 mb-2">Prompt:</p>
              <p className="italic text-white">"{currentDesign.prompt}"</p>
              <hr className="my-4 border-gray-400" />
              <p className="text-sm text-gray-100 mb-1">Generated Specs:</p>
              <pre className="text-sm bg-gray-800 text-white p-3 rounded whitespace-pre-wrap">
                {currentDesign.specs}
              </pre>
            </div>
          </div>
        )}

        {/* Toggle History Button */}
        {designs.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-[#cbd4cb] underline hover:text-[#783735] transition"
            >
              {showHistory ? "Hide History" : "Show History"}
            </button>
          </div>
        )}

        {/* Design History */}
        {showHistory && (
          <div className="mt-8 space-y-8">
            {designs.map((design, i) => (
              <div key={i} className="bg-[#6d8b84] shadow-md border border-gray-200 rounded-lg overflow-hidden">
                <img src={design.imageUrl} alt="Past Design" className="w-full" />
                <div className="p-4">
                  <p className="text-sm text-gray-100 mb-2">Prompt:</p>
                  <p className="italic text-white">"{design.prompt}"</p>
                  <hr className="my-4 border-gray-400" />
                  <p className="text-sm text-gray-100 mb-1">Generated Specs:</p>
                  <pre className="text-sm bg-gray-800 text-white p-3 rounded whitespace-pre-wrap">
                    {design.specs}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
