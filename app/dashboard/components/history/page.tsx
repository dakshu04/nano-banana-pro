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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="aspect-square rounded-2xl bg-zinc-100 animate-pulse border border-zinc-200 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100/30 to-transparent skew-x-12 animate-shimmer" />
          </div>
        ))}
      </div>
    );
  }

  // --- 2. EMPTY STATE ---
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-yellow-50 rounded-full flex items-center justify-center mb-6 border border-yellow-100">
            <span className="text-3xl md:text-4xl">🍌</span>
        </div>
        <h3 className="text-lg md:text-xl font-bold text-zinc-800">No masterpieces yet</h3>
        <p className="text-zinc-500 mt-2 max-w-sm text-sm md:text-base">
          Your creative journey starts now. Go to the Text to Image tab to generate your first visual!
        </p>
      </div>
    );
  }

  // --- 3. GALLERY GRID ---
  return (
    <div className="space-y-6 pb-20 md:pb-0"> {/* Padding bottom for mobile nav clearance */}
      
      {/* Header */}
      <div className="flex items-center justify-between sticky top-0 bg-[#FAFAFA] z-10 py-2 md:static">
        <h3 className="text-lg md:text-xl font-bold text-zinc-800 flex items-center gap-2">
            Recent Creations
            <span className="text-xs font-normal text-zinc-400 bg-zinc-100 px-2 py-1 rounded-full border border-zinc-200">
                {images.length}
            </span>
        </h3>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {images.map((img) => (
          <div 
            key={img.id} 
            className="group relative aspect-square rounded-2xl overflow-hidden bg-white border border-zinc-200 shadow-sm hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300"
          >
            {/* Image with Zoom Effect */}
            <img
              src={img.imageUrl}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="Generated Art"
            />

            {/* Overlay: Always visible gradient on mobile, stronger on hover for desktop */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              
              {/* Prompt Text */}
              <p className="text-white text-sm font-medium line-clamp-2 mb-3 drop-shadow-md">
                {img.prompt}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-2">
                 <a 
                   href={img.imageUrl} 
                   download={`snapmod-${img.id}.png`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex-1 bg-white/20 backdrop-blur-md hover:bg-yellow-400 hover:text-zinc-900 text-white text-xs font-bold py-2.5 rounded-xl text-center transition-colors border border-white/30 shadow-lg active:scale-95"
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