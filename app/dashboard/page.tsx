"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const [credits, setCredits] = useState<number | null>(null);

  const menuItems = [
    { id: "text-to-image", label: "TEXT TO IMAGE" },
    { id: "image-to-image", label: "IMAGE TO IMAGE" },
    { id: "headshot", label: "HEADSHOT GENERATOR" },
    { id: "background", label: "BACKGROUND REMOVAL" },
  ];

  const [activePage, setActivePage] = useState("text-to-image");

 useEffect(() => {
    // 2. Wait until Clerk is fully loaded and user exists
    if (!isLoaded || !user) return;

    async function loadCredits() {
      try {
        console.log("Fetching user data...");
        const res = await fetch("/api/user");
        
        if (!res.ok) {
            console.error("API Error:", res.statusText);
            return;
        }

        const data = await res.json();
        setCredits(data.credits);
      } catch (error) {
        console.error("Failed to load credits:", error);
      }
    }

    loadCredits();
  }, [isLoaded, user]); // 3. Add isLoaded to dependency array

  return (
    <div className="flex min-h-screen bg-white font-sans text-black">
      {/* Sidebar */}
      <div className="w-64 bg-yellow-100 border-r border-gray-300 p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold text-yellow-700 mb-6 flex items-center gap-2">
            🍌 NANO BANANA
          </h1>

          <div className="space-y-2 overflow-y-auto h-[50vh] pr-2">
            {menuItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`cursor-pointer px-3 py-2 rounded-md text-sm font-medium border ${
                  activePage === item.id
                    ? "border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-gray-900 translate-x-1"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div>
          <div className="mb-4 p-3 bg-white border border-gray-300 rounded-md text-sm">
            <p className="font-semibold">💰 CREDITS</p>
            <p className="text-gray-700 mt-1">
              {credits === null ? "Loading..." : `${credits} images remaining`}
            </p>
          </div>

          <div className="flex items-center p-3 bg-white border border-gray-300 rounded-md mb-3">
            <span className="mr-2">👤</span>
            <span>{user?.fullName}</span>
          </div>

          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-sm font-medium">
            SIGN OUT
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-10 bg-gray-50">

        {/* ------------------- */}
        {/* TEXT TO IMAGE PAGE */}
        {/* ------------------- */}
        {activePage === "text-to-image" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Text to Image</h2>
            <p className="text-gray-700 mb-4">
              Convert your text into an AI-generated image (uses 2 credits).
            </p>

            <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-sm max-w-3xl">
              <label className="block mb-2 font-semibold">Text Prompt:</label>
              <input
                type="text"
                placeholder="e.g., A futuristic city at sunset"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
              />

              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md font-medium">
                Generate (2 credits)
              </button>
            </div>
          </>
        )}

        {/* ---------------------- */}
        {/* IMAGE TO IMAGE PAGE */}
        {/* ---------------------- */}
        {activePage === "image-to-image" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Image to Image</h2>
            <p className="text-gray-700 mb-4">
              Upload an image and transform it into another version.
            </p>

            <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-sm max-w-3xl">
              <label className="block mb-2 font-semibold">Upload Image:</label>
              <input type="file" accept="image/*" className="w-full mb-4" />

              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium">
                Transform Image
              </button>
            </div>
          </>
        )}

        {/* ---------------------- */}
        {/* HEADSHOT GENERATOR */}
        {/* ---------------------- */}
        {activePage === "headshot" && (
          <>
            <h2 className="text-2xl font-bold mb-4">AI Headshot Generator</h2>
            <p className="text-gray-700 mb-4">
              Upload your photo and generate studio-quality portraits.
            </p>

            <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-sm max-w-3xl">
              <label className="block mb-2 font-semibold">Upload Face Image:</label>
              <input type="file" accept="image/*" className="w-full mb-4" />

              <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-md font-medium">
                Generate Headshots
              </button>
            </div>
          </>
        )}

        {/* ---------------------- */}
        {/* BACKGROUND REMOVAL */}
        {/* ---------------------- */}
        {activePage === "background" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Background Removal</h2>
            <p className="text-gray-700 mb-4">
              Remove the background from any image instantly.
            </p>

            <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-sm max-w-3xl">
              <label className="block mb-2 font-semibold">Upload Image:</label>
              <input type="file" accept="image/*" className="w-full mb-4" />

              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium">
                Remove Background
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
