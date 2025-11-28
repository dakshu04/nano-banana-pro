"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"; 

/* --- ICONS (Lucide Style - Thin & Crisp) --- */
const SparklesIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
);
const SwapIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
);
const CameraIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
);
const MagicIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
);
const CheckIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
);
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* -------------------------------------------------- */}
      {/* NAVBAR */}
      {/* -------------------------------------------------- */}
      <nav className="fixed top-0 inset-x-0 z-50 h-16 border-b border-zinc-200/50 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          
          <div onClick={() => router.push("/")} className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-lg shadow-sm group-hover:scale-105 transition-transform">
              🍌
            </div>
            <span className="text-sm font-bold tracking-tight text-zinc-900">
              NanoBanana
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-500">
              <a href="#features" className="hover:text-zinc-900 transition-colors">Features</a>
              <a href="#pricing" className="hover:text-zinc-900 transition-colors">Pricing</a>
            </div>
            <button
              onClick={() => router.push("/sign-in")}
              className="text-xs font-semibold bg-zinc-900 text-white px-5 py-2 rounded-full hover:bg-zinc-800 transition-all shadow-sm"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* -------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* -------------------------------------------------- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-amber-50/50 to-transparent blur-[80px] -z-10" />

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 shadow-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-xs font-medium text-zinc-600">AI Studio v2.0 is live</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-900 mb-6 leading-[1.1]">
            Create visuals with <br className="hidden md:block"/>
            <span className="text-zinc-400">cinematic precision.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg text-zinc-500 max-w-xl mx-auto mb-10 leading-relaxed">
            The professional AI creative suite. Swap faces, generate photorealistic headshots, and edit imagery—all from one clean dashboard.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => router.push("/sign-in")}
              className="h-12 px-8 rounded-full bg-zinc-900 text-white font-semibold text-sm hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-900/20 flex items-center gap-2 group"
            >
              Start Creating Free <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
            </button>
            <button className="h-12 px-8 rounded-full bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-all font-medium text-sm">
              View Showcase
            </button>
          </motion.div>

          {/* Hero Image / Dashboard Preview */}
          <motion.div 
            variants={itemVariants}
            className="mt-20 relative rounded-t-3xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-200/50 overflow-hidden"
          >
              <div className="aspect-[16/9] bg-zinc-50 relative group">
                  {/* Abstract UI Representation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm mx-auto flex items-center justify-center text-4xl">🍌</div>
                          <p className="text-sm font-medium text-zinc-400">Dashboard Interface</p>
                      </div>
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-50" />
              </div>
          </motion.div>

        </motion.div>
      </section>

      {/* -------------------------------------------------- */}
      {/* FEATURES: Clean Grid */}
      {/* -------------------------------------------------- */}
      <section id="features" className="py-24 px-6 bg-white border-t border-zinc-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Professional Tools. Simplified.</h2>
            <p className="text-zinc-500">We have stripped away the complexity of AI, leaving you with a powerful studio that just works.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="group p-8 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-zinc-300 transition-all">
                <div className="w-10 h-10 bg-white rounded-lg border border-zinc-200 flex items-center justify-center mb-6 text-zinc-900">
                    <SwapIcon className="w-5 h-5"/>
                </div>
                <h3 className="text-lg font-bold mb-2">Cinema Face Swap</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                    Seamlessly transfer identities while preserving skin texture, lighting, and cinematic grain.
                </p>
            </div>

            {/* Card 2 */}
            <div className="group p-8 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-zinc-300 transition-all">
                <div className="w-10 h-10 bg-white rounded-lg border border-zinc-200 flex items-center justify-center mb-6 text-zinc-900">
                    <CameraIcon className="w-5 h-5"/>
                </div>
                <h3 className="text-lg font-bold mb-2">Pro Headshots</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                    Turn a casual selfie into a portfolio of LinkedIn-ready professional studio shots in seconds.
                </p>
            </div>

             {/* Card 3 */}
             <div className="group p-8 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-zinc-300 transition-all">
                <div className="w-10 h-10 bg-white rounded-lg border border-zinc-200 flex items-center justify-center mb-6 text-zinc-900">
                    <SparklesIcon className="w-5 h-5"/>
                </div>
                <h3 className="text-lg font-bold mb-2">Generative Art</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                    High-fidelity text-to-image generation for assets, marketing, and creative exploration.
                </p>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* PRICING */}
      {/* -------------------------------------------------- */}
      <section id="pricing" className="py-24 px-6 bg-[#FAFAFA] border-t border-zinc-200">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Transparent Pricing</h2>
            <div className="flex items-center p-1 bg-zinc-200 rounded-lg">
              <button 
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-1.5 rounded-md text-xs font-semibold transition-all ${!isAnnual ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-1.5 rounded-md text-xs font-semibold transition-all ${isAnnual ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'}`}
              >
                Yearly <span className="text-amber-600 ml-1 font-bold">-20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Free Tier */}
            <div className="p-8 rounded-2xl bg-white border border-zinc-200 flex flex-col">
              <h3 className="font-bold text-lg text-zinc-900">Starter</h3>
              <div className="mt-4 mb-6">
                 <span className="text-4xl font-bold tracking-tight">₹0</span>
                 <span className="text-zinc-500 text-sm ml-2">/ month</span>
              </div>
              <ul className="space-y-3 text-sm text-zinc-600 mb-8 flex-1">
                <li className="flex gap-3"><CheckIcon className="w-4 h-4 text-zinc-300" /> 3 Credits / Month</li>
                <li className="flex gap-3"><CheckIcon className="w-4 h-4 text-zinc-300" /> Standard Speed</li>
                <li className="flex gap-3"><CheckIcon className="w-4 h-4 text-zinc-300" /> Access All Tools</li>
              </ul>
              <button className="w-full py-2.5 rounded-lg border border-zinc-200 text-sm font-semibold hover:bg-zinc-50 transition-colors">
                Start Free
              </button>
            </div>

            {/* PRO Tier - Dark */}
            <div className="p-8 rounded-2xl bg-zinc-900 text-white shadow-xl relative flex flex-col transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-zinc-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="font-bold text-lg text-white">Pro Creator</h3>
              <div className="mt-4 mb-6">
                 <span className="text-4xl font-bold tracking-tight">₹{isAnnual ? "249" : "299"}</span>
                 <span className="text-zinc-400 text-sm ml-2">/ month</span>
              </div>
              
              <ul className="space-y-3 text-sm text-zinc-300 mb-8 flex-1">
                <li className="flex gap-3"><CheckIcon className="w-4 h-4 text-amber-500" /> Unlimited Generations</li>
                <li className="flex gap-3"><CheckIcon className="w-4 h-4 text-amber-500" /> Private Mode</li>
                <li className="flex gap-3"><CheckIcon className="w-4 h-4 text-amber-500" /> Commercial License</li>
                <li className="flex gap-3"><CheckIcon className="w-4 h-4 text-amber-500" /> Priority Support</li>
              </ul>
              <button className="w-full py-2.5 rounded-lg bg-white text-zinc-900 text-sm font-bold hover:bg-zinc-100 transition-colors">
                Get Pro
              </button>
            </div>

            {/* On Demand */}
             <div className="p-8 rounded-2xl bg-white border border-zinc-200 flex flex-col">
              <h3 className="font-bold text-lg text-zinc-900">On Demand</h3>
              <div className="mt-4 mb-6">
                 <span className="text-4xl font-bold tracking-tight">₹15</span>
                 <span className="text-zinc-500 text-sm ml-2">/ credit</span>
              </div>
              <ul className="space-y-3 text-sm text-zinc-600 mb-8 flex-1">
                <li className="flex gap-3"><CheckIcon className="w-4 h-4 text-zinc-300" /> Pay per credit</li>
                <li className="flex gap-3"><CheckIcon className="w-4 h-4 text-zinc-300" /> Never expires</li>
                <li className="flex gap-3"><CheckIcon className="w-4 h-4 text-zinc-300" /> Bulk discounts available</li>
              </ul>
              <button className="w-full py-2.5 rounded-lg border border-zinc-200 text-sm font-semibold hover:bg-zinc-50 transition-colors">
                Buy Credits
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* FOOTER */}
      {/* -------------------------------------------------- */}
      <footer className="py-12 px-6 border-t border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-500">
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