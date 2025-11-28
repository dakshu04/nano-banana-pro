"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function History() {
  const [images, setImages] = useState([]);
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

  if (loading) return <p>Loading your images...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-5">Your Image History</h1>

      {images.length === 0 && (
        <p className="text-gray-500">You have not generated any images yet.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative group">
            <img
              src={img.imageUrl}
              className="rounded-lg shadow-md object-cover w-full h-48"
              alt="Generated Image"
            />

            <div className="mt-2 text-sm text-gray-600">
              {img.prompt.length > 40
                ? img.prompt.substring(0, 40) + "..."
                : img.prompt}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
