"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

/* --- Beautifully Styled Icons --- */
const SparklesIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const DownloadIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M12 12v7.5m0 0 3-3m-3 3-3-3m6-6h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
);
const ImageIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
);
const TrashIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);

const PRESET_PROMPTS = [
  "Cyberpunk street food vendor",
  "Minimalist logo of a fox",
  "Isometric 3D room",
  "Cat in a space suit"
];

export default function TextToImage() {
  const [prompt, setPrompt] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

      if (!res.ok) {
        if (res.status === 403) {
          toast.error("Not enough credits!", {
            action: { label: "Buy Credits", onClick: () => router.push("/#pricing") },
          });
        } else if (res.status === 401) {
          toast.error("Please sign in first");
          router.push("/sign-in");
        } else {
          toast.error(data.error || "Generation failed. Try again.");
        }
        setLoading(false);
        return;
      }

      setPreview(data.imageUrl);
      toast.success("Image generated!");
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!preview) return;
    const link = document.createElement("a");
    link.href = preview;
    link.download = `snapmod-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    // FIX 1: Main Container is fixed height (100dvh for mobile support) and no overflow
    <div className="flex flex-col h-[calc(100dvh-2rem)] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 overflow-hidden">
      
      {/* --- Header Section (No Shrink) --- */}
      <div className="shrink-0 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Imagine & Create</h1>
          <p className="text-sm text-zinc-500">Transform your words into visuals.</p>
        </div>
      </div>

      {/* --- Main Workspace (Flex fill) --- */}
      {/* FIX 2: min-h-0 is crucial for scrolling internal elements instead of body */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4">
        
        {/* --- LEFT: Controls --- */}
        {/* Mobile: Takes flexible height but max 45% to leave room for image. Desktop: Takes width */}
        <div className="flex-initial lg:flex-1 lg:max-w-md h-full flex flex-col gap-4 overflow-hidden">
          
          <div className="flex-1 bg-white rounded-3xl border border-zinc-200 shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 flex flex-col h-full">
              <div className="flex justify-between items-center mb-2 shrink-0">
                <label className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Prompt</label>
                <span className={`text-[10px] font-medium ${prompt.length > 450 ? "text-amber-500" : "text-zinc-400"}`}>
                  {prompt.length}/500
                </span>
              </div>
              
              {/* Textarea grows to fill available space */}
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A futuristic city with flying cars..."
                className="flex-1 w-full bg-transparent border-0 p-0 resize-none outline-none text-base md:text-lg text-zinc-800 placeholder:text-zinc-300 leading-relaxed font-medium focus:ring-0 min-h-[80px]"
              />

              {/* Inspiration Chips - Hidden on very small screens if needed, or scrollable */}
              <div className="mt-2 pt-2 border-t border-zinc-100 shrink-0">
                 {/* Horizontal scroll for chips on mobile to save vertical space */}
                <div className="flex flex-nowrap lg:flex-wrap gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {PRESET_PROMPTS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPrompt(p)}
                      className="whitespace-nowrap px-2.5 py-1 bg-zinc-50 border border-zinc-200 rounded-lg text-[10px] md:text-xs font-medium text-zinc-600 hover:bg-white hover:border-amber-400 hover:text-amber-600 transition-all active:scale-95"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="bg-zinc-50 p-3 border-t border-zinc-100 flex items-center gap-2 shrink-0">
               {prompt && (
                  <button 
                    onClick={() => setPrompt("")}
                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-zinc-200 text-zinc-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all active:scale-95"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={handleGenerate}
                  disabled={loading || !prompt.trim()}
                  className={`
                    flex-1 h-10 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]
                    ${loading || !prompt.trim()
                      ? "bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none"
                      : "bg-zinc-900 text-white hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-200"
                    }
                  `}
                >
                  {loading ? (
                    <>
                       <svg className="animate-spin h-4 w-4 text-zinc-400" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                       <span className="text-zinc-400">Thinking...</span>
                    </>
                  ) : (
                      <>
                       <SparklesIcon className="w-4 h-4 text-amber-400" /> 
                       <span className="bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">Generate</span>
                      </>
                  )}
                </button>
            </div>
          </div>
        </div>

        {/* --- RIGHT: Preview --- */}
        {/* Takes remaining space. On mobile, it's the bottom half. */}
        <div className="flex-1 h-full min-h-0">
          <div className="h-full bg-zinc-100 rounded-3xl border border-zinc-200 overflow-hidden relative flex flex-col shadow-inner">
            
            <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

            <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/80 backdrop-blur-md border border-white/50 rounded-full text-[10px] font-bold text-zinc-600 shadow-sm flex items-center gap-2">
               Canvas
               {preview && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
            </div>

            {/* FIX 3: Image container uses flex centering and min-h-0 to prevent overflow */}
            <div className="flex-1 relative w-full p-4 md:p-8 flex items-center justify-center z-10 min-h-0 overflow-hidden">
              {preview ? (
                 <div className="relative group w-full h-full flex items-center justify-center">
                    {/* FIX 4: Object contain ensures image fits without scrolling */}
                    <img 
                      src={preview} 
                      alt="Generated Art" 
                      className="max-h-full max-w-full object-contain rounded-lg shadow-2xl shadow-zinc-400/20 bg-white" 
                    />
                 </div>
              ) : loading ? (
                <div className="flex flex-col items-center gap-4">
                   <div className="relative">
                     <div className="absolute inset-0 bg-amber-400/20 rounded-full animate-ping"></div>
                     <div className="relative bg-white p-3 rounded-full shadow-lg border border-zinc-100">
                       <SparklesIcon className="w-6 h-6 text-amber-500 animate-pulse" />
                     </div>
                   </div>
                   <div className="text-center space-y-1">
                     <p className="text-zinc-800 font-bold animate-pulse text-sm">Dreaming...</p>
                   </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-zinc-400 gap-3 text-center max-w-xs">
                   <div className="w-16 h-16 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center shadow-sm rotate-3">
                      <ImageIcon className="w-8 h-8 text-zinc-300" />
                   </div>
                   <p className="text-sm">Type a prompt to create.</p>
                </div>
              )}
            </div>

            {preview && (
              <div className="bg-white border-t border-zinc-200 p-3 flex justify-end z-20 shrink-0">
                <button
                  onClick={handleDownload}
                  className="px-4 h-10 rounded-xl bg-zinc-900 text-white font-bold text-xs hover:bg-zinc-800 hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <DownloadIcon className="w-4 h-4" /> Save
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}