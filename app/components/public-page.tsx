import Link from "next/link";
import type { ReactNode } from "react";
import { AdsenseScript } from "./adsense-script";

type Section = {
  title: string;
  content: ReactNode;
};

export function PublicPage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated?: string;
  sections: Section[];
}) {
  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900">
      <AdsenseScript />
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight">
            <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-900 text-white">S</span>
            SnapMod
          </Link>
          <nav aria-label="Primary navigation" className="flex items-center gap-5 text-sm font-semibold text-zinc-600">
            <Link href="/guides" className="hover:text-amber-600">Guides</Link>
            <Link href="/about" className="hidden hover:text-amber-600 sm:inline">About</Link>
            <Link href="/contact" className="hidden hover:text-amber-600 md:inline">Contact</Link>
            <Link href="/sign-in" className="rounded-full bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-700">Open Studio</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="border-b border-zinc-200 bg-white px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-amber-600">{eyebrow}</p>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">{title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">{intro}</p>
            {updated ? <p className="mt-5 text-sm text-zinc-500">Last updated: {updated}</p> : null}
          </div>
        </section>

        <article className="mx-auto max-w-3xl space-y-12 px-6 py-14">
          {sections.map((section) => (
            <section key={section.title} className="scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight">{section.title}</h2>
              <div className="mt-4 space-y-4 leading-7 text-zinc-600 [&_a]:font-semibold [&_a]:text-amber-700 [&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-zinc-900">
                {section.content}
              </div>
            </section>
          ))}
        </article>
      </main>

      <footer className="border-t border-zinc-200 bg-white px-6 py-10 text-sm text-zinc-600">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 sm:flex-row">
          <p>© 2026 SnapMod. Built for responsible creative work.</p>
          <nav aria-label="Legal navigation" className="flex flex-wrap gap-x-6 gap-y-3">
            <Link href="/guides">Guides</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/acceptable-use">Acceptable use</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
