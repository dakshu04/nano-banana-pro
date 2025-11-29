"use client";

import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TextToImage from "./components/text-to-image/page";
import FaceSwap from "./components/face-swap/page";
import HeadShotGenerator from "./components/head-shot-generator/page";
import BackgroundRemover from "./components/background-remover/page";
import History from "./components/history/page";

// --- ICONS ---
const RefreshIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
);
const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-500"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
);
const SparklesIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
);
const MenuIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);
const XIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [credits, setCredits] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activePage, setActivePage] = useState("text-to-image");
  
  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Close mobile menu when page changes
  const handlePageChange = (id: string) => {
      setActivePage(id);
      setIsMobileMenuOpen(false);
  };

  // --- REUSABLE SIDEBAR CONTENT ---
  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between">
        {/* Top Section */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8 cursor-pointer group" onClick={() => router.push("/")}>
            <div className="w-8 h-8 bg-zinc-900 text-white rounded-lg flex items-center justify-center text-lg font-bold group-hover:scale-105 transition">🍌</div>
            <div>
                <h1 className="text-sm font-bold tracking-tight">NanoBanana</h1>
                <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">Pro Studio</p>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
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

        {/* Bottom Section */}
        <div className="flex flex-col gap-4">
            
            {/* --- CONDITIONAL BUY CREDITS CARD --- */}
            {credits !== null && credits <= 6 && (
                <div className="mx-4 p-4 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 text-white shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/20 blur-2xl rounded-full -translate-y-10 translate-x-10 group-hover:bg-amber-500/30 transition-all duration-500" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-white/10 rounded-lg">
                                <SparklesIcon className="w-4 h-4 text-amber-400" />
                            </div>
                            <h4 className="font-bold text-sm">Running Low?</h4>
                        </div>
                        <p className="text-xs text-zinc-400 mb-3 font-medium">You have {credits} credits left.</p>
                        <button 
                            onClick={() => router.push("/#pricing")} 
                            className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-zinc-900 text-xs font-bold rounded-lg transition-colors shadow-md shadow-amber-900/20"
                        >
                            Refuel Now
                        </button>
                    </div>
                </div>
            )}

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
        </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-[#FAFAFA] text-zinc-900 font-sans overflow-hidden selection:bg-amber-100">
      
      {/* ---------------------------------------------------------- */}
      {/* DESKTOP SIDEBAR (Hidden on Mobile) */}
      {/* ---------------------------------------------------------- */}
      <aside className="w-64 border-r border-zinc-200 bg-white hidden md:flex flex-col shrink-0">
         <SidebarContent />
      </aside>

      {/* ---------------------------------------------------------- */}
      {/* MOBILE HEADER (Visible on Mobile) */}
      {/* ---------------------------------------------------------- */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-zinc-200 z-40 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-zinc-900 text-white rounded-lg flex items-center justify-center text-lg font-bold">🍌</div>
             <span className="font-bold text-zinc-900">NanoBanana</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-zinc-600 hover:bg-zinc-100 rounded-lg">
             <MenuIcon className="w-6 h-6" />
          </button>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* MOBILE DRAWER (Overlay) */}
      {/* ---------------------------------------------------------- */}
      {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Drawer */}
              <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-2xl transform transition-transform h-full">
                  {/* Close Button */}
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-900"
                  >
                      <XIcon className="w-6 h-6" />
                  </button>
                  
                  {/* Content */}
                  <SidebarContent />
              </div>
          </div>
      )}

      {/* ---------------------------------------------------------- */}
      {/* MAIN CONTENT AREA */}
      {/* ---------------------------------------------------------- */}
      <main className="flex-1 p-4 md:p-6 h-full flex flex-col min-w-0 pt-20 md:pt-6">
        
        {/* The Workspace Card */}
        <div className="flex-1 bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col overflow-hidden relative">
          
          {/* Internal Header */}
          <div className="h-14 border-b border-zinc-100 flex items-center justify-between px-6 shrink-0 bg-white z-10">
            <h2 className="text-lg font-bold text-zinc-800 flex items-center gap-2">
                {menuItems.find(i => i.id === activePage)?.label}
            </h2>
            
            {menuItems.find(i => i.id === activePage)?.badge === "FREE" && (
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-bold uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Unlimited
                </div>
            )}
          </div>

          {/* Tool Content Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-zinc-50/30 scrollbar-hide">
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