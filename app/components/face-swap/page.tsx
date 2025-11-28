"use client";

import { useState } from "react";
import axios from "axios"

export default function FaceSwap() {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [targetImage, setTargetImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    reader.onload = () => setTargetImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
  if (!sourceImage || !targetImage) return;

  setLoading(true);

  try {
    const res = await axios.post("/api/face-swap", {
      source: sourceImage.split(",")[1], // RAW base64
      target: targetImage.split(",")[1], // RAW base64
    });

    setTargetImage(`data:image/png;base64,${res.data.image}`);
  } catch (err) {
    console.error(err);
    alert(err?.response?.data?.error || "Face Swap failed");
  }

  setLoading(false);
};

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-black text-stone-800 tracking-tight">Face Swap Magic</h2>
        <p className="text-stone-500 mt-2 text-lg">
          Seamlessly blend a face from one photo into another using advanced AI.
        </p>
      </div>

      {/* MAIN UPLOAD GRID */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
        
        {/* --- CARD 1: SOURCE --- */}
        <div className="w-full md:w-1/2">
          <label className="block group cursor-pointer relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
            
            <div className={`relative bg-[#FFFDF7] border-2 border-dashed ${sourceImage ? 'border-yellow-400' : 'border-stone-300'} group-hover:border-yellow-500 transition-colors p-6 rounded-2xl h-80 flex flex-col items-center justify-center text-center overflow-hidden`}>
              
              <input type="file" accept="image/*" onChange={handleSourceUpload} className="hidden" />
              
              {sourceImage ? (
                <div className="w-full h-full relative">
                    <img src={sourceImage} alt="Source" className="w-full h-full object-contain rounded-lg" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white font-bold bg-black/50 px-3 py-1 rounded-full text-sm">Change Image</span>
                    </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-white rounded-full shadow-sm mx-auto flex items-center justify-center text-yellow-500 border border-stone-100 group-hover:scale-110 transition-transform">
                     {/* Face Icon */}
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                     </svg>
                  </div>
                  <div>
                    <p className="font-bold text-stone-700">1. Source Face</p>
                    <p className="text-xs text-stone-400 mt-1">The face you want to use</p>
                  </div>
                </div>
              )}
              
              {/* Badge */}
              <div className="absolute top-4 left-4 bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded-md border border-yellow-200">
                Source
              </div>
            </div>
          </label>
        </div>

        {/* --- CONNECTOR ARROW (Desktop Only) --- */}
        <div className="hidden md:flex flex-col items-center justify-center text-stone-300 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 animate-pulse">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
        </div>

        {/* --- CONNECTOR ARROW (Mobile Only) --- */}
        <div className="md:hidden flex items-center justify-center text-stone-300">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
        </div>

        {/* --- CARD 2: TARGET --- */}
        <div className="w-full md:w-1/2">
          <label className="block group cursor-pointer relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-300 to-red-300 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
            
            <div className={`relative bg-[#FFFDF7] border-2 border-dashed ${targetImage ? 'border-orange-400' : 'border-stone-300'} group-hover:border-orange-500 transition-colors p-6 rounded-2xl h-80 flex flex-col items-center justify-center text-center overflow-hidden`}>
              
              <input type="file" accept="image/*" onChange={handleTargetUpload} className="hidden" />
              
              {targetImage ? (
                <div className="w-full h-full relative">
                    <img src={targetImage} alt="Target" className="w-full h-full object-contain rounded-lg" />
                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white font-bold bg-black/50 px-3 py-1 rounded-full text-sm">Change Image</span>
                    </div>
                </div>
              ) : (
                <div className="space-y-4">
                   <div className="w-16 h-16 bg-white rounded-full shadow-sm mx-auto flex items-center justify-center text-orange-500 border border-stone-100 group-hover:scale-110 transition-transform">
                     {/* Photo Icon */}
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-stone-700">2. Target Body</p>
                    <p className="text-xs text-stone-400 mt-1">Where the face goes</p>
                  </div>
                </div>
              )}

              {/* Badge */}
               <div className="absolute top-4 left-4 bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-md border border-orange-200">
                Target
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* GENERATE BUTTON */}
      <div className="flex justify-center pt-4">
        <button
          onClick={handleGenerate}
          disabled={!sourceImage || !targetImage || loading}
          className={`
            relative w-full md:w-2/3 py-4 px-8 rounded-xl font-bold text-lg text-stone-900 transition-all duration-300 shadow-xl
            ${sourceImage && targetImage
                ? "bg-gradient-to-r from-yellow-400 to-orange-500 hover:shadow-orange-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                : "bg-stone-200 text-stone-400 cursor-not-allowed shadow-none"
            }
          `}
        >
          {loading ? (
             <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-stone-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Swap...
             </span>
          ) : (
            "Generate Face Swap ✨"
          )}
        </button>
      </div>

    </div>
  );
}