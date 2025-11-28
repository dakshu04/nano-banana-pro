"use client";

import { useState } from "react";
// FIXED IMPORT: Using named import with brackets {}
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
    setOutputImage(null); // Clear previous output if new file selected
    setStatusText("");
  };

  const handleRemoveBackground = async () => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (!file) return;

    setLoading(true);
    setStatusText("Loading AI Model...");

    try {
      const config = {
        progress: (key: string, current: number, total: number) => {
           setStatusText(`Processing: ${Math.round((current / total) * 100)}%`);
        },
        debug: true 
      };

      // RUNS LOCALLY IN BROWSER
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

  // --- NEW DOWNLOAD FUNCTION ---
  const handleDownload = () => {
    if (!outputImage) return;

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = outputImage;
    link.download = "nano-banana-transparent.png"; // The filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full space-y-8">
      Nano Banana BG Remover

        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 hover:border-yellow-400 transition-colors p-8 rounded-xl bg-gray-50 text-center cursor-pointer relative">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="space-y-2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <p className="text-gray-500">Click to upload an image</p>
          </div>
        </div>

        {/* Images Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {preview && (
              <div className="text-center">
                  <p className="mb-2 text-sm font-semibold text-gray-600">Original</p>
                  <img src={preview} alt="preview" className="w-full h-48 object-contain bg-gray-100 rounded-lg border" />
              </div>
          )}

          {outputImage ? (
              <div className="text-center">
                  <p className="mb-2 text-sm font-semibold text-green-600">Background Removed!</p>
                  {/* Checkerboard background to show transparency */}
                  <img src={outputImage} alt="output" className="w-full h-48 object-contain rounded-lg border border-green-200" />
              </div>
          ) : (
            // Placeholder for right side
            preview && (
              <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg border border-dashed text-gray-300">
                 Waiting for processing...
              </div>
            )
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
            {preview && !outputImage && (
                <button
                onClick={handleRemoveBackground}
                disabled={loading}
                className={`w-full py-3 px-4 rounded-xl font-bold text-white transition-all shadow-lg transform active:scale-95
                    ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600'}`}
                >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {statusText}
                    </span>
                ) : "Remove Background Magic ✨"}
                </button>
            )}

            {outputImage && (
                <button
                onClick={handleDownload}
                className="w-full py-3 px-4 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download HD PNG
                </button>
            )}
        </div>

      </div>
    </div>
  );
}