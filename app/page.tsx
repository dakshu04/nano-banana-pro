"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Ideally install framer-motion

/* --- PREMIUM ICONS (Thin Stroke, Elegant) --- */
const SparkleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
);
const SwapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-900"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
);
const CameraIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-900"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
);
const ScanIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-900"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/></svg>
);
const CheckIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
);

export default function LandingPage() {
  const router = useRouter();
  const [isAnnual, setIsAnnual] = useState(true);
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* -------------------------------------------------- */}
      {/* NAVBAR: Glassmorphism & Minimal */}
      {/* -------------------------------------------------- */}
      <nav className="fixed top-0 inset-x-0 z-50 h-16 border-b border-zinc-200/50 bg-white/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          
          {/* Logo */}
          <div onClick={() => router.push("/")} className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-lg shadow-sm group-hover:scale-105 transition-transform duration-300">
              🍌
            </div>
            <span className="text-sm font-bold tracking-tight text-zinc-900">
              NanoBanana
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-500">
              <a href="#features" className="hover:text-zinc-900 transition-colors">Features</a>
              <a href="#pricing" className="hover:text-zinc-900 transition-colors">Pricing</a>
            </div>
            <button
              onClick={() => router.push("/sign-in")}
              className="text-xs font-semibold bg-zinc-900 text-white px-5 py-2 rounded-full hover:bg-zinc-800 hover:scale-105 transition-all duration-300 shadow-lg shadow-zinc-500/20"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* -------------------------------------------------- */}
      {/* HERO: Clean Typography & Negative Space */}
      {/* -------------------------------------------------- */}
      <section className="relative pt-40 pb-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
        
        {/* Subtle Background Mesh */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50/50 via-white to-white"></div>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent"></div>

        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 shadow-sm mb-8">
            <SparkleIcon />
            <span className="text-xs font-medium text-zinc-600">v1.0 is now live</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-900 mb-6">
            Visuals, <span className="text-zinc-400">Perfected.</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-500 max-w-xl mx-auto mb-10 leading-relaxed font-light">
            The all-in-one AI studio. Swap faces, generate headshots, and edit imagery with 
            <span className="text-zinc-900 font-medium"> cinematic precision</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => router.push("/sign-in")}
              className="h-12 px-8 rounded-full bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-amber-200/50"
            >
              Start Creating Free
            </button>
            <button className="h-12 px-8 rounded-full bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-all font-medium text-sm">
              View Gallery
            </button>
          </div>
        </motion.div>

        {/* Abstract UI Preview (Optional Aesthetic Element) */}
        <motion.div 
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3, duration: 0.8 }}
           className="mt-20 w-full max-w-5xl rounded-t-3xl border border-zinc-200 bg-white/50 backdrop-blur-sm shadow-2xl shadow-zinc-200/50 aspect-[16/9] flex items-center justify-center overflow-hidden"
        >
          <div className="text-zinc-300 text-sm tracking-widest uppercase font-medium">Studio Dashboard Preview</div>
        </motion.div>
      </section>

      {/* -------------------------------------------------- */}
      {/* FEATURES: Bento Grid */}
      {/* -------------------------------------------------- */}
      <section id="features" className="py-32 px-6 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Everything you need.</h2>
            <p className="text-zinc-500">Professional tools simplified for everyone.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            
            {/* Large Card */}
            <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-zinc-50 border border-zinc-100 p-8 hover:border-zinc-200 transition-colors">
               <div className="absolute top-8 right-8 p-3 bg-white rounded-2xl shadow-sm border border-zinc-100 group-hover:scale-110 transition-transform duration-500">
                 <SwapIcon />
               </div>
               <div className="mt-auto h-full flex flex-col justify-end relative z-10">
                 <h3 className="text-2xl font-bold mb-2">Cinema Face Swap</h3>
                 <p className="text-zinc-500 max-w-sm">Seamlessly transfer identities while preserving skin texture, lighting, and cinematic grain. No blurry AI artifacts.</p>
               </div>
               {/* Decorative Gradient */}
               <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Tall Card */}
            <div className="md:row-span-2 group relative overflow-hidden rounded-3xl bg-zinc-900 text-white p-8">
               <div className="absolute top-8 right-8 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                 <CameraIcon className="text-white" />
               </div>
               <div className="mt-auto h-full flex flex-col justify-end">
                 <h3 className="text-2xl font-bold mb-2">Pro Headshots</h3>
                 <p className="text-zinc-400">Turn a single casual selfie into a portfolio of LinkedIn-ready professional studio shots.</p>
               </div>
            </div>

            {/* Small Card 1 */}
            <div className="group relative overflow-hidden rounded-3xl bg-white border border-zinc-200 p-8 hover:shadow-xl hover:shadow-zinc-200/30 transition-all">
               <div className="mb-4 w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                 <SparkleIcon />
               </div>
               <h3 className="text-lg font-bold mb-1">Text to Image</h3>
               <p className="text-sm text-zinc-500">Generate assets from pure imagination.</p>
            </div>

            {/* Small Card 2 */}
             <div className="group relative overflow-hidden rounded-3xl bg-white border border-zinc-200 p-8 hover:shadow-xl hover:shadow-zinc-200/30 transition-all">
               <div className="mb-4 w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center">
                 <ScanIcon />
               </div>
               <h3 className="text-lg font-bold mb-1">Smart Remove</h3>
               <p className="text-sm text-zinc-500">Isolate subjects with 1-click precision.</p>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* PRICING: High Contrast & Minimal */}
      {/* -------------------------------------------------- */}
      <section id="pricing" className="py-32 px-6 bg-[#FAFAFA]">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Simple Pricing</h2>
            {/* Toggle (Visual Only) */}
            <div className="inline-flex items-center p-1 bg-zinc-200 rounded-full">
              <button 
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-full text-xs font-semibold transition-all ${!isAnnual ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-500'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-full text-xs font-semibold transition-all ${isAnnual ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-500'}`}
              >
                Yearly <span className="text-amber-600 ml-1">-20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            {/* Free */}
            <div className="p-8 rounded-3xl bg-white border border-zinc-200/60 shadow-sm">
              <h3 className="font-bold text-lg mb-2">Starter</h3>
              <div className="text-4xl font-bold tracking-tight mb-6">₹0</div>
              <ul className="space-y-4 text-sm text-zinc-600 mb-8">
                <li className="flex gap-3"><CheckIcon className="text-zinc-300" /> 3 Credits / Month</li>
                <li className="flex gap-3"><CheckIcon className="text-zinc-300" /> Standard Speed</li>
              </ul>
              <button className="w-full py-3 rounded-xl border border-zinc-200 text-sm font-semibold hover:bg-zinc-50 transition">
                Start Free
              </button>
            </div>

            {/* PRO - Dark Mode Pop */}
            <div className="p-8 rounded-3xl bg-zinc-900 text-white shadow-2xl shadow-zinc-900/20 relative transform md:-translate-y-4">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-400 text-zinc-900 text-[10px] font-bold uppercase tracking-wider rounded-full">
                Best Value
              </div>
              <h3 className="font-bold text-lg mb-2 text-zinc-100">Pro Creator</h3>
              <div className="text-4xl font-bold tracking-tight mb-1">
                ₹{isAnnual ? "249" : "299"}
              </div>
              <div className="text-zinc-500 text-xs mb-6">per month, billed annually</div>
              
              <ul className="space-y-4 text-sm text-zinc-300 mb-8">
                <li className="flex gap-3"><CheckIcon className="text-amber-400" /> Unlimited Generations</li>
                <li className="flex gap-3"><CheckIcon className="text-amber-400" /> Private Mode</li>
                <li className="flex gap-3"><CheckIcon className="text-amber-400" /> Commercial License</li>
                <li className="flex gap-3"><CheckIcon className="text-amber-400" /> Priority Support</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-white text-zinc-900 text-sm font-bold hover:bg-zinc-100 transition shadow-lg shadow-white/10">
                Get Pro
              </button>
            </div>

            {/* Pay as you go */}
             <div className="p-8 rounded-3xl bg-white border border-zinc-200/60 shadow-sm">
              <h3 className="font-bold text-lg mb-2">On Demand</h3>
              <div className="text-4xl font-bold tracking-tight mb-6">₹15</div>
              <ul className="space-y-4 text-sm text-zinc-600 mb-8">
                <li className="flex gap-3"><CheckIcon className="text-zinc-300" /> Pay per credit</li>
                <li className="flex gap-3"><CheckIcon className="text-zinc-300" /> Never expires</li>
              </ul>
              <button className="w-full py-3 rounded-xl border border-zinc-200 text-sm font-semibold hover:bg-zinc-50 transition">
                Buy Credits
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* FOOTER */}
      {/* -------------------------------------------------- */}
      <footer className="py-12 px-6 border-t border-zinc-200 bg-white text-zinc-500 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-zinc-100 flex items-center justify-center grayscale text-xs">🍌</div>
            <span className="font-semibold text-zinc-900">NanoBanana AI</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-zinc-900 transition">Twitter</a>
            <a href="#" className="hover:text-zinc-900 transition">Instagram</a>
            <a href="#" className="hover:text-zinc-900 transition">Email</a>
          </div>
          <div className="text-xs">
            © 2025 Inc.
          </div>
        </div>
      </footer>
    </div>
  );
}