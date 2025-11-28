"use client";

import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import TextToImage from "./components/text-to-image/page";
import FaceSwap from "./components/face-swap/page";
import HeadShotGenerator from "./components/head-shot-generator/page";
import BackgroundRemover from "./components/background-remover/page";
import History from "./components/history/page";

// Components


/* Minimal Line Icons */
const RefreshIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
);
const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-500"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
);

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const [credits, setCredits] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activePage, setActivePage] = useState("text-to-image");

  const menuItems = [
    { id: "text-to-image", label: "Text to Image", icon: "✨" },
    { id: "image-to-image", label: "Face Swap", icon: "🌀" },
    { id: "headshot", label: "Headshot Gen", icon: "📸" },
    { id: "background", label: "Remove BG", icon: "🎨", badge: "FREE" },
    { id: "history", label: "History", icon: "clock" }
  ];

  const loadCredits = async () => {
    if (!user) return;
    try {
      setIsRefreshing(true);
      const res = await fetch("/api/user");
      if (!res.ok) return;
      const data = await res.json();
      setCredits(data.credits);
    } catch (error) {
      console.error("Failed to load credits:", error);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  useEffect(() => {
    if (isLoaded && user) loadCredits();
  }, [isLoaded, user]);

  return (
    // h-screen locks the height to the viewport (No Body Scroll)
    <div className="flex h-screen w-full bg-[#FAFAFA] text-zinc-900 font-sans overflow-hidden selection:bg-amber-100">
      
      {/* ---------------------------------------------------------- */}
      {/* COMPACT SIDEBAR */}
      {/* ---------------------------------------------------------- */}
      <aside className="w-64 border-r border-zinc-200 bg-white flex flex-col justify-between shrink-0 hidden md:flex">
        
        {/* Top Section */}
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8 cursor-pointer group">
            <div className="w-8 h-8 bg-zinc-900 text-white rounded-lg flex items-center justify-center text-lg font-bold group-hover:scale-105 transition">🍌</div>
            <div>
                <h1 className="text-sm font-bold tracking-tight">NanoBanana</h1>
                <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">Pro Studio</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                    ${isActive 
                      ? "bg-zinc-100 text-zinc-900" 
                      : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? "text-amber-500" : "text-zinc-400"}>
                        {item.icon === 'clock' ? 
                           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        : item.icon}
                    </span>
                    {item.label}
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-200 bg-emerald-50 text-emerald-600 uppercase">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: User & Credits */}
        <div className="p-4 border-t border-zinc-100 bg-zinc-50/50">
          
          {/* Credit Pill */}
          <div className="flex items-center justify-between bg-white border border-zinc-200 rounded-lg p-3 shadow-sm mb-4">
             <div className="flex items-center gap-2">
                <BoltIcon />
                <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Credits</span>
                    <span className="text-sm font-bold leading-none">{credits ?? "-"}</span>
                </div>
             </div>
             <button 
               onClick={loadCredits}
               disabled={isRefreshing}
               className="p-1.5 hover:bg-zinc-100 rounded-md text-zinc-400 hover:text-amber-500 transition-colors"
             >
                <RefreshIcon className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
             </button>
          </div>

          {/* User Row */}
          <div className="flex items-center gap-3 pl-1">
             <div className="scale-90"><UserButton afterSignOutUrl="/"/></div>
             <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold text-zinc-700 truncate">{user?.fullName}</p>
                <SignOutButton>
                   <button className="text-[10px] font-medium text-zinc-400 hover:text-red-500 transition-colors text-left truncate w-full">Sign out</button>
                </SignOutButton>
             </div>
          </div>
        </div>
      </aside>

      {/* ---------------------------------------------------------- */}
      {/* MAIN CONTENT AREA */}
      {/* ---------------------------------------------------------- */}
      <main className="flex-1 p-4 md:p-6 h-full flex flex-col min-w-0">
        
        {/* The Workspace Card - Fills remaining space */}
        <div className="flex-1 bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col overflow-hidden relative">
          
          {/* Internal Header (Title + Badge) */}
          <div className="h-14 border-b border-zinc-100 flex items-center justify-between px-6 shrink-0 bg-white z-10">
            <h2 className="text-lg font-bold text-zinc-800 flex items-center gap-2">
                {menuItems.find(i => i.id === activePage)?.label}
            </h2>
            
            {/* Contextual Badge (Moved here to save space) */}
            {menuItems.find(i => i.id === activePage)?.badge === "FREE" && (
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-bold uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Unlimited Access
                </div>
            )}
          </div>

          {/* Tool Content Area - Scrollable internally if needed */}
          <div className="flex-1 overflow-y-auto p-6 bg-zinc-50/30 scrollbar-hide">
            {activePage === "text-to-image" && <TextToImage />}
            {activePage === "image-to-image" && <FaceSwap />}
            {activePage === "headshot" && <HeadShotGenerator />}
            {activePage === "background" && <BackgroundRemover />}
            {activePage === "history" && <History />}
          </div>

        </div>
      </main>

    </div>
  );
}