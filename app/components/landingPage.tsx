"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// --- CONFIGURATION ---
// Ensure these are set in your .env.local file
const PLANS_CONFIG: Record<string, string> = {
  CREATOR: process.env.NEXT_PUBLIC_DODO_PRODUCT_ID_CREATOR!,
  PREMIUM: process.env.NEXT_PUBLIC_DODO_PRODUCT_ID_PREMIUM!,
  PRO: process.env.NEXT_PUBLIC_DODO_PRODUCT_ID_PRO!,
};

// --- ICONS ---
const Icons = {
  Bolt: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
  ),
  Sparkles: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
  ),
  Swap: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
  ),
  Camera: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
  ),
  Eraser: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>
  ),
  Check: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
  ),
  ArrowRight: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  ),
  Twitter: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S.2 5.3 7.3 1.2c5.2-3 8.3 1.1 8.3 1.1"/></svg>
  ),
  Linkedin: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
  ),
  Instagram: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
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
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    const productId = PLANS_CONFIG[planKey];
    if (!productId) {
        alert("Configuration Error: Product ID not found for " + planKey);
        return;
    }
    setLoadingProduct(productId);
    
    try {
      const response = await fetch("/api/checkout", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: productId, plan: planKey }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Payment initiation failed");
      
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

  // Animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
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
      <nav className="fixed top-0 inset-x-0 z-50 h-16 bg-white/90 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => router.push("/")}>
            <div className="w-9 h-9 bg-zinc-900 text-white rounded-xl flex items-center justify-center text-xl font-bold group-hover:rotate-12 transition-transform">🍌</div>
            <span className="font-extrabold text-zinc-900 tracking-tight text-lg">NanoBanana</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-sm font-bold text-zinc-500">
              <a href="#features" className="hover:text-amber-500 transition-colors">Features</a>
              <a href="#pricing" className="hover:text-amber-500 transition-colors">Pricing</a>
              <a href="#connect" className="hover:text-amber-500 transition-colors">Connect</a>
            </div>
            <button 
              onClick={() => router.push(isSignedIn ? "/dashboard" : "/sign-in")} 
              className="px-5 py-2 rounded-full bg-zinc-900 text-white font-bold text-sm hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-900/10"
            >
              {isSignedIn ? "Go to Studio" : "Login"}
            </button>
          </div>
        </div>
      </nav>

      {/* -------------------------------------------------- */}
      {/* HERO SECTION - SPLIT VIEW */}
      {/* -------------------------------------------------- */}
      <section className="relative pt-32 pb-24 px-6 max-w-7xl mx-auto overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: THE COPY (The Promise) */}
          <motion.div initial="hidden" animate="visible"  className="text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Now Live: Viral Templates
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-zinc-900 mb-6 leading-[1.05] tracking-tight">
              Turn <span className="text-zinc-400 decoration-zinc-300 underline decoration-4 underline-offset-4">Their</span> Virality <br/>
              Into <span className="text-amber-500">Yours.</span>
            </h1>
            
            <p className="text-xl text-zinc-500 mb-10 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              Do not start from scratch. Take high-performing thumbnails from top creators and swap your face onto them instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={() => router.push("/sign-in")} className="h-14 px-8 rounded-full bg-amber-500 text-white font-bold text-lg hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 group">
                Swap Your Face Free <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
              </button>
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-400 px-4">
                <Icons.Check className="w-4 h-4 text-emerald-500"/> No credit card needed
              </div>
            </div>
          </motion.div>

          {/* RIGHT: THE VISUAL (The Proof) */}
          <motion.div initial="hidden" animate="visible" variants={cardSlideIn} className="relative mt-8 lg:mt-0">
             
             {/* Decorative Background Blob */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-amber-100/50 to-transparent rounded-full blur-3xl -z-10" />

             <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                
                {/* CARD 1: THE SOURCE (Left/Back) */}
                <div className="absolute left-0 top-8 w-[65%] md:w-[60%] z-10 transform -rotate-3 hover:rotate-0 transition-transform duration-500 origin-bottom-right">
                    <div className="bg-white p-3 pb-4 rounded-2xl shadow-2xl border border-zinc-200">
                        <div className="flex items-center gap-2 mb-2 px-1">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Original Template</span>
                        </div>
                        <div className="relative aspect-video bg-zinc-100 rounded-xl overflow-hidden shadow-inner group">
                             {/* Placeholder for Famous Youtuber */}
                             <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&fit=crop&q=80" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all" alt="Original Thumbnail" />
                             
                             {/* Fake YouTube Badge */}
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

                {/* THE ACTION: SWAP ICON */}
                <div className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-[#FAFAFA] animate-[pulse_3s_infinite]">
                        <Icons.Swap className="w-8 h-8 text-amber-500" />
                    </div>
                </div>

                {/* CARD 2: THE RESULT (Right/Front) */}
                <div className="absolute right-0 bottom-8 w-[65%] md:w-[60%] z-20 transform rotate-3 hover:rotate-0 transition-transform duration-500 origin-bottom-left">
                    <div className="bg-white p-3 pb-4 rounded-2xl shadow-[0_20px_50px_-12px_rgba(245,158,11,0.3)] border-2 border-amber-500">
                        <div className="flex items-center justify-between mb-2 px-1">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wide">Your Version</span>
                            </div>
                            <Icons.Sparkles className="w-3 h-3 text-amber-500" />
                        </div>
                        <div className="relative aspect-video bg-zinc-900 rounded-xl overflow-hidden shadow-sm">
                             {/* Placeholder for SWAPPED Result */}
                             <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&fit=crop&q=80" className="w-full h-full object-cover" alt="Swapped Thumbnail" />
                             
                             {/* Success Badge */}
                             <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                                <Icons.Check className="w-3 h-3"/> Ready
                             </div>
                        </div>
                        <div className="mt-3 px-1">
                            <p className="text-xs font-bold text-zinc-800 leading-tight">How I Gained 1M Subs in 30 Days (Secret Strategy)</p>
                            <div className="flex gap-2 mt-2 items-center">
                                <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center text-[10px]">🍌</div>
                                <p className="text-[10px] font-bold text-zinc-400">NanoBanana User</p>
                            </div>
                        </div>
                    </div>
                </div>

             </div>
          </motion.div>

        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* FEATURES SECTION */}
      {/* -------------------------------------------------- */}
      <section id="features" className="py-24 bg-white border-y border-zinc-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">Complete Creator Toolkit</h2>
            <p className="text-zinc-500">Everything you need to package your content professionally.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1: Face Swap */}
            <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200 hover:border-amber-400 transition-colors group cursor-default">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-amber-500 mb-4 group-hover:scale-110 transition-transform">
                <Icons.Swap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">AI Face Swap</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Replace faces in thumbnails with one click. High retention starts with the click.</p>
            </div>

            {/* Feature 2: Text to Image */}
            <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200 hover:border-amber-400 transition-colors group cursor-default">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-purple-500 mb-4 group-hover:scale-110 transition-transform">
                <Icons.Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">Text to Image</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Generate assets, backgrounds, and elements simply by typing what you need.</p>
            </div>

            {/* Feature 3: Headshot Gen */}
            <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200 hover:border-amber-400 transition-colors group cursor-default">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                <Icons.Camera className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">Headshot Gen</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Turn selfies into professional LinkedIn headshots without a studio.</p>
            </div>

            {/* Feature 4: BG Remover */}
            <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200 hover:border-amber-400 transition-colors group cursor-default">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-emerald-500 mb-4 group-hover:scale-110 transition-transform">
                <Icons.Eraser className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">Remove BG</h3>
              <div className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase mb-2">Free Forever</div>
              <p className="text-sm text-zinc-500 leading-relaxed">Clean cutouts for products and people. No credits required.</p>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* PRICING SECTION */}
      {/* -------------------------------------------------- */}
      <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 mb-4">Simple Pricing</h2>
          <p className="text-zinc-500">Start for free. Upgrade as you grow.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          
          {/* TIER 1: FREE */}
          <div className="p-6 rounded-3xl bg-white border border-zinc-200 flex flex-col h-full hover:shadow-xl transition-shadow">
            <div className="mb-4">
              <h3 className="font-bold text-lg text-zinc-900 tracking-wide">Free</h3>
              <p className="text-zinc-500 text-xs mt-1 font-medium">Utility Tools</p>
            </div>
            <div className="mb-6 flex items-baseline">
                <span className="text-3xl font-bold tracking-tight text-zinc-900">$0</span>
            </div>
            <div className="space-y-3 mb-8 flex-1">
              <li className="flex gap-3 text-sm text-zinc-600"><Icons.Check className="w-4 h-4 text-emerald-500 shrink-0"/> Unlimited BG Removal</li>
              <li className="flex gap-3 text-sm text-zinc-600"><Icons.Check className="w-4 h-4 text-emerald-500 shrink-0"/> Standard Quality</li>
              <li className="flex gap-3 text-sm text-zinc-400 opacity-75"><Icons.Bolt className="w-4 h-4 shrink-0"/> No credits included</li>
            </div>
            <button onClick={() => router.push("/sign-in")} className="w-full py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 font-bold text-sm hover:bg-zinc-100 transition-colors">
              Start Free
            </button>
          </div>

          {/* TIER 2: CREATOR ($4) */}
          <div className="p-6 rounded-3xl bg-white border border-zinc-200 flex flex-col h-full hover:border-amber-400 transition-colors">
            <div className="mb-4">
              <h3 className="font-bold text-lg text-zinc-900 tracking-wide">Creator</h3>
              <p className="text-amber-600 font-bold text-xs mt-1">For Beginners</p>
            </div>
            <div className="mb-6 flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-zinc-900">$4</span>
                <span className="text-zinc-400 text-xs font-medium">/mo</span>
            </div>
            <div className="space-y-3 mb-8 flex-1">
              <li className="flex gap-3 text-sm font-bold text-zinc-900"><Icons.Check className="w-4 h-4 text-amber-500 shrink-0"/> Unlimited BG Removal</li>
              <li className="flex gap-3 text-sm font-bold text-zinc-900"><Icons.Sparkles className="w-4 h-4 text-amber-500 shrink-0"/> 20 Credits</li>
              <li className="flex gap-3 text-sm font-bold text-zinc-900"><Icons.Sparkles className="w-4 h-4 text-amber-500 shrink-0"/> 10 Images</li>
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
          <div className="p-6 rounded-3xl bg-zinc-900 text-white shadow-xl relative flex flex-col h-full transform md:-translate-y-4 ring-1 ring-zinc-900/5">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-900 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
              Most Popular
            </div>
            <div className="mb-4 pt-1">
              <h3 className="font-bold text-lg text-white tracking-wide">Premium</h3>
              <p className="text-amber-400 font-bold text-xs mt-1">Serious Creators</p>
            </div>
            <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-white">$10</span>
                <span className="text-zinc-500 text-xs font-medium">/mo</span>
            </div>
            <div className="space-y-3 mb-8 flex-1">
              <li className="flex gap-3 text-sm font-bold text-white"><Icons.Check className="w-4 h-4 text-amber-500 shrink-0"/> Unlimited BG Removal</li>
              <li className="flex gap-3 text-sm font-bold text-white"><Icons.Sparkles className="w-4 h-4 text-amber-500 shrink-0"/> 60 Credits</li>
              <li className="flex gap-3 text-sm font-bold text-white"><Icons.Sparkles className="w-4 h-4 text-amber-500 shrink-0"/> 30 Images</li>
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

          {/* TIER 4: PRO ($20) */}
          <div className="p-6 rounded-3xl bg-white border border-zinc-200 flex flex-col h-full hover:shadow-xl transition-shadow">
            <div className="mb-4">
              <h3 className="font-bold text-lg text-zinc-900 tracking-wide">Pro</h3>
              <p className="text-zinc-500 font-bold text-xs mt-1">Agency / Power User</p>
            </div>
            <div className="mb-6 flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-zinc-900">$20</span>
                <span className="text-zinc-400 text-xs font-medium">/mo</span>
            </div>
            <div className="space-y-3 mb-8 flex-1">
              <li className="flex gap-3 text-sm font-bold text-zinc-900"><Icons.Check className="w-4 h-4 text-zinc-900 shrink-0"/> Unlimited BG Removal</li>
              <li className="flex gap-3 text-sm font-bold text-zinc-900"><Icons.Sparkles className="w-4 h-4 text-zinc-900 shrink-0"/> 100 Credits</li>
              <li className="flex gap-3 text-sm font-bold text-zinc-900"><Icons.Sparkles className="w-4 h-4 text-zinc-900 shrink-0"/> 50 Images</li>
              <li className="flex gap-3 text-sm text-zinc-500"><Icons.Check className="w-4 h-4 text-zinc-900 shrink-0"/> Commercial License</li>
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
      <section id="connect" className="py-24 bg-amber-50 border-t border-amber-100">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-zinc-900 mb-6">Build with me in Public</h2>
            <p className="text-zinc-600 mb-12 max-w-xl mx-auto leading-relaxed">
              I am building NanoBanana to help creators grow. Follow my journey, suggest features, or just say hi!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
               <a href="#" className="flex items-center gap-3 px-8 py-4 bg-white rounded-2xl shadow-sm border border-zinc-200 hover:border-blue-500 hover:text-blue-600 hover:-translate-y-1 transition-all group">
                  <Icons.Linkedin className="w-5 h-5 text-zinc-400 group-hover:text-blue-600" />
                  <span className="font-bold text-zinc-700 group-hover:text-blue-600">LinkedIn</span>
               </a>
               
               <a href="#" className="flex items-center gap-3 px-8 py-4 bg-white rounded-2xl shadow-sm border border-zinc-200 hover:border-black hover:text-black hover:-translate-y-1 transition-all group">
                  <Icons.Twitter className="w-5 h-5 text-zinc-400 group-hover:text-black" />
                  <span className="font-bold text-zinc-700 group-hover:text-black">Twitter / X</span>
               </a>

               <a href="#" className="flex items-center gap-3 px-8 py-4 bg-white rounded-2xl shadow-sm border border-zinc-200 hover:border-pink-500 hover:text-pink-600 hover:-translate-y-1 transition-all group">
                  <Icons.Instagram className="w-5 h-5 text-zinc-400 group-hover:text-pink-600" />
                  <span className="font-bold text-zinc-700 group-hover:text-pink-600">Instagram</span>
               </a>
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
            <span className="font-bold text-zinc-900 tracking-tight">NanoBanana</span>
          </div>
          <div className="flex gap-8 font-medium">
             <a href="#" className="hover:text-amber-500 transition-colors">Privacy</a>
             <a href="#" className="hover:text-amber-500 transition-colors">Terms</a>
             <a href="#" className="hover:text-amber-500 transition-colors">Contact</a>
          </div>
          <div className="text-xs">
            © 2025 NanoBanana Inc.
          </div>
        </div>
      </footer>

    </div>
  );
}