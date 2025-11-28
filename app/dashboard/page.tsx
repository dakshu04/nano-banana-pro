"use client";

import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import TextToImage from "../components/text-to-image/page";
import FaceSwap from "../components/face-swap/page";
import HeadShotGenerator from "../components/head-shot-generator/page";

import History from "../components/history/page";
import BackgroundRemover from "../components/background-remover/page";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const [credits, setCredits] = useState<number | null>(null);

  const menuItems = [
    { id: "text-to-image", label: "✨ Text to Image" },
    { id: "image-to-image", label: "🌀 Face Swap" },
    { id: "headshot", label: "📸 Headshot Generator" },
    { id: "background", label: "🎨 Background Removal" },
    { id: "history", label: "🌄 Image History"}
  ];

  const [activePage, setActivePage] = useState("text-to-image");

  useEffect(() => {
    if (!isLoaded || !user) return;

    async function loadCredits() {
      try {
        const res = await fetch("/api/user");
        if (!res.ok) return console.error("Error fetching user");
        const data = await res.json();
        setCredits(data.credits);
      } catch (error) {
        console.error("Failed to load credits:", error);
      }
    }

    loadCredits();
  }, [isLoaded, user]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f6f2] text-black font-sans">
      {/* ----------------------------------------------- */}
      {/* PREMIUM SIDEBAR */}
      {/* ----------------------------------------------- */}
      <aside className="w-72 bg-white border-r border-gray-300 rounded-r-3xl shadow-xl p-6 flex flex-col justify-between">

        {/* LOGO */}
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-8 flex items-center gap-2">
            🍌 <span>Nano Banana</span>
          </h1>

          {/* MENU */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`cursor-pointer px-4 py-3 rounded-xl text-[15px] font-medium transition-all border
                  ${
                    activePage === item.id
                      ? "bg-yellow-300/40 border-yellow-600 text-yellow-800 shadow-[3px_3px_0px_#000]"
                      : "hover:bg-gray-100 text-gray-700 hover:shadow-sm"
                  }
                `}
              >
                {item.label}
              </div>
            ))}
          </nav>
        </div>

        {/* USER FOOTER */}
        <div className="space-y-4">

          {/* Credits Box */}
          <div className="flex items-center justify-between w-full p-4 bg-yellow-100 border border-gray-400 rounded-xl shadow-sm">
          <p className="font-bold text-gray-800 text-sm flex items-center gap-2">
            💰 Credits:
          </p>

          <span className="text-lg font-semibold text-gray-900">
            {credits === null ? "Loading..." : credits}
          </span>
        </div>


          {/* User Box */}
          <div className="flex items-center gap-3 p-4 bg-gray-100 border border-gray-400 rounded-xl">
            <UserButton />
            <div>
              <p className="font-semibold">{user?.fullName}</p>
              <p className="text-sm text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>

          {/* Sign Out */}
          <SignOutButton>
            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl shadow-md text-sm font-semibold">
              Sign Out
            </button>
        </SignOutButton>
        </div>
      </aside>

      {/* ----------------------------------------------- */}
      {/* MAIN CONTENT — SCROLLABLE ONLY */}
      {/* ----------------------------------------------- */}
      <main className="flex-1 p-10 overflow-y-auto">

        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {menuItems.find((i) => i.id === activePage)?.label}
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Create, transform and generate AI-powered visuals with ease.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-300">
          {activePage === "text-to-image" && <TextToImage />}
          {activePage === "image-to-image" && <FaceSwap />}
          {activePage === "headshot" && <HeadShotGenerator />}
          {activePage === "background" && <BackgroundRemover />}
          {activePage === "history" && <History />}
        </div>
      </main>
    </div>
  );
}
