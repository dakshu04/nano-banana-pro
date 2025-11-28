"use client";

import { useState } from "react";

/* Minimal Icons */
const SparklesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M12 12v7.5m0 0 3-3m-3 3-3-3m6-6h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
);
const ImageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
);
const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
);

const PRESET_PROMPTS = [
  "Cyberpunk street food vendor in rain",
  "Minimalist logo of a fox, vector style",
  "Isometric 3D room with plants",
  "Portrait of a cat wearing a space suit"
];

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
    <div className="h-full flex flex-col">
      
      {/* Header */}
      <div className="mb-6 flex items-center justify-between shrink-0">
        <div>
            <h3 className="text-xl font-bold text-zinc-900">Text to Image</h3>
            <p className="text-sm text-zinc-500">Generative AI Engine v2.0</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        
        {/* LEFT COLUMN: Controls */}
        <div className="flex flex-col h-full bg-zinc-50 rounded-2xl border border-zinc-200 overflow-hidden relative">
            
            {/* Input Area */}
            <div className="flex-1 p-6 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Prompt</label>
                    <span className="text-[10px] text-zinc-400">{prompt.length}/500</span>
                </div>
                
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your imagination here..."
                    className="flex-1 w-full bg-transparent border-none resize-none outline-none text-lg text-zinc-800 placeholder-zinc-300 leading-relaxed font-medium"
                />

                {/* Chips */}
                <div className="mt-6">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Quick Inspiration</p>
                    <div className="flex flex-wrap gap-2">
                        {PRESET_PROMPTS.map((p) => (
                            <button
                                key={p}
                                onClick={() => setPrompt(p)}
                                className="px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-600 hover:border-amber-400 hover:text-amber-600 transition-colors shadow-sm text-left"
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="h-20 border-t border-zinc-200 bg-white p-4 flex items-center gap-3 shrink-0">
                {prompt && (
                    <button 
                        onClick={() => setPrompt("")}
                        className="h-12 w-12 flex items-center justify-center rounded-xl border border-zinc-200 text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                        <TrashIcon />
                    </button>
                )}
                <button
                    onClick={handleGenerate}
                    disabled={loading || !prompt.trim()}
                    className={`
                        flex-1 h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md
                        ${loading || !prompt.trim()
                            ? "bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none"
                            : "bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:shadow-orange-200 hover:scale-[1.01]"
                        }
                    `}
                >
                    {loading ? (
                        <>
                           <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                           Generating...
                        </>
                    ) : (
                         <><SparklesIcon /> Generate Art</>
                    )}
                </button>
            </div>
        </div>

        {/* RIGHT COLUMN: Preview */}
        <div className="flex flex-col h-full bg-white rounded-2xl border border-zinc-200 overflow-hidden relative shadow-sm">
             
             {/* Badge */}
             <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 backdrop-blur-sm border border-zinc-200 rounded-full text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                Preview
                {preview && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />}
            </div>

            <div className="flex-1 relative min-h-0 bg-zinc-50/50 flex items-center justify-center">
                {preview ? (
                     <img src={preview} alt="Generated" className="w-full h-full object-contain" />
                ) : loading ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-zinc-200 rounded-full"></div>
                            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="text-zinc-400 text-xs font-bold animate-pulse">Dreaming pixels...</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-zinc-300 gap-3">
                        <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-zinc-200 flex items-center justify-center">
                            <ImageIcon />
                        </div>
                        <span className="text-sm font-medium">Your masterpiece will appear here</span>
                    </div>
                )}
            </div>

            {/* Action Bar (Only shows when image exists) */}
            <div className="h-20 border-t border-zinc-100 bg-white p-4 flex items-center justify-center shrink-0">
                {preview ? (
                    <button
                        onClick={handleDownload}
                        className="w-full h-12 rounded-xl bg-zinc-900 text-white font-bold text-sm hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200 flex items-center justify-center gap-2"
                    >
                        <DownloadIcon /> Download High-Res
                    </button>
                ) : (
                    <span className="text-xs text-zinc-300 font-medium">Waiting for generation...</span>
                )}
            </div>
        </div>

      </div>
    </div>
  );
}