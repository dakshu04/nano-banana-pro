import type { Metadata } from "next";
import Link from "next/link";
import { AdsenseScript } from "../components/adsense-script";
import { guides } from "./guides";

export const metadata: Metadata = {
  title: "Creator Guides",
  description: "Practical, responsible guides for thumbnails, video hooks, clean image cutouts, and AI-assisted face swaps.",
  alternates: { canonical: "/guides" },
  openGraph: { title: "Creator Guides | SnapMod", description: "Practical workflows for stronger creator assets and responsible AI editing.", url: "/guides", type: "website" },
};

export default function GuidesPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "SnapMod Creator Guides",
    url: "https://snapmod.xyz/guides",
    hasPart: guides.map((guide) => ({ "@type": "Article", headline: guide.title, url: `https://snapmod.xyz/guides/${guide.slug}` })),
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900">
      <AdsenseScript />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c") }} />
      <header className="border-b border-zinc-200 bg-white"><div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-5 px-6 py-3"><Link href="/" className="flex items-center gap-2 font-extrabold"><span className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-900 text-white">S</span>SnapMod</Link><nav aria-label="Primary navigation" className="flex items-center gap-5 text-sm font-semibold text-zinc-600"><Link href="/guides" className="text-amber-700">Guides</Link><Link href="/about">About</Link><Link href="/sign-in" className="rounded-full bg-zinc-900 px-4 py-2 text-white">Open Studio</Link></nav></div></header>
      <main>
        <section className="border-b border-zinc-200 bg-white px-6 py-20"><div className="mx-auto max-w-6xl"><p className="text-sm font-black uppercase tracking-[0.2em] text-amber-600">SnapMod Resources</p><h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">Practical guides for clearer, more responsible creator work</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">Detailed workflows for planning thumbnails, writing honest hooks, preparing clean cutouts, and reviewing AI-assisted face edits. Each guide is written to help with a real production decision—not merely to target a keyword.</p></div></section>
        <section className="mx-auto max-w-6xl px-6 py-16"><div className="grid gap-6 md:grid-cols-2">{guides.map((guide, index) => <article key={guide.slug} className="flex flex-col rounded-3xl border border-zinc-200 bg-white p-7"><div className="flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-wider"><span className="text-amber-700">{guide.category}</span><span className="text-zinc-400">{guide.readTime}</span></div><h2 className="mt-5 text-2xl font-black leading-tight"><Link href={`/guides/${guide.slug}`} className="hover:text-amber-700">{guide.title}</Link></h2><p className="mt-4 flex-1 leading-7 text-zinc-600">{guide.description}</p><Link href={`/guides/${guide.slug}`} className="mt-6 font-bold text-amber-700" aria-label={`Read: ${guide.title}`}>Read guide {index + 1} →</Link></article>)}</div></section>
      </main>
      <footer className="border-t border-zinc-200 bg-white px-6 py-10 text-sm text-zinc-600"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 sm:flex-row"><p>© 2026 SnapMod. Built for responsible creative work.</p><nav className="flex flex-wrap gap-6" aria-label="Footer navigation"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/acceptable-use">Acceptable use</Link><Link href="/contact">Contact</Link></nav></div></footer>
    </div>
  );
}
