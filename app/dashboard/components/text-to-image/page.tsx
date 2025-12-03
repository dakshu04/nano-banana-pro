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
  "Cyberpunk street food vendor in rain",
  "Minimalist logo of a fox, vector style",
  "Isometric 3D room with plants",
  "Portrait of a cat wearing a space suit"
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
    <div className="flex flex-col h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* --- Header Section --- */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Imagine & Create</h1>
          <p className="text-zinc-500 mt-1">Transform your words into stunning visuals with SnapMod AI.</p>
        </div>
      </div>

      {/* --- Main Workspace --- */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        
        {/* --- LEFT: Controls (Span 5 on large) --- */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Input Card */}
          <div className="flex-1 bg-white rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden">
            <div className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Prompt</label>
                <span className={`text-[10px] font-medium ${prompt.length > 450 ? "text-amber-500" : "text-zinc-400"}`}>
                  {prompt.length}/500
                </span>
              </div>
              
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A futuristic city with flying cars, neon lights, 4k render..."
                className="flex-1 w-full bg-transparent border-0 p-0 resize-none outline-none text-lg text-zinc-800 placeholder:text-zinc-300 leading-relaxed font-medium min-h-[140px] focus:ring-0"
              />

              {/* Inspiration Chips */}
              <div className="mt-6 pt-6 border-t border-zinc-100">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-3">Try these</p>
                <div className="flex flex-wrap gap-2">
                  {PRESET_PROMPTS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPrompt(p)}
                      className="px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-600 hover:bg-white hover:border-amber-400 hover:text-amber-600 transition-all text-left active:scale-95"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="bg-zinc-50 p-4 border-t border-zinc-100 flex items-center gap-3">
               {prompt && (
                  <button 
                    onClick={() => setPrompt("")}
                    className="h-12 w-12 flex items-center justify-center rounded-xl bg-white border border-zinc-200 text-zinc-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all active:scale-95"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={handleGenerate}
                  disabled={loading || !prompt.trim()}
                  className={`
                    flex-1 h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]
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
                      <SparklesIcon className="w-5 h-5 text-amber-400" /> 
                      <span className="bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">Generate Art</span>
                     </>
                  )}
                </button>
            </div>
          </div>
        </div>

        {/* --- RIGHT: Preview (Span 7 on large) --- */}
        <div className="lg:col-span-7 h-full min-h-[400px]">
          <div className="h-full bg-zinc-100 rounded-3xl border border-zinc-200 overflow-hidden relative flex flex-col shadow-inner">
            
            {/* Background Pattern (Checkered) */}
            <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

            {/* Badge */}
            <div className="absolute top-6 left-6 z-20 px-4 py-1.5 bg-white/80 backdrop-blur-md border border-white/50 rounded-full text-xs font-bold text-zinc-600 shadow-sm flex items-center gap-2">
               Canvas
               {preview && <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
            </div>

            {/* Image Container */}
            <div className="flex-1 relative w-full p-6 md:p-12 flex items-center justify-center z-10">
              {preview ? (
                 <div className="relative group max-h-full max-w-full">
                    <img 
                      src={preview} 
                      alt="Generated Art" 
                      className="max-h-[600px] w-auto h-auto object-contain rounded-xl shadow-2xl shadow-zinc-400/20 bg-white" 
                    />
                    <div className="absolute inset-0 rounded-xl ring-1 ring-black/5 pointer-events-none" />
                 </div>
              ) : loading ? (
                <div className="flex flex-col items-center gap-6">
                   <div className="relative">
                      {/* Custom Ripple Animation */}
                      <div className="absolute inset-0 bg-amber-400/20 rounded-full animate-ping"></div>
                      <div className="relative bg-white p-4 rounded-full shadow-lg border border-zinc-100">
                        <SparklesIcon className="w-8 h-8 text-amber-500 animate-pulse" />
                      </div>
                   </div>
                   <div className="text-center space-y-1">
                     <p className="text-zinc-800 font-bold animate-pulse">Dreaming up your image...</p>
                     <p className="text-zinc-400 text-xs">This usually takes about 5-10 seconds</p>
                   </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-zinc-400 gap-4 text-center max-w-sm">
                   <div className="w-20 h-20 rounded-3xl bg-white border border-zinc-200 flex items-center justify-center shadow-sm rotate-3">
                      <ImageIcon className="w-10 h-10 text-zinc-300" />
                   </div>
                   <div>
                     <p className="text-zinc-900 font-medium mb-1">Your canvas is empty</p>
                     <p className="text-sm">Type a prompt on the left to start creating magic with SnapMod.</p>
                   </div>
                </div>
              )}
            </div>

            {/* Footer Action (Only shows if image exists) */}
            {preview && (
              <div className="bg-white border-t border-zinc-200 p-4 md:p-6 flex justify-end z-20">
                <button
                  onClick={handleDownload}
                  className="w-full md:w-auto px-8 h-12 rounded-xl bg-zinc-900 text-white font-bold text-sm hover:bg-zinc-800 hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <DownloadIcon className="w-5 h-5" /> Download HD
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}