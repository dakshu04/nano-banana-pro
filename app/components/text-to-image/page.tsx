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

  const handleDownload = () => {
    if (!preview) return;
    const link = document.createElement("a");
    link.href = preview;
    link.download = `nano-banana-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      
      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-3xl font-black text-stone-800 tracking-tight">
          Text to Image
        </h2>
        <p className="text-stone-500 mt-2 text-lg">
          Turn your wildest imagination into reality with one click.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        
        {/* LEFT COLUMN: CONTROLS (Takes up 2/5 space) */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Input Card */}
            <div className="bg-[#FFFDF7] border border-stone-200 p-6 rounded-3xl shadow-sm relative group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-t-3xl opacity-0  transition-opacity" />
                
                <label className="block mb-3 font-bold text-stone-700 flex items-center gap-2">
                    <span className="bg-yellow-100 text-yellow-700 p-1 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>
                    </span>
                    Describe your idea
                </label>

                <textarea
                    rows={6}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="A futuristic bounty hunter standing on a rainy cyberpunk rooftop…"
                    className="w-full p-4 resize-none bg-white border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all shadow-inner text-lg leading-relaxed"
                />

                <div className="mt-4 flex justify-end">
                    <span className="text-xs font-medium text-stone-400">
                        {prompt.length}/500 chars
                    </span>
                </div>
            </div>

            <button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-lg text-stone-900 shadow-xl shadow-orange-100 transition-all duration-300
                ${loading || !prompt.trim()
                    ? "bg-stone-200 text-stone-400 cursor-not-allowed shadow-none"
                    : "bg-gradient-to-r from-yellow-400 to-orange-500 hover:shadow-orange-200 hover:scale-[1.02] active:scale-[0.98]"
                }`}
            >
                {loading ? (
                     <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-stone-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Dreaming...
                     </span>
                ) : (
                    "Generate Artwork 🎨"
                )}
            </button>
        </div>

        {/* RIGHT COLUMN: PREVIEW (Takes up 3/5 space) */}
        <div className="lg:col-span-3">
            <div className={`relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-stone-200 transition-all duration-500
                ${!preview && !loading ? "bg-stone-100" : "bg-white"}
            `}>
                
                {/* 1. EMPTY STATE */}
                {!preview && !loading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 space-y-4">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-4xl grayscale opacity-50">🖼️</span>
                        </div>
                        <p className="font-medium">Your masterpiece will appear here</p>
                    </div>
                )}

                {/* 2. LOADING STATE (Pulse) */}
                {loading && (
                    <div className="absolute inset-0 bg-stone-100 animate-pulse flex flex-col items-center justify-center">
                         <div className="w-20 h-20 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"/>
                         <p className="text-stone-500 font-bold animate-bounce">Creating pixels...</p>
                    </div>
                )}

                {/* 3. RESULT IMAGE */}
                {preview && !loading && (
                    <div className="group relative w-full h-full">
                        <img
                            src={preview}
                            alt="Generated"
                            className="w-full h-full object-cover"
                        />
                        
                        {/* Overlay Actions */}
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                            <button 
                                onClick={handleDownload}
                                className="bg-white text-stone-900 px-6 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-colors flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M12 12v7.5m0 0 3-3m-3 3-3-3m6-6h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
                                Download
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
}