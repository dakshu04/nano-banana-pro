"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// --- CONFIGURATION ---
// We read these from .env.local to keep IDs safe and flexible.
const PLANS_CONFIG: Record<string, string> = {
  CREATOR: process.env.NEXT_PUBLIC_DODO_PRODUCT_ID_CREATOR!,
  PREMIUM: process.env.NEXT_PUBLIC_DODO_PRODUCT_ID_PREMIUM!,
  PRO: process.env.NEXT_PUBLIC_DODO_PRODUCT_ID_PRO!,
};

/* --- ICONS --- */
const Icons = {
  Sparkles: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"/></svg>
  ),
  Swap: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
  ),
  Zap: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  Check: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
  ),
  ArrowRight: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  ),
  Youtube: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
  ),
  TrendingUp: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
  ),
  Clock: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  Loader: ({ className }: { className?: string }) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  ),
};

export default function LandingPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null);

  // Optional: Redirect to dashboard if already logged in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
       // router.push("/dashboard"); 
    }
  }, [isLoaded, isSignedIn, router]);

  // --- CHECKOUT LOGIC ---
  const handleCheckout = async (planKey: string) => {
    // 1. Force Login
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    // 2. Get ID from Config
    const productId = PLANS_CONFIG[planKey];
    if (!productId) {
        alert("Configuration Error: Product ID not found for " + planKey);
        return;
    }
    
    setLoadingProduct(productId); // UI Spinner
    
    try {
      // 3. Call Backend
      const response = await fetch("/api/checkout", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          productId: productId, // e.g. "pdt_123..."
          plan: planKey         // e.g. "CREATOR"
         }),
      });

      const data = await response.json();

      if (!response.ok) {
          throw new Error(data.message || "Payment initiation failed");
      }

      // 4. Redirect to Dodo
      if (data.url) {
        window.location.href = data.url; 
      } else {
        alert("Payment error: No URL returned from server");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong: " + err.message);
    } finally {
      setLoadingProduct(null);
    }
  };

  // Framer Motion Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden">
      
      {/* -------------------------------------------------- */}
      {/* NAVBAR */}
      {/* -------------------------------------------------- */}
      <nav className="fixed top-0 inset-x-0 z-50 h-16 border-b border-zinc-200/50 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div onClick={() => router.push("/")} className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-lg shadow-sm group-hover:scale-105 transition-transform">🍌</div>
            <span className="text-sm font-bold tracking-tight text-zinc-900">NanoBanana</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-500">
              <a href="#features" className="hover:text-zinc-900 transition-colors">Features</a>
              <a href="#pricing" className="hover:text-zinc-900 transition-colors">Pricing</a>
            </div>
            <button 
              onClick={() => router.push(isSignedIn ? "/dashboard" : "/sign-in")} 
              className="h-8 px-4 rounded-full bg-zinc-900 text-white font-bold text-sm hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-900/20 flex items-center gap-2 group cursor-pointer"
            >
              {isSignedIn ? `Dashboard` : "Start Free"}
            </button>
          </div>
        </div>
      </nav>

      {/* -------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* -------------------------------------------------- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Abstract Gradient Blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-amber-50/60 to-transparent blur-[100px] -z-10" />

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto text-center">
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 shadow-sm mb-8">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-xs font-bold text-zinc-600 uppercase tracking-wide">Unlimited Generations Available</span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 mb-6 leading-[1.1]">
            Visual Dominance <br className="hidden md:block"/>
            <span className="text-zinc-400">for Modern Creators.</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg text-zinc-500 max-w-xl mx-auto mb-10 leading-relaxed font-medium">
            Stop paying per pixel. Remove backgrounds for free, swap faces for viral thumbnails, and generate assets in one pro dashboard.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={() => router.push("/sign-in")} className="h-12 px-8 rounded-full bg-zinc-900 text-white font-bold text-sm hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-900/20 flex items-center gap-2 group">
              Start Creating Now <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* -------------------------------------------------- */}
      {/* VALUE GRAPH SECTION */}
      {/* -------------------------------------------------- */}
      <section className="py-20 px-6 bg-white border-y border-zinc-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* Text Side */}
            <div>
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-6">
                    <Icons.TrendingUp className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">Why pay $0.20 per removal?</h2>
                <p className="text-zinc-500 text-lg leading-relaxed mb-6">
                    Competitors charge you credit for every single background you remove. At NanoBanana, we believe utility should be free.
                </p>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-zinc-700 font-medium">
                        <Icons.Check className="w-5 h-5 text-emerald-500" /> Unlimited Background Removals
                    </li>
                    <li className="flex items-center gap-3 text-zinc-700 font-medium">
                        <Icons.Check className="w-5 h-5 text-emerald-500" /> No Credit Cost for Utility Tools
                    </li>
                    <li className="flex items-center gap-3 text-zinc-700 font-medium">
                        <Icons.Check className="w-5 h-5 text-emerald-500" /> High-Res PNG Downloads
                    </li>
                </ul>
            </div>

            {/* Graph Side */}
            <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-200 shadow-sm relative overflow-hidden">
                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-8 text-center">Cost for 1,000 Images</h3>
                
                <div className="flex justify-around items-end h-64 w-full px-4 gap-8">
                    {/* Competitor Bar */}
                    <div className="w-24 flex flex-col items-center group">
                        <span className="text-zinc-900 font-bold mb-2 opacity-0 group-hover:opacity-100 transition-opacity">$200+</span>
                        <div className="w-full bg-zinc-300 rounded-t-xl h-full relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-zinc-300" style={{ height: '100%' }}></div>
                        </div>
                        <span className="text-xs font-bold text-zinc-500 mt-3 uppercase tracking-wide">Others</span>
                    </div>

                    {/* NanoBanana Bar */}
                    <div className="w-24 flex flex-col items-center group">
                        <span className="text-emerald-600 font-bold mb-2 text-xl">$0</span>
                        <div className="w-full bg-emerald-500 rounded-t-xl relative overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.4)] animate-[pulse_3s_infinite]" style={{ height: '10%' }}>
                        </div>
                        <span className="text-xs font-bold text-zinc-900 mt-3 uppercase tracking-wide">NanoBanana</span>
                    </div>
                </div>
            </div>

        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* BENTO GRID */}
      {/* -------------------------------------------------- */}
      <section id="features" className="py-24 px-6 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-2">The Viral Toolkit</h2>
              <p className="text-zinc-500">Tools designed for high-CTR thumbnails and professional branding.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-2 gap-6 h-auto md:h-[600px]">
            
            {/* LARGE CARD: FACE SWAP */}
            <div className="md:col-span-4 md:row-span-2 bg-zinc-900 rounded-3xl p-8 text-white relative overflow-hidden group border border-zinc-800">
                <div className="absolute top-0 right-0 p-12 opacity-20">
                    <Icons.Youtube className="w-64 h-64 text-red-500" />
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-6">
                        <Icons.Swap className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Viral Face Swaps</h3>
                    <p className="text-zinc-400 text-lg max-w-md mb-8">
                        Stop spending hours in Photoshop. Swap faces instantly to create high-CTR thumbnails like <span className="text-white font-bold">MrBeast</span> & <span className="text-white font-bold">CarryMinati</span>.
                    </p>
                    
                    {/* Mock UI Element */}
                    <div className="mt-auto bg-zinc-800 rounded-xl p-4 border border-zinc-700 flex gap-4 items-center">
                        <div className="w-16 h-16 bg-zinc-700 rounded-lg flex items-center justify-center text-xs text-zinc-500">Source</div>
                        <Icons.ArrowRight className="w-4 h-4 text-zinc-500"/>
                        <div className="w-16 h-16 bg-zinc-700 rounded-lg flex items-center justify-center text-xs text-zinc-500">Target</div>
                        <div className="ml-auto px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-emerald-500/20">
                            Result Generated
                        </div>
                    </div>
                </div>
            </div>

            {/* SMALL CARD: UNLIMITED BG */}
            <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm hover:border-amber-400 transition-colors group">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mb-4">
                    <Icons.Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold mb-2">Unlimited Cutouts</h3>
                <p className="text-sm text-zinc-500">
                    Remove backgrounds from products & portraits for free. No limits.
                </p>
            </div>

            {/* SMALL CARD: GENERATIVE ART */}
            <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm hover:border-amber-400 transition-colors">
                <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-900 mb-4">
                    <Icons.Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold mb-2">Generative Art</h3>
                <p className="text-sm text-zinc-500">
                    Text-to-Image engine for assets and creative exploration.
                </p>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* PRICING SECTION */}
      {/* -------------------------------------------------- */}
      <section id="pricing" className="py-24 px-6 bg-white border-t border-zinc-200">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Pricing that scales with your profit</h2>
            <p className="text-zinc-500">Start free. Upgrade when you need serious power.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            
            {/* TIER 1: FREE */}
            <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-zinc-200 flex flex-col h-full opacity-90 hover:opacity-100 transition-opacity">
              <div className="mb-4">
                <h3 className="font-bold text-lg text-zinc-900 tracking-wide">Free</h3>
                <p className="text-zinc-500 text-xs mt-1 font-medium">Utility Tools</p>
              </div>
              <div className="mb-6 flex items-baseline">
                 <span className="text-3xl font-bold tracking-tight text-zinc-900">$0</span>
              </div>
              <div className="space-y-3 mb-8 flex-1">
                <li className="flex gap-3 text-sm text-zinc-700"><Icons.Check className="w-4 h-4 text-emerald-500 shrink-0"/> Unlimited BG Removal</li>
                <li className="flex gap-3 text-sm text-zinc-700"><Icons.Check className="w-4 h-4 text-emerald-500 shrink-0"/> Standard Quality</li>
                <li className="flex gap-3 text-sm text-zinc-400 opacity-75"><Icons.Clock className="w-4 h-4 shrink-0"/> No generation credits</li>
              </div>
              <button onClick={() => router.push("/sign-in")} className="w-full py-2.5 rounded-lg border border-zinc-300 bg-white text-zinc-700 font-bold text-sm hover:bg-zinc-50 transition-colors">
                Start Free
              </button>
            </div>

            {/* TIER 2: CREATOR */}
            <div className="p-6 rounded-2xl bg-white border-2 border-amber-100 shadow-lg shadow-amber-100/50 flex flex-col h-full relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-1 bg-amber-400"/>
              <div className="mb-4">
                <h3 className="font-bold text-lg text-zinc-900 tracking-wide">Creator</h3>
                <p className="text-amber-600 font-bold text-xs mt-1">Get Started!</p>
              </div>
              <div className="mb-6 flex items-baseline gap-1">
                 <span className="text-3xl font-bold tracking-tight text-zinc-900">$4</span>
                 <span className="text-zinc-400 text-xs font-medium">/ pack</span>
              </div>
              <div className="space-y-3 mb-8 flex-1">
                <li className="flex gap-3 text-sm font-bold text-zinc-900"><Icons.Check className="w-4 h-4 text-amber-500 shrink-0"/> Unlimited BG Removal</li>
                <li className="flex gap-3 text-sm font-bold text-zinc-900"><Icons.Sparkles className="w-4 h-4 text-amber-500 shrink-0"/> 20 Credits Included</li>
                <li className="flex gap-3 text-sm font-bold text-zinc-900"><Icons.Sparkles className="w-4 h-4 text-amber-500 shrink-0"/> 10 Images</li>
                <div className="h-px bg-zinc-100 my-3"/>
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wide mb-1 flex items-center gap-1"><Icons.Clock className="w-3 h-3"/> Coming Soon</p>
                    <p className="text-xs text-zinc-500 leading-snug">
                        Your credits will soon unlock: AI Headshots, Text-to-Image, and Face Swap.
                    </p>
                </div>
              </div>
              <button 
                onClick={() => handleCheckout("CREATOR")} 
                disabled={loadingProduct === PLANS_CONFIG.CREATOR}
                className="w-full py-2.5 rounded-lg border-2 border-zinc-900 text-zinc-900 font-bold text-sm hover:bg-zinc-900 hover:text-white transition-colors flex justify-center items-center"
              >
                {loadingProduct === PLANS_CONFIG.CREATOR ? <Icons.Loader className="w-5 h-5" /> : "Subscribe for $4/mo"}
              </button>
            </div>

            {/* TIER 3: PREMIUM */}
            <div className="p-6 rounded-2xl bg-zinc-900 text-white shadow-xl relative flex flex-col h-full transform md:-translate-y-4 ring-1 ring-zinc-900/5">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-900 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                Best Value
              </div>
              <div className="mb-4 pt-1">
                <h3 className="font-bold text-lg text-white tracking-wide">Premium</h3>
                <p className="text-amber-400 font-bold text-xs mt-1">Serious Creators</p>
              </div>
              <div className="mb-6 flex items-baseline gap-1">
                 <span className="text-4xl font-bold tracking-tight text-white">$10</span>
                 <span className="text-zinc-500 text-xs font-medium">/ pack</span>
              </div>
              <div className="space-y-3 mb-8 flex-1">
                <li className="flex gap-3 text-sm font-bold text-white"><Icons.Check className="w-4 h-4 text-amber-500 shrink-0"/> Unlimited BG Removal</li>
                <li className="flex gap-3 text-sm font-bold text-white"><Icons.Sparkles className="w-4 h-4 text-amber-500 shrink-0"/> 60 Credits</li>
                <li className="flex gap-3 text-sm font-bold text-white"><Icons.Sparkles className="w-4 h-4 text-amber-500 shrink-0"/> 30 Images</li>
                <li className="flex gap-3 text-sm text-zinc-300"><Icons.Check className="w-4 h-4 text-amber-500 shrink-0"/> Priority Processing</li>
                <li className="flex gap-3 text-sm text-zinc-300"><Icons.Check className="w-4 h-4 text-amber-500 shrink-0"/> All Upcoming Features</li>
                <p className="text-xs text-amber-400 font-medium mt-2 pl-7">$0.33 per image (Best Rate)</p>
              </div>
              <button 
                onClick={() => handleCheckout("PREMIUM")}
                disabled={loadingProduct === PLANS_CONFIG.PREMIUM}
                className="w-full py-3 rounded-lg bg-white text-zinc-900 font-bold text-sm hover:bg-zinc-100 transition-colors shadow-lg shadow-white/10 flex justify-center items-center"
              >
                {loadingProduct === PLANS_CONFIG.PREMIUM ? <Icons.Loader className="w-5 h-5 text-zinc-900" /> : "Subscribe for $10/mo"}
              </button>
            </div>

            {/* TIER 4: PRO */}
            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm flex flex-col h-full">
              <div className="mb-4">
                <h3 className="font-bold text-lg text-zinc-900 tracking-wide">Pro</h3>
                <p className="text-zinc-500 font-bold text-xs mt-1">Agency / Power User</p>
              </div>
              <div className="mb-6 flex items-baseline gap-1">
                 <span className="text-3xl font-bold tracking-tight text-zinc-900">$20</span>
                 <span className="text-zinc-400 text-xs font-medium">/ pack</span>
              </div>
              <div className="space-y-3 mb-8 flex-1">
                <li className="flex gap-3 text-sm font-bold text-zinc-900"><Icons.Check className="w-4 h-4 text-zinc-900 shrink-0"/> Unlimited BG Removal</li>
                <li className="flex gap-3 text-sm font-bold text-zinc-900"><Icons.Sparkles className="w-4 h-4 text-zinc-900 shrink-0"/> 100 Credits</li>
                <li className="flex gap-3 text-sm font-bold text-zinc-900"><Icons.Sparkles className="w-4 h-4 text-zinc-900 shrink-0"/> 50 Images</li>
                <li className="flex gap-3 text-sm text-amber-600"><Icons.Check className="w-4 h-4 shrink-0"/> All Upcoming Features</li>
              </div>
              <button 
                onClick={() => handleCheckout("PRO")}
                disabled={loadingProduct === PLANS_CONFIG.PRO}
                className="w-full py-2.5 rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-900 font-bold text-sm hover:bg-zinc-900 hover:text-white transition-colors flex justify-center items-center"
              >
                {loadingProduct === PLANS_CONFIG.PRO ? <Icons.Loader className="w-5 h-5" /> : "Subscribe for $20/mo"}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* FOOTER */}
      {/* -------------------------------------------------- */}
      <footer className="py-12 px-6 border-t border-zinc-200 bg-white text-zinc-500 text-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-zinc-100 flex items-center justify-center grayscale text-xs">🍌</div>
            <span className="font-semibold text-zinc-900">NanoBanana AI</span>
          </div>
          <div className="flex gap-8">
             <a href="#" className="hover:text-zinc-900 transition-colors">Privacy</a>
             <a href="#" className="hover:text-zinc-900 transition-colors">Terms</a>
             <a href="#" className="hover:text-zinc-900 transition-colors">Twitter</a>
          </div>
          <div className="text-xs">
            © 2025 Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}