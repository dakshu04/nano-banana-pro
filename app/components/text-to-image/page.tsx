"use client";
import { useState } from "react";

export default function TextToImage() {
  const [prompt, setPrompt] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setPreview(null);

    try {
      const res = await fetch("/api/text-to-image", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setPreview(data.imageUrl);
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-8">

      {/* TITLE + DESCRIPTION */}
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
          ✨ Text to Image Generator
        </h2>
        <p className="text-gray-600 max-w-xl">
          Describe any scene, artwork, style, or idea and our AI will turn it into a stunning image.
        </p>
      </div>

      {/* INPUT BOX */}
      <div className="bg-[#fffefa] border border-gray-300 p-6 rounded-2xl shadow-md">
        
        <label className="block mb-2 font-semibold text-gray-800">
          Your Prompt
        </label>

        <textarea
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. A futuristic neon banana city floating in the clouds..."
          className="w-full p-3 resize-none bg-white border border-gray-300 rounded-xl shadow-inner text-gray-800 focus:ring-2 focus:ring-yellow-400"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`mt-5 w-full py-3 rounded-xl font-semibold text-white text-sm shadow-md transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </div>

      {/* IMAGE RESULT */}
      {preview && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Generated Image</h3>

          <div className="bg-white border border-gray-300 p-4 rounded-2xl shadow-xl">
            <img
              src={preview}
              alt="Generated"
              className="w-full rounded-xl shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
