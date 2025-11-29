"use client";

import { useState } from "react";
import { removeBackground } from "@imgly/background-removal"; 

/* Minimal Icons */
const UploadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>
);
const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M12 12v7.5m0 0 3-3m-3 3-3-3m6-6h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
);
const MagicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

export default function BackgroundRemover() {
  // FIXED: Added state to store the actual file object
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // FIXED: Store the file in state immediately
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setOutputImage(null); 
    setStatusText("");
    setProgress(0);
  };

  const handleRemoveBackground = async () => {
    // FIXED: Use the state variable instead of document.querySelector
    if (!imageFile) return;

    setLoading(true);
    setStatusText("Loading AI Model...");

    try {
      const config = {
        progress: (key: string, current: number, total: number) => {
           // FIXED: Ensure we don't divide by zero
           const percent = total > 0 ? Math.round((current / total) * 100) : 0;
           setStatusText(`Processing: ${percent}%`);
           setProgress(percent);
        },
        debug: true 
      };

      // RUNS LOCALLY IN BROWSER
      const blob = await removeBackground(imageFile, config);

      const url = URL.createObjectURL(blob);
      setOutputImage(url);
      setStatusText("Done!");
      setProgress(100);

    } catch (err) {
      console.error(err);
      setStatusText("Error removing background.");
    }

    setLoading(false);
  };

  const handleDownload = () => {
    if (!outputImage) return;
    const link = document.createElement("a");
    link.href = outputImage;
    link.download = "nano-banana-transparent.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setPreview(null);
    setImageFile(null); // Clear file state
    setOutputImage(null);
    setProgress(0);
    setStatusText("");
  }

  return (
    <div className="h-full flex flex-col">
      
      {/* Header */}
      <div className="mb-6 flex items-center justify-between shrink-0">
        <div>
            <h3 className="text-xl font-bold text-zinc-900">Background Remover</h3>
            <p className="text-sm text-zinc-500">Local AI processing. 100% Private.</p>
        </div>
        {(preview || outputImage) && (
            <button 
                onClick={handleReset}
                className="text-zinc-400 hover:text-red-500 transition-colors flex items-center gap-1 text-xs font-bold uppercase tracking-wider"
            >
                <XIcon /> Reset
            </button>
        )}
      </div>

      {/* Main Grid - Symmetrical & Stretched */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        
        {/* LEFT COLUMN: Input */}
        <div className="flex flex-col h-full bg-zinc-50 rounded-2xl border border-zinc-200 overflow-hidden relative">
            
            {/* Header Badge */}
            <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/80 backdrop-blur-sm border border-zinc-200 rounded-full text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                Original
            </div>

            {/* Content Area (Flexible Height) */}
            <div className="flex-1 relative min-h-0">
                {!preview ? (
                    // Upload State
                    <label className="absolute inset-0 cursor-pointer flex flex-col items-center justify-center p-6 text-center hover:bg-zinc-100 transition-colors">
                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-zinc-200 flex items-center justify-center text-zinc-400 mb-4">
                            <UploadIcon />
                        </div>
                        <span className="text-sm font-bold text-zinc-700">Upload Image</span>
                        <span className="text-xs text-zinc-400 mt-1">JPG, PNG, WEBP</span>
                    </label>
                ) : (
                    // Image Preview State
                    <div className="absolute inset-0 p-8 flex items-center justify-center">
                        <img src={preview} alt="Original" className="max-w-full max-h-full object-contain drop-shadow-sm" />
                    </div>
                )}
            </div>

            {/* Bottom Action Bar (Fixed Height) */}
            <div className="h-20 border-t border-zinc-200 bg-white p-4 flex items-center justify-center shrink-0">
                {preview && !loading && !outputImage && (
                    <button
                        onClick={handleRemoveBackground}
                        className="w-full py-3 rounded-xl bg-zinc-900 text-white font-bold text-sm hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200 flex items-center justify-center gap-2"
                    >
                        <MagicIcon /> Remove Background
                    </button>
                )}
                
                {loading && (
                     <div className="w-full space-y-2">
                        <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase">
                            <span>{statusText}</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                )}

                {!preview && (
                    <span className="text-xs text-zinc-400 font-medium">Waiting for upload...</span>
                )}

                {/* Just a disabled state to keep height consistent if finished */}
                {outputImage && (
                    <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-wider">
                         <span className="w-2 h-2 bg-zinc-300 rounded-full" /> Input Locked
                    </div>
                )}
            </div>
        </div>

        {/* RIGHT COLUMN: Output */}
        <div className="flex flex-col h-full bg-white rounded-2xl border border-zinc-200 overflow-hidden relative shadow-sm">
             
             {/* Header Badge */}
             <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 backdrop-blur-sm border border-zinc-200 rounded-full text-[10px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-2">
                Result
                {outputImage && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />}
            </div>

            {/* Content Area (Checkerboard Background) */}
            <div 
                className="flex-1 relative min-h-0"
                style={{
                    backgroundImage: `
                        linear-gradient(45deg, #f9fafb 25%, transparent 25%), 
                        linear-gradient(-45deg, #f9fafb 25%, transparent 25%), 
                        linear-gradient(45deg, transparent 75%, #f9fafb 75%), 
                        linear-gradient(-45deg, transparent 75%, #f9fafb 75%)
                    `,
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                }}
            >
                {outputImage ? (
                     <div className="absolute inset-0 p-8 flex items-center justify-center">
                        <img src={outputImage} alt="Result" className="max-w-full max-h-full object-contain" />
                     </div>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-300 gap-3">
                         <div className="w-12 h-12 rounded-xl border-2 border-dashed border-zinc-200 flex items-center justify-center">
                            <MagicIcon />
                         </div>
                         <span className="text-sm font-medium">Processed image will appear here</span>
                    </div>
                )}
            </div>

             {/* Bottom Action Bar (Fixed Height) */}
             <div className="h-20 border-t border-zinc-100 bg-white p-4 flex items-center justify-center shrink-0 z-20">
                {outputImage ? (
                    <button
                        onClick={handleDownload}
                        className="w-full py-3 rounded-xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
                    >
                        <DownloadIcon /> Download PNG
                    </button>
                ) : (
                    <span className="text-xs text-zinc-300 font-medium">No result yet</span>
                )}
            </div>
        </div>

      </div>
    </div>
  );
}

