"use client";

import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

// Components
import TextToImage from "../components/text-to-image/page";
import FaceSwap from "../components/face-swap/page";
import HeadShotGenerator from "../components/head-shot-generator/page";
import History from "../components/history/page";
import BackgroundRemover from "../components/background-remover/page";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const [credits, setCredits] = useState<number | null>(null);

  const menuItems = [
    { id: "text-to-image", label: "Text to Image", icon: "✨" },
    { id: "image-to-image", label: "Face Swap", icon: "🌀" },
    { id: "headshot", label: "Headshot Gen", icon: "📸" },
    { 
      id: "background", 
      label: "Remove Background", 
      icon: "🎨",
      badge: "FREE" 
    },
    { id: "history", label: "History", icon: "clock" }
  ];

  const [activePage, setActivePage] = useState("text-to-image");

  useEffect(() => {
    if (!isLoaded || !user) return;
    async function loadCredits() {
      try {
        const res = await fetch("/api/user");
        if (!res.ok) return;
        const data = await res.json();
        setCredits(data.credits);
      } catch (error) {
        console.error("Failed to load credits:", error);
      }
    }
    loadCredits();
  }, [isLoaded, user]);

  return (
    // Changed selection color to match banana theme
    <div className="flex h-screen overflow-hidden bg-[#FFFDF7] font-sans selection:bg-yellow-200 selection:text-yellow-900">
      
      {/* ---------------------------------------------------------- */}
      {/* BACKGROUND DECORATION (The "Banana" Glow) */}
      {/* ---------------------------------------------------------- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Changed blobs to Yellow/Orange */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-200/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-200/40 rounded-full blur-[100px]" />
      </div>

      {/* ---------------------------------------------------------- */}
      {/* SIDEBAR - FLOATING GLASS STYLE */}
      {/* ---------------------------------------------------------- */}
      <aside className="relative z-10 w-80 p-6 flex flex-col justify-between hidden md:flex">
        {/* Glass Container */}
        <div className="w-full h-full bg-white/60 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl flex flex-col p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          
          {/* LOGO */}
          <div className="mb-10 pl-2">
            {/* Changed Gradient to Yellow -> Orange */}
            <h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center gap-3">
              <span className="text-3xl drop-shadow-sm text-white">🍌</span> Nano Banana Pro
            </h1>
            <p className="text-xs text-stone-400 font-medium tracking-widest uppercase mt-2 ml-1">AI Creative Studio</p>
          </div>

          {/* MENU */}
          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`
                    group relative cursor-pointer px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ease-out flex items-center justify-between
                    ${isActive 
                      // Active State: Yellow Gradient + Dark Text (Banana Style)
                      ? "bg-gradient-to-r from-yellow-300 to-orange-300 text-stone-900 shadow-lg shadow-yellow-200/50 translate-x-1" 
                      : "text-stone-500 hover:bg-white hover:text-stone-800 hover:shadow-md"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-lg transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                        {item.icon === 'clock' ? 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> 
                        : item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {/* BADGE */}
                  {item.badge && (
                    <span className={`
                      text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-sm tracking-wide
                      ${isActive 
                        ? "bg-white/40 text-stone-800 backdrop-blur-md" 
                        : "bg-green-100 text-green-700 border border-green-200"
                      }
                    `}>
                      {item.badge}
                    </span>
                  )}
                </div>
              );
            })}
          </nav>

          {/* USER FOOTER */}
          <div className="mt-8 space-y-4 pt-6 border-t border-stone-100">
            
            {/* Credits Pill */}
            <div className="flex items-center justify-between bg-[#FFFBEB] border border-yellow-100 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2 text-stone-600 text-xs font-bold uppercase tracking-wider">
                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                    Credits
                </div>
                <span className="text-stone-900 font-bold">{credits ?? "-"}</span>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3 pl-1">
               <div className="ring-2 ring-yellow-100 rounded-full p-0.5">
                   <UserButton afterSignOutUrl="/"/>
               </div>
               <div className="overflow-hidden">
                   <p className="text-sm font-bold text-stone-700 truncate">{user?.fullName}</p>
                   <p className="text-xs text-stone-400 truncate">{user?.primaryEmailAddress?.emailAddress}</p>
               </div>
            </div>

             <SignOutButton>
                <button className="w-full text-xs font-semibold text-stone-400 hover:text-red-500 transition-colors py-2 text-left pl-1">
                    Sign Out
                </button>
            </SignOutButton>
          </div>
        </div>
      </aside>

      {/* ---------------------------------------------------------- */}
      {/* MAIN CONTENT */}
      {/* ---------------------------------------------------------- */}
      <main className="flex-1 relative z-10 p-4 md:p-8 overflow-y-auto">
        
        {/* Header Section */}
        <header className="mb-8 flex items-end justify-between">
            

            {/* Contextual Badge for Header */}
            {menuItems.find((i) => i.id === activePage)?.badge && (
                <div className="hidden md:flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-full font-bold text-sm shadow-sm">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    Free for everyone
                </div>
            )}
        </header>

        {/* Dynamic Content Card */}
        {/* Warm shadow to match theme */}
        <div className="bg-white/80 backdrop-blur-sm rounded-[2rem] shadow-xl shadow-orange-100/50 border border-white p-8 min-h-[600px] transition-all duration-500">
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