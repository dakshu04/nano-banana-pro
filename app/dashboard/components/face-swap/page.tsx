"use client";

import { useState } from "react";
import axios from "axios";

/* Minimal Icons */
const UploadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>
);
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
);
const PhotoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
);
const SparklesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M12 12v7.5m0 0 3-3m-3 3-3-3m6-6h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
);
const RefreshIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
);

export default function FaceSwap() {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [targetImage, setTargetImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // --- Handlers ---
  const handleSourceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setSourceImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleTargetUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        setTargetImage(reader.result as string);
        setGeneratedImage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!sourceImage || !targetImage) return;
    setLoading(true);
    try {
      const res = await axios.post("/api/face-swap", {
        source: sourceImage.split(",")[1],
        target: targetImage.split(",")[1],
      });
      setGeneratedImage(`data:image/png;base64,${res.data.image}`);
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.error || "Face Swap failed");
    }
    setLoading(false);
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "nano-banana-swap.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetTarget = () => {
      setTargetImage(null);
      setGeneratedImage(null);
  }

  // --- Render ---
  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-8rem)] md:min-h-0">
      
      {/* Header */}
      <div className="mb-6 flex items-center justify-between shrink-0">
        <div>
            <h3 className="text-xl font-bold text-zinc-900">Face Swap</h3>
            <p className="text-sm text-zinc-500">Cinematic identity transfer. 100% Private.</p>
        </div>
      </div>

      {/* Main Grid - Stacked on Mobile, Side-by-Side on Desktop */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        
        {/* LEFT COLUMN: Source Face */}
        <div className="flex flex-col bg-zinc-50 rounded-2xl border border-zinc-200 overflow-hidden relative min-h-[350px] lg:min-h-0 lg:h-full transition-all">
            
            {/* Badge */}
            <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 backdrop-blur-sm border border-zinc-200 rounded-full text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2 shadow-sm">
                <UserIcon /> Source Face
            </div>

            <div className="flex-1 relative w-full h-full group">
                {!sourceImage ? (
                    <label className="absolute inset-0 cursor-pointer flex flex-col items-center justify-center p-6 text-center hover:bg-zinc-100 transition-colors">
                        <input type="file" accept="image/*" onChange={handleSourceUpload} className="hidden" />
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-zinc-200 flex items-center justify-center text-zinc-400 mb-4 group-hover:scale-110 transition-transform">
                            <UploadIcon />
                        </div>
                        <span className="text-sm font-bold text-zinc-700">Upload Face</span>
                        <span className="text-xs text-zinc-400 mt-1">The face you want to use</span>
                    </label>
                ) : (
                    <div className="absolute inset-0 p-6 md:p-8 flex items-center justify-center">
                         <img src={sourceImage} alt="Source" className="max-w-full max-h-full object-contain drop-shadow-md rounded-lg" />
                         {/* Hover to change */}
                         <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                             <input type="file" accept="image/*" onChange={handleSourceUpload} className="hidden" />
                             <span className="text-white text-xs font-bold border border-white/50 px-3 py-1 rounded-full backdrop-blur-sm">Change Photo</span>
                         </label>
                    </div>
                )}
            </div>
            
            {/* Source Footer Status */}
            <div className="h-16 border-t border-zinc-200 bg-white p-4 flex items-center justify-between shrink-0">
                 <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Step 1</span>
                 {sourceImage ? (
                     <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"/> Ready</span>
                 ) : (
                    <span className="text-xs text-zinc-300 italic">Waiting for upload...</span>
                 )}
            </div>
        </div>

        {/* RIGHT COLUMN: Target / Result */}
        <div className="flex flex-col bg-white rounded-2xl border border-zinc-200 overflow-hidden relative shadow-sm min-h-[400px] lg:min-h-0 lg:h-full transition-all">
             
             {/* Badge */}
             <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 backdrop-blur-sm border border-zinc-200 rounded-full text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2 shadow-sm">
                <PhotoIcon /> {generatedImage ? "Final Result" : "Target Body"}
            </div>

            {/* Content */}
            <div className="flex-1 relative w-full h-full group">
                {generatedImage ? (
                     // SHOW RESULT
                     <div className="absolute inset-0 p-4 md:p-6 flex items-center justify-center bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-zinc-50">
                        <img src={generatedImage} alt="Result" className="max-w-full max-h-full object-contain shadow-xl rounded-lg animate-in fade-in zoom-in duration-300" />
                     </div>
                ) : targetImage ? (
                    // SHOW UPLOADED TARGET
                    <div className="absolute inset-0 p-6 md:p-8 flex items-center justify-center">
                         <img src={targetImage} alt="Target" className="max-w-full max-h-full object-contain drop-shadow-md opacity-80" />
                         <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                             <input type="file" accept="image/*" onChange={handleTargetUpload} className="hidden" />
                             <span className="text-white text-xs font-bold border border-white/50 px-3 py-1 rounded-full backdrop-blur-sm">Change Target</span>
                         </label>
                    </div>
                ) : (
                    // SHOW UPLOAD STATE
                    <label className="absolute inset-0 cursor-pointer flex flex-col items-center justify-center p-6 text-center hover:bg-zinc-50 transition-colors group">
                        <input type="file" accept="image/*" onChange={handleTargetUpload} className="hidden" />
                        <div className="w-16 h-16 bg-zinc-50 rounded-xl border border-dashed border-zinc-300 flex items-center justify-center text-zinc-400 mb-4 group-hover:scale-110 group-hover:border-zinc-400 transition-all">
                            <UploadIcon />
                        </div>
                        <span className="text-sm font-bold text-zinc-700">Upload Target Body</span>
                        <span className="text-xs text-zinc-400 mt-1">Where the face will go</span>
                    </label>
                )}
            </div>

            {/* Action Bar */}
            <div className="h-auto min-h-[5rem] border-t border-zinc-100 bg-zinc-50/50 p-4 flex items-center justify-center shrink-0 z-20 gap-3">
                {generatedImage ? (
                    <>
                        <button 
                            onClick={resetTarget}
                            className="h-12 w-12 flex items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 hover:bg-white hover:text-zinc-900 transition-all active:scale-95"
                            title="Reset"
                        >
                            <RefreshIcon />
                        </button>
                        <button
                            onClick={handleDownload}
                            className="flex-1 h-12 rounded-xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 active:scale-[0.98]"
                        >
                            <DownloadIcon /> Download Result
                        </button>
                    </>
                ) : (
                    <button
                        onClick={handleGenerate}
                        disabled={!sourceImage || !targetImage || loading}
                        className={`
                            w-full h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]
                            ${sourceImage && targetImage 
                                ? "bg-zinc-900 text-white hover:bg-zinc-800 shadow-zinc-300" 
                                : "bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none"
                            }
                        `}
                    >
                        {loading ? (
                             <>
                                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Swapping Faces...
                             </>
                        ) : (
                             <><SparklesIcon /> Generate Face Swap</>
                        )}
                    </button>
                )}
            </div>
        </div>

      </div>
    </div>
  );
}