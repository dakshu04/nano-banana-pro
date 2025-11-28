"use client";

import { useState } from "react";
import { removeBackground } from "@imgly/background-removal"; 

export default function BackgroundRemover() {
  const [preview, setPreview] = useState<string | null>(null);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setOutputImage(null);
    setStatusText("");
  };

  const handleRemoveBackground = async () => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (!file) return;

    setLoading(true);
    setStatusText("Initializing AI Model...");

    try {
      const config = {
        progress: (key: string, current: number, total: number) => {
           setStatusText(`Processing: ${Math.round((current / total) * 100)}%`);
        },
        debug: true 
      };

      const blob = await removeBackground(file, config);
      const url = URL.createObjectURL(blob);
      setOutputImage(url);
      setStatusText("Done!");

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

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      
      {/* Intro Text */}
      <div className="text-center max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold text-stone-800">Upload Image</h3>
        <p className="text-stone-500 mt-2">
            Upload any photo to instantly remove the background using local AI. 
        </p>
      </div>

      {/* Upload Area - with Warm Glow */}
      <div className="relative group cursor-pointer">
        {/* Glow Effect behind the border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
        
        <div className="relative bg-[#FFFDF7] border-2 border-dashed border-stone-300 group-hover:border-yellow-400 transition-colors p-12 rounded-xl text-center">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="space-y-4 pointer-events-none">
            <div className="w-16 h-16 bg-white rounded-full shadow-sm mx-auto flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform duration-300 border border-stone-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
            </div>
            <div>
                <p className="text-lg font-bold text-stone-700">Click to upload or drag & drop</p>
                <p className="text-sm text-stone-400 mt-1">Supports JPG, PNG, WEBP</p>
            </div>
          </div>
        </div>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LEFT: Original */}
        {preview && (
            <div className="space-y-3">
                <p className="text-sm font-bold text-stone-500 uppercase tracking-wide text-center">Original</p>
                <div className="relative h-64 bg-stone-100 rounded-2xl border border-stone-200 overflow-hidden flex items-center justify-center">
                    <img src={preview} alt="preview" className="max-h-full max-w-full object-contain" />
                </div>
            </div>
        )}

        {/* RIGHT: Output or Placeholder */}
        {outputImage ? (
            <div className="space-y-3">
                <p className="text-sm font-bold text-green-600 uppercase tracking-wide text-center flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> 
                    Processed
                </p>
                {/* Checkerboard background for transparency */}
                <div className="relative h-64 rounded-2xl border border-green-200 overflow-hidden flex items-center justify-center  bg-repeat">
                    <img src={outputImage} alt="output" className="relative z-10 max-h-full max-w-full object-contain" />
                </div>
            </div>
        ) : (
          preview && (
            <div className="space-y-3">
                 <p className="text-sm font-bold text-stone-400 uppercase tracking-wide text-center">Result</p>
                 <div className="h-64 bg-stone-50 rounded-2xl border border-dashed border-stone-300 flex items-center justify-center text-stone-400">
                    <span className="text-sm">Waiting to process...</span>
                 </div>
            </div>
          )
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 max-w-md mx-auto pt-4">
        {preview && !outputImage && (
            <button
            onClick={handleRemoveBackground}
            disabled={loading}
            className={`
                group relative w-full py-4 px-6 rounded-xl font-bold text-stone-900 shadow-xl shadow-orange-100 transition-all duration-300
                ${loading 
                    ? 'bg-stone-300 text-stone-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:shadow-orange-200 hover:scale-[1.02] active:scale-[0.98]'
                }
            `}
            >
            {loading ? (
                <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5 text-stone-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {statusText}
                </span>
            ) : (
                <span className="flex items-center justify-center gap-2">
                    Remove Background 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:animate-pulse">
                        <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813a3.75 3.75 0 0 0 2.576-2.576l.813-2.846A.75.75 0 0 1 9 4.5ZM9 15a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5A.75.75 0 0 1 9 15Z" clipRule="evenodd" />
                    </svg>
                </span>
            )}
            </button>
        )}

        {outputImage && (
            <button
            onClick={handleDownload}
            className="w-full py-4 px-6 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 shadow-xl shadow-green-200 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M12 12v7.5m0 0 3-3m-3 3-3-3m6-6h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                Download High-Res PNG
            </button>
        )}
      </div>

    </div>
  );
}