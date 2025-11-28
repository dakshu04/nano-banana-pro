"use client";
import axios from "axios";
import { useEffect, useState } from "react";

// Define the shape of your history data
interface HistoryItem {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt?: string;
}

export default function History() {
  const [images, setImages] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await axios.get("/api/history");
        setImages(res.data.images || []);
      } catch (err) {
        console.error("Error loading history:", err);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  // --- 1. SKELETON LOADING STATE ---
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="aspect-square rounded-2xl bg-stone-100 animate-pulse border border-stone-200 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100/30 to-transparent skew-x-12 animate-shimmer" />
          </div>
        ))}
      </div>
    );
  }

  // --- 2. EMPTY STATE ---
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center mb-6 border border-yellow-100">
            <span className="text-4xl">🍌</span>
        </div>
        <h3 className="text-xl font-bold text-stone-800">No masterpieces yet</h3>
        <p className="text-stone-500 mt-2 max-w-sm">
          Your creative journey starts now. Go to the `Text to Image tab to generate your first visual!
        </p>
      </div>
    );
  }

  // --- 3. GALLERY GRID ---
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
            Recent Creations
            <span className="text-xs font-normal text-stone-400 bg-stone-100 px-2 py-1 rounded-full">
                {images.length} items
            </span>
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div 
            key={img.id} 
            className="group relative aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300"
          >
            {/* Image with Zoom Effect */}
            <img
              src={img.imageUrl}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="Generated Art"
            />

            {/* Overlay (Visible on Hover) */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              
              {/* Prompt Text */}
              <p className="text-white text-sm font-medium line-clamp-2 mb-3">
                {img.prompt}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-2">
                 <a 
                   href={img.imageUrl} 
                   download={`nano-banana-${img.id}.png`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex-1 bg-white/20 backdrop-blur-md hover:bg-yellow-400 hover:text-stone-900 text-white text-xs font-bold py-2 rounded-lg text-center transition-colors border border-white/30"
                 >
                   Download
                 </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}