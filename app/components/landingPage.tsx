"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// --- CONFIGURATION ---
const PLANS_CONFIG: Record<string, string> = {
  CREATOR: process.env.NEXT_PUBLIC_DODO_PRODUCT_ID_CREATOR!,
  PREMIUM: process.env.NEXT_PUBLIC_DODO_PRODUCT_ID_PREMIUM!,
  PRO: process.env.NEXT_PUBLIC_DODO_PRODUCT_ID_PRO!,
};

// --- PREMIUM ICONS ---
const Icons = {
  Bolt: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
  ),
  // UPDATED: High-End "Gemini-style" Sparkle
  SparkleFilled: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  Swap: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
  ),
  Pen: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
  ),
  Eraser: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>
  ),
  Check: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
  ),
  ArrowRight: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  ),
  Linkedin: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
  ),
  Instagram: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  ),
  Flame: ({ className }: { className?: string }) => (
     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
  )
};

export default function LandingPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null);

  useEffect(() => {
    // Optional dashboard redirect logic
  }, [isLoaded, isSignedIn, router]);

  const handleCheckout = async (planKey: string) => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    const productId = PLANS_CONFIG[planKey];
    if (!productId) return alert("Configuration Error");
    setLoadingProduct(productId);
    
    try {
      const response = await fetch("/api/checkout", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: productId, plan: planKey }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      if (data.url) window.location.href = data.url; 
    } catch (err) {
      alert("Something went wrong: " + err.message);
    } finally {
      setLoadingProduct(null);
    }
  };

  const cardSlideIn = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden">
      
      {/* -------------------------------------------------- */}
      {/* NAVBAR */}
      {/* -------------------------------------------------- */}
      <nav className="fixed top-0 inset-x-0 z-50 h-16 bg-white/80 backdrop-blur-xl border-b border-zinc-200/60">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => router.push("/")}>
            <div className="w-9 h-9 bg-zinc-900 text-white rounded-xl flex items-center justify-center text-xl font-bold group-hover:rotate-12 transition-transform shadow-lg shadow-zinc-900/20">🍌</div>
            <span className="font-extrabold text-zinc-900 tracking-tight text-lg">SnapMod</span>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex items-center gap-6 text-sm font-bold text-zinc-500">
              <Link href="#features" className="hover:text-amber-500 transition-colors">Features</Link>
              <Link href="#pricing" className="hover:text-amber-500 transition-colors">Pricing</Link>
              <Link href="#connect" className="hover:text-amber-500 transition-colors">Connect</Link>
            </div>

            <div className="flex items-center gap-3">
              {!isSignedIn && (
                 <span className="hidden md:flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 uppercase tracking-wide">
                   <Icons.SparkleFilled className="w-3 h-3 text-emerald-500" />
                   Try Free
                 </span>
              )}
              <button 
                onClick={() => router.push(isSignedIn ? "/dashboard" : "/sign-in")} 
                className="px-5 py-2 rounded-full bg-zinc-900 text-white font-bold text-sm hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-900/10 active:scale-95"
              >
                {isSignedIn ? "Go to Studio" : "Login"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* -------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* -------------------------------------------------- */}
      <section className="relative pt-32 pb-24 px-6 max-w-7xl mx-auto overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
          {/* LEFT: COPY */}
          <motion.div initial="hidden" animate="visible"  className="text-center lg:text-left z-10 flex flex-col items-center lg:items-start">
             
             {/* LaunchIt Badge */}
             <div className="mb-8 hover:scale-105 transition-transform duration-300">
               <a href="https://launchit.site/launches/snapmod" target="_blank" rel="noopener noreferrer">
                 <img src="https://launchit.site/badges/minimal-light-v2.svg" alt="Featured on LaunchIt" width="180" height="54" />
               </a>
             </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Now Live: Viral Face Swaps
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-zinc-900 mb-6 leading-[1.05] tracking-tight">
              Turn <span className="text-zinc-400 decoration-zinc-300 underline decoration-4 underline-offset-4">Their</span> Virality <br/>
              Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Yours.</span>
            </h1>
            
            <p className="text-xl text-zinc-500 mb-10 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              Stop using boring photos. Swap your face onto high-CTR thumbnails or generate professional studio shots instantly. 
            </p>
            
            <div className="flex flex-col gap-6 justify-center lg:justify-start items-center lg:items-start w-full">
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => router.push("/sign-in")} className="h-14 px-8 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-amber-500/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group">
                  Use My Free Credits <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                </button>
              </div>

              {/* Free Benefits */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <div className="px-3 py-1.5 rounded-lg bg-emerald-50/50 border border-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-2">
                    <Icons.SparkleFilled className="w-3.5 h-3.5" />
                    2 Free Credits
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-blue-50/50 border border-blue-100 text-blue-700 text-xs font-bold flex items-center gap-2">
                    <Icons.Pen className="w-3.5 h-3.5" />
                    Free AI Script Writer
                </div>
                <div className="text-xs text-zinc-400 font-medium hidden sm:block">
                    • No Credit Card Required
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: VISUAL */}
          <motion.div initial="hidden" animate="visible" variants={cardSlideIn} className="relative mt-8 lg:mt-0">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-amber-100/50 to-transparent rounded-full blur-3xl -z-10" />

             <div className="relative w-full aspect-[4/3] flex items-center justify-center">
               {/* Original Card */}
               <div className="absolute left-0 top-8 w-[65%] md:w-[60%] z-10 transform -rotate-3 hover:rotate-0 transition-transform duration-500 origin-bottom-right">
                   <div className="bg-white p-3 pb-4 rounded-2xl shadow-2xl border border-zinc-200">
                       <div className="flex items-center gap-2 mb-2 px-1">
                           <div className="w-2 h-2 rounded-full bg-red-500"></div>
                           <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Original Template</span>
                       </div>
                       <div className="relative aspect-video bg-zinc-100 rounded-xl overflow-hidden shadow-inner group">
                            <div className="relative  w-full h-full">
                             <Image src="/mrbeast.jpg" alt="Original Thumbnail" fill className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all"/>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">12:34</div>
                       </div>
                       <div className="mt-3 px-1">
                           <div className="h-4 w-3/4 bg-zinc-100 rounded mb-2"></div>
                           <div className="flex gap-2">
                               <div className="h-8 w-8 rounded-full bg-zinc-100"></div>
                               <div className="h-3 w-20 bg-zinc-100 rounded mt-2"></div>
                           </div>
                       </div>
                   </div>
               </div>
               
               {/* Result Card */}
               <div className="absolute right-0 bottom-8 w-[65%] md:w-[60%] z-20 transform rotate-3 hover:rotate-0 transition-transform duration-500 origin-bottom-left">
                   <div className="bg-white p-3 pb-4 rounded-2xl shadow-[0_20px_60px_-12px_rgba(245,158,11,0.25)] border-2 border-amber-500">
                       <div className="flex items-center justify-between mb-2 px-1">
                           <div className="flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                               <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wide">Your Version</span>
                           </div>
                           <Icons.SparkleFilled className="w-3 h-3 text-amber-500" />
                       </div>
                       <div className="relative aspect-video bg-zinc-900 rounded-xl overflow-hidden shadow-sm">
                                <div className="relative w-full h-full">
                                  <Image src="/snapmod.png" alt="Swapped Thumbnail" fill className="object-cover" />
                                </div>
                            <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                               <Icons.Check className="w-3 h-3"/> Ready
                            </div>
                       </div>
                       <div className="mt-3 px-1">
                           <div className="flex gap-2 mt-2 items-center">
                               <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center text-[10px]">🍌</div>
                               <p className="text-[10px] font-bold text-zinc-400">SnapMod User</p>
                           </div>
                       </div>
                   </div>
               </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* FEATURES SECTION (UPDATED with Scripts) */}
      {/* -------------------------------------------------- */}
      <section id="features" className="py-24 bg-white border-y border-zinc-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">Complete Creator Toolkit</h2>
            <p className="text-zinc-500">Everything you need to package your content professionally.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* NEW: SCRIPT WRITER */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-white border border-amber-200 hover:border-amber-400 hover:shadow-lg hover:-translate-y-1 transition-all group cursor-default relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-500 text-white text-[9px] font-bold px-2 py-1 rounded-bl-xl uppercase tracking-wider">
                New
              </div>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md text-amber-600 mb-4 border border-amber-100">
                <Icons.Pen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">Viral Script Writer</h3>
              <div className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase mb-2 border border-emerald-200">
                Free Forever
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Generate high-engagement scripts for <span className="font-bold">LinkedIn, X, YouTube & Insta</span> instantly. Zero cost.
              </p>
            </div>

            {/* Feature 2: Face Swap */}
            <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200 hover:border-zinc-300 transition-colors group cursor-default">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-zinc-700 mb-4">
                <Icons.Swap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">AI Face Swap</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Replace faces in high-performing thumbnails with one click. Retention starts with the click.</p>
            </div>

            {/* Feature 3: Viral Templates */}
            <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200 hover:border-zinc-300 transition-colors group cursor-default">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-red-500 mb-4">
                <Icons.Flame className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">Viral Templates</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Access proven layouts used by top creators like MrBeast. Just swap and download.</p>
            </div>

            {/* Feature 4: BG Remover */}
            <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200 hover:border-zinc-300 transition-colors group cursor-default">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-emerald-600 mb-4">
                <Icons.Eraser className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">Remove BG</h3>
              <div className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase mb-2">Free Forever</div>
              <p className="text-sm text-zinc-500 leading-relaxed">Clean cutouts for products and people. No credits required. Unlimited use.</p>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* PRICING SECTION (UPDATED) */}
      {/* -------------------------------------------------- */}
      <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 mb-4">Simple Pricing</h2>
          <p className="text-zinc-500">Start for free. Power up when you are ready.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          
          {/* TIER 1: FREE (UPDATED) */}
          <div className="p-6 rounded-3xl bg-white border border-zinc-200 flex flex-col h-full hover:shadow-xl transition-all relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-zinc-200 group-hover:bg-zinc-900 transition-colors" />
            <div className="mb-4">
               <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-zinc-900 tracking-wide">Free</h3>
                <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 text-[10px] font-bold uppercase border border-zinc-200">
                  Starter
                </span>
              </div>
              <p className="text-zinc-500 text-xs mt-1 font-medium">Forever free tools + Trial</p>
            </div>
            <div className="mb-6 flex items-baseline">
                <span className="text-3xl font-bold tracking-tight text-zinc-900">$0</span>
            </div>
            <div className="space-y-3 mb-8 flex-1">
              <li className="flex gap-3 text-sm font-bold text-zinc-900"><Icons.SparkleFilled className="w-4 h-4 text-emerald-500 shrink-0"/> Unlimited Script Writer</li>
              <li className="flex gap-3 text-sm font-bold text-zinc-900"><Icons.Check className="w-4 h-4 text-emerald-500 shrink-0"/> Unlimited BG Removal</li>
              <li className="flex gap-3 text-sm font-bold text-zinc-900"><Icons.Bolt className="w-4 h-4 text-amber-500 shrink-0"/> 2 Free AI Credits</li>
              <li className="flex gap-3 text-sm text-zinc-500"><Icons.Check className="w-4 h-4 text-zinc-400 shrink-0"/> Standard Quality</li>
            </div>
            <button onClick={() => router.push("/sign-in")} className="w-full py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 font-bold text-sm hover:bg-zinc-100 transition-colors">
              Start Free
            </button>
          </div>

          {/* TIER 2: CREATOR */}
          <div className="p-6 rounded-3xl bg-white border border-zinc-200 flex flex-col h-full hover:border-amber-400 transition-colors">
            <div className="mb-4">
              <h3 className="font-bold text-lg text-zinc-900 tracking-wide">Creator</h3>
              <p className="text-amber-600 font-bold text-xs mt-1">For Beginners</p>
            </div>
            <div className="mb-6 flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-zinc-900">$4</span>
                <span className="text-zinc-400 text-xs font-medium">/pack</span>
            </div>
            <div className="space-y-3 mb-8 flex-1">
              <li className="flex gap-3 text-sm font-bold text-zinc-900"><Icons.SparkleFilled className="w-4 h-4 text-emerald-500 shrink-0"/> Unlimited Script Writer</li>
              <li className="flex gap-3 text-sm font-bold text-zinc-900"><Icons.Bolt className="w-4 h-4 text-amber-500 shrink-0"/> 20 Credits</li>
              <li className="flex gap-3 text-sm font-bold text-zinc-900"><Icons.Check className="w-4 h-4 text-zinc-900 shrink-0"/> Unlimited BG Removal</li>
            </div>
            <button 
              onClick={() => handleCheckout("CREATOR")} 
              disabled={loadingProduct === PLANS_CONFIG.CREATOR}
              className="w-full py-2.5 rounded-xl border-2 border-zinc-900 text-zinc-900 font-bold text-sm hover:bg-zinc-900 hover:text-white transition-colors flex justify-center items-center"
            >
              {loadingProduct === PLANS_CONFIG.CREATOR ? <div className="animate-spin h-5 w-5 border-2 border-zinc-500 border-t-transparent rounded-full"/> : "Subscribe for $4"}
            </button>
          </div>

          {/* TIER 3: PREMIUM ($10) - Best Value */}
          <div className="p-6 rounded-3xl bg-zinc-900 text-white shadow-2xl relative flex flex-col h-full transform md:-translate-y-4 ring-1 ring-zinc-900/5">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-900 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg border border-white/20">
              Most Popular
            </div>
            <div className="mb-4 pt-2">
              <h3 className="font-bold text-lg text-white tracking-wide">Premium</h3>
              <p className="text-amber-400 font-bold text-xs mt-1">Serious Creators</p>
            </div>
            <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-white">$10</span>
                <span className="text-zinc-500 text-xs font-medium">/pack</span>
            </div>
            <div className="space-y-3 mb-8 flex-1">
              <li className="flex gap-3 text-sm font-bold text-white"><Icons.SparkleFilled className="w-4 h-4 text-amber-500 shrink-0"/> Unlimited Script Writer</li>
              <li className="flex gap-3 text-sm font-bold text-white"><Icons.Bolt className="w-4 h-4 text-amber-500 shrink-0"/> 60 Credits (30 Images)</li>
              <li className="flex gap-3 text-sm font-bold text-white"><Icons.Check className="w-4 h-4 text-amber-500 shrink-0"/> Unlimited BG Removal</li>
              <li className="flex gap-3 text-sm text-zinc-300"><Icons.Check className="w-4 h-4 text-amber-500 shrink-0"/> Priority Processing</li>
              <li className="flex gap-3 text-sm text-zinc-300"><Icons.Check className="w-4 h-4 text-amber-500 shrink-0"/> Face Swap Access</li>
            </div>
            <button 
              onClick={() => handleCheckout("PREMIUM")}
              disabled={loadingProduct === PLANS_CONFIG.PREMIUM}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-amber-900/20 flex justify-center items-center"
            >
              {loadingProduct === PLANS_CONFIG.PREMIUM ? <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"/> : "Get Premium"}
            </button>
          </div>

          {/* TIER 4: PRO */}
          <div className="p-6 rounded-3xl bg-white border border-zinc-200 flex flex-col h-full hover:shadow-xl transition-shadow">
            <div className="mb-4">
              <h3 className="font-bold text-lg text-zinc-900 tracking-wide">Pro</h3>
              <p className="text-zinc-500 font-bold text-xs mt-1">Agency / Power User</p>
            </div>
            <div className="mb-6 flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-zinc-900">$20</span>
                <span className="text-zinc-400 text-xs font-medium">/pack</span>
            </div>
            <div className="space-y-3 mb-8 flex-1">
              <li className="flex gap-3 text-sm font-bold text-zinc-900"><Icons.Bolt className="w-4 h-4 text-zinc-900 shrink-0"/> 100 Credits</li>
              <li className="flex gap-3 text-sm font-bold text-zinc-900"><Icons.SparkleFilled className="w-4 h-4 text-zinc-900 shrink-0"/> Unlimited Script Writer</li>
              <li className="flex gap-3 text-sm font-bold text-zinc-900"><Icons.Check className="w-4 h-4 text-zinc-900 shrink-0"/> Commercial License</li>
            </div>
            <button 
              onClick={() => handleCheckout("PRO")}
              disabled={loadingProduct === PLANS_CONFIG.PRO}
              className="w-full py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900 font-bold text-sm hover:bg-zinc-900 hover:text-white transition-colors flex justify-center items-center"
            >
              {loadingProduct === PLANS_CONFIG.PRO ? <div className="animate-spin h-5 w-5 border-2 border-zinc-900 border-t-transparent rounded-full"/> : "Get Pro"}
            </button>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* CONNECT SECTION */}
      {/* -------------------------------------------------- */}
      <section id="connect" className="py-24 bg-amber-50/50 border-t border-amber-100/50">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-zinc-900 mb-6">Build with me in Public</h2>
            <p className="text-zinc-600 mb-12 max-w-xl mx-auto leading-relaxed">
              I am building SnapMod to help creators grow. Follow my journey, suggest features, or just say hi!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
               <Link href="https://www.linkedin.com/in/purohitdaksh" target="_blank" className="flex items-center gap-3 px-8 py-4 bg-white rounded-2xl shadow-sm border border-zinc-200 hover:border-blue-500 hover:text-blue-600 hover:-translate-y-1 transition-all group">
                  <Icons.Linkedin className="w-5 h-5 text-zinc-400 group-hover:text-blue-600" />
                  <span className="font-bold text-zinc-700 group-hover:text-blue-600">LinkedIn</span>
               </Link>
               
               <Link href="https://x.com/dkshuxcodes" target="_blank" className="flex items-center gap-3 px-8 py-4 bg-white rounded-2xl shadow-sm border border-zinc-200 hover:border-black hover:text-black hover:-translate-y-1 transition-all group">
                  <Image
                    src="https://img.icons8.com/?size=100&id=A4DsujzAX4rw&format=png&color=000000"
                    alt="icon"
                    width={20}
                    height={20}
                    className="w-5 h-5 group-hover:opacity-80 transition"
                  />
                  <span className="font-bold text-zinc-700 group-hover:text-black">Twitter / X</span>
               </Link>

               <Link href="https://www.instagram.com/dakshxpurohit/" target="_blank" className="flex items-center gap-3 px-8 py-4 bg-white rounded-2xl shadow-sm border border-zinc-200 hover:border-pink-500 hover:text-pink-600 hover:-translate-y-1 transition-all group">
                  <Icons.Instagram className="w-5 h-5 text-zinc-400 group-hover:text-pink-600" />
                  <span className="font-bold text-zinc-700 group-hover:text-pink-600">Instagram</span>
               </Link>
            </div>
         </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* FOOTER */}
      {/* -------------------------------------------------- */}
      <footer className="py-12 px-6 bg-white border-t border-zinc-200 text-sm text-zinc-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-zinc-100 rounded-lg flex items-center justify-center grayscale text-sm">🍌</div>
            <span className="font-bold text-zinc-900 tracking-tight">SnapMod</span>
          </div>
          <div className="flex gap-8 font-medium">
             <a href="#" className="hover:text-amber-500 transition-colors">Privacy</a>
             <a href="#" className="hover:text-amber-500 transition-colors">Terms</a>
             <a href="#" className="hover:text-amber-500 transition-colors">Contact</a>
          </div>
          <div className="text-xs">
            © 2025 SnapMod Inc.
          </div>
        </div>
      </footer>

    </div>
  );
}