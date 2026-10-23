import Link from "next/link";
import { AdsenseScript } from "./adsense-script";

type Faq = { question: string; answer: string };

export function ToolGuide({
  name,
  eyebrow,
  summary,
  benefits,
  steps,
  bestPractices,
  limitations,
  faqs,
  canonical,
}: {
  name: string;
  eyebrow: string;
  summary: string;
  benefits: Array<{ title: string; description: string }>;
  steps: Array<{ title: string; description: string }>;
  bestPractices: string[];
  limitations: string;
  faqs: Faq[];
  canonical: string;
}) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900">
      <AdsenseScript />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-900 text-white">S</span>SnapMod</Link>
          <nav aria-label="Primary navigation" className="flex items-center gap-5 text-sm font-semibold text-zinc-600">
            <Link href="/guides">Guides</Link><Link href="/about" className="hidden sm:inline">About</Link><Link href="/contact" className="hidden md:inline">Contact</Link><Link href="/sign-in" className="rounded-full bg-zinc-900 px-4 py-2 text-white">Try SnapMod</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="border-b border-zinc-200 bg-white px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">{eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">{name}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">{summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/sign-in" className="rounded-full bg-amber-500 px-6 py-3 font-bold text-white hover:bg-amber-600">Try it with free credits</Link>
              <Link href="/#pricing" className="rounded-full border border-zinc-300 bg-white px-6 py-3 font-bold hover:border-zinc-500">View pricing</Link>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-5xl space-y-20 px-6 py-16">
          <section>
            <h2 className="text-3xl font-black tracking-tight">What it helps you do</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {benefits.map((benefit) => <div key={benefit.title} className="rounded-3xl border border-zinc-200 bg-white p-6"><h3 className="font-bold">{benefit.title}</h3><p className="mt-3 leading-7 text-zinc-600">{benefit.description}</p></div>)}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black tracking-tight">How it works</h2>
            <ol className="mt-8 grid gap-5 sm:grid-cols-3">
              {steps.map((step, index) => <li key={step.title} className="rounded-3xl bg-zinc-900 p-6 text-white"><span className="text-sm font-black text-amber-400">STEP {index + 1}</span><h3 className="mt-3 text-xl font-bold">{step.title}</h3><p className="mt-3 leading-7 text-zinc-300">{step.description}</p></li>)}
            </ol>
          </section>

          <section className="grid gap-8 rounded-3xl border border-amber-200 bg-amber-50 p-8 sm:grid-cols-2">
            <div><h2 className="text-2xl font-black">Better results, fewer retries</h2><ul className="mt-5 space-y-3 text-zinc-700">{bestPractices.map((practice) => <li key={practice} className="flex gap-3"><span aria-hidden="true" className="font-bold text-amber-600">✓</span>{practice}</li>)}</ul></div>
            <div><h2 className="text-2xl font-black">Know the limits</h2><p className="mt-5 leading-7 text-zinc-700">{limitations}</p><p className="mt-4 text-sm text-zinc-600">Always review output before publishing and follow our <Link href="/acceptable-use" className="font-bold underline">Acceptable Use Policy</Link>.</p></div>
          </section>

          <section>
            <h2 className="text-3xl font-black tracking-tight">Frequently asked questions</h2>
            <div className="mt-8 divide-y divide-zinc-200 rounded-3xl border border-zinc-200 bg-white px-6">
              {faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="cursor-pointer list-none pr-8 font-bold">{faq.question}</summary><p className="mt-3 max-w-3xl leading-7 text-zinc-600">{faq.answer}</p></details>)}
            </div>
          </section>

          <aside className="rounded-3xl bg-zinc-900 p-8 text-center text-white sm:p-12">
            <h2 className="text-3xl font-black">Ready to make your next asset?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-300">Start with free credits, review the result, and export only the version you are happy to publish.</p>
            <Link href="/sign-in" className="mt-7 inline-block rounded-full bg-amber-500 px-7 py-3 font-bold hover:bg-amber-400">Open SnapMod Studio</Link>
          </aside>
          <p className="text-center text-xs text-zinc-400">Guide URL: https://snapmod.xyz{canonical}</p>
        </div>
      </main>
    </div>
  );
}
