"use client";

import { useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/dist/types/server";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/* ICONS */
const MagicIcon = () => (
  <svg width="24" height="24" className="text-indigo-600">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);
const FaceIcon = () => (
  <svg width="24" height="24" className="text-indigo-600" stroke="currentColor">
    <path d="M12 7a5 5 0 1 1-4.995 5.217 4.999 4.999 0 0 1 9.99 0"/>
    <path d="M12 2a10 10 0 1 0 10 10"/>
  </svg>
);
const CameraIcon = () => (
  <svg width="24" height="24" className="text-indigo-600" stroke="currentColor">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
    <circle cx="12" cy="13" r="3"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="18" height="18" stroke="currentColor" className="text-green-500">
    <path d="M20 6 9 17l-5-5" strokeWidth="3" fill="none"/>
  </svg>
);

export default function LandingPage() {
  const router = useRouter();
  const [isAnnual, setIsAnnual] = useState(false);
   // 🔥 Clerk client-side auth
  const { isSignedIn, isLoaded } = useUser();

  // 🚀 Redirect instantly if logged in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf8f4] to-[#f4f1e8] text-slate-900 font-sans flex flex-col overflow-x-hidden">

      {/* -------------------------------------------------- */}
      {/* NAVBAR PREMIUM */}
      {/* -------------------------------------------------- */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

          {/* Brand */}
          <div
            onClick={() => router.push("/")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-yellow-400 via-amber-400 to-yellow-600 rounded-xl flex items-center justify-center text-black font-black shadow-lg shadow-yellow-500/30 group-hover:scale-110 transition">
              🍌
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-yellow-600 transition">
              NanoBanana <span className="text-yellow-500">AI</span>
            </span>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex gap-10 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-yellow-600 transition">Features</a>
            <a href="#pricing" className="hover:text-yellow-600 transition">Pricing</a>
            <a href="#faq" className="hover:text-yellow-600 transition">FAQ</a>
          </nav>

          <button
            onClick={() => router.push("/sign-in")}
            className="px-6 py-2.5 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow-md shadow-yellow-300/40 transition hover:-translate-y-0.5"
          >
            Try Free →
          </button>
        </div>
      </header>

      {/* -------------------------------------------------- */}
      {/* HERO */}
      {/* -------------------------------------------------- */}
      <section className="relative pt-40 pb-32 px-6 text-center">

        {/* Aura Background */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1400px] h-[700px] bg-yellow-200/25 blur-[160px] rounded-full"></div>

        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
          The Fastest Way to  
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-500">
            Create Stunning AI Visuals
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 mt-6 max-w-2xl mx-auto">
          Generate headshots, swap faces, remove backgrounds, and turn text into images —
          all inside a beautifully simple creative studio.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
          <button
            onClick={() => router.push("/sign-in")}
            className="px-6 py-2.5 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow-md shadow-yellow-300/40 transition hover:-translate-y-0.5"
          >
            Start Creating →
          </button>
          <button className="px-10 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 text-lg hover:bg-slate-50 transition">
            View Showcase
          </button>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* FEATURES (NEW CLEAN BENTO) */}
      {/* -------------------------------------------------- */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-extrabold text-center mb-12">
            One Studio. Endless Possibilities.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Card 1 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl hover:shadow-2xl transition">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                <MagicIcon />
              </div>
              <h3 className="text-xl font-bold mb-2">Text → Image</h3>
              <p className="text-slate-600 text-sm">
                Describe anything and watch it come alive instantly.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl hover:shadow-2xl transition">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                <FaceIcon />
              </div>
              <h3 className="text-xl font-bold mb-2">Face Swap</h3>
              <p className="text-slate-600 text-sm">
                Upload 2 photos and swap faces with perfect lighting match.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl hover:shadow-2xl transition">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                <CameraIcon />
              </div>
              <h3 className="text-xl font-bold mb-2">Headshot Generator</h3>
              <p className="text-slate-600 text-sm">
                Get studio-quality LinkedIn photos from casual selfies.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl hover:shadow-2xl transition">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                <svg width="24" height="24" stroke="currentColor" className="text-indigo-600">
                  <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Background Removal</h3>
              <p className="text-slate-600 text-sm">
                Clean, precise cutouts perfect for ecommerce & editing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* PRICING (POLISHED) */}
      {/* -------------------------------------------------- */}
      <section id="pricing" className="py-24 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-16">
            Simple, Fair & Transparent
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Starter */}
            <div className="p-8 rounded-3xl border border-slate-200 shadow-lg hover:shadow-2xl transition bg-[#fafafa]">
              <h3 className="text-xl font-bold mb-1">Starter</h3>
              <p className="text-slate-500 mb-6 text-sm">For casual creators</p>
              <p className="text-5xl font-extrabold mb-6">₹0</p>

              <button className="w-full px-5 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-semibold mb-8">
                Start Free
              </button>

              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex items-center gap-2"><CheckIcon /> 3 Free Credits</li>
                <li className="flex items-center gap-2"><CheckIcon /> Standard Speed</li>
                <li className="flex items-center gap-2"><CheckIcon /> Access All Tools</li>
              </ul>
            </div>

            {/* Pro */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-yellow-500 to-amber-600 shadow-2xl text-white relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-3 py-1 rounded-full">
                MOST POPULAR
              </div>

              <h3 className="text-xl font-bold mb-1">Pro Creator</h3>
              <p className="text-yellow-100 mb-6 text-sm">For professionals</p>

              <p className="text-5xl font-extrabold mb-6">₹{isAnnual ? "249" : "299"}</p>

              <button className="w-full px-5 py-3 rounded-xl bg-black text-white hover:bg-neutral-900 font-semibold mb-8">
                Get Pro
              </button>

              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-2"><CheckIcon /> Unlimited Generations</li>
                <li className="flex items-center gap-2"><CheckIcon /> Private Mode</li>
                <li className="flex items-center gap-2"><CheckIcon /> Commercial License</li>
              </ul>
            </div>

            {/* Pay as you go */}
            <div className="p-8 rounded-3xl border border-slate-200 shadow-lg hover:shadow-2xl transition bg-[#fafafa]">
              <h3 className="text-xl font-bold mb-1">Pay-As-You-Go</h3>
              <p className="text-slate-500 mb-6 text-sm">No commitments</p>
              <p className="text-5xl font-extrabold mb-6">₹15</p>

              <button className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 hover:border-yellow-400 font-semibold mb-8">
                Buy Credits
              </button>

              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex items-center gap-2"><CheckIcon /> Never Expires</li>
                <li className="flex items-center gap-2"><CheckIcon /> All Tools Included</li>
                <li className="flex items-center gap-2"><CheckIcon /> Support Priority</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* FOOTER PREMIUM */}
      {/* -------------------------------------------------- */}
      <footer className="py-16 bg-gradient-to-b from-white to-[#faf8f4] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

            {/* Brand */}
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center text-black font-black">🍌</div>
                <span className="font-bold text-xl text-slate-900">NanoBanana AI</span>
              </div>
              <p className="text-slate-500 text-sm max-w-sm">
                Bringing fun, creativity, and premium-quality AI tools to millions of creators worldwide.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Tools</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>Text to Image</li>
                <li>Face Swap</li>
                <li>Headshots</li>
                <li>Background Remover</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>About</li>
                <li>Blog</li>
                <li>Support</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 text-xs text-slate-400 flex justify-between">
            <p>© 2025 NanoBanana AI. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
