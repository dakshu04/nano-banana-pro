import Link from "next/link";
import { AdsenseScript } from "./adsense-script";
import type { Guide } from "../guides/guides";

export function GuideArticle({ guide, relatedGuides }: { guide: Guide; relatedGuides: Guide[] }) {
  const url = `https://snapmod.xyz/guides/${guide.slug}`;
  const updatedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${guide.updated}T00:00:00Z`));
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.published,
    dateModified: guide.updated,
    mainEntityOfPage: url,
    author: { "@type": "Person", name: "Daksh Purohit", url: "https://snapmod.xyz/about" },
    publisher: { "@type": "Organization", name: "SnapMod", url: "https://snapmod.xyz" },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://snapmod.xyz/" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://snapmod.xyz/guides" },
      { "@type": "ListItem", position: 3, name: guide.title, item: url },
    ],
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900">
      <AdsenseScript />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />

      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-5 px-6 py-3">
          <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-900 text-white">S</span>SnapMod</Link>
          <nav aria-label="Primary navigation" className="flex items-center gap-5 text-sm font-semibold text-zinc-600">
            <Link href="/guides" className="text-amber-700">Guides</Link>
            <Link href="/about">About</Link>
            <Link href="/sign-in" className="rounded-full bg-zinc-900 px-4 py-2 text-white">Open Studio</Link>
          </nav>
        </div>
      </header>

      <main>
        <article>
          <header className="border-b border-zinc-200 bg-white px-6 py-16 sm:py-20">
            <div className="mx-auto max-w-3xl">
              <nav aria-label="Breadcrumb" className="text-sm text-zinc-500"><Link href="/guides" className="hover:text-amber-700">Guides</Link><span aria-hidden="true"> / </span>{guide.category}</nav>
              <p className="mt-8 text-sm font-black uppercase tracking-[0.2em] text-amber-600">{guide.category}</p>
              <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-6xl">{guide.title}</h1>
              <p className="mt-6 text-lg leading-8 text-zinc-600">{guide.description}</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-500">
                <span>By <Link href="/about" rel="author" className="font-semibold text-zinc-800 hover:text-amber-700">Daksh Purohit</Link></span>
                <span>Updated {updatedDate}</span>
                <span>{guide.readTime}</span>
              </div>
            </div>
          </header>

          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 lg:grid-cols-[220px_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <nav aria-label="On this page" className="sticky top-8 rounded-2xl border border-zinc-200 bg-white p-5">
                <p className="font-bold">On this page</p>
                <ol className="mt-4 space-y-3 text-sm leading-5 text-zinc-600">
                  {guide.sections.map((section, index) => <li key={section.heading}><a href={`#section-${index + 1}`} className="hover:text-amber-700">{section.heading}</a></li>)}
                </ol>
              </nav>
            </aside>

            <div className="max-w-3xl space-y-14">
              {guide.sections.map((section, index) => (
                <section id={`section-${index + 1}`} key={section.heading} className="scroll-mt-8">
                  <p className="text-sm font-black text-amber-600">{String(index + 1).padStart(2, "0")}</p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight">{section.heading}</h2>
                  <div className="mt-5 space-y-5 text-[1.05rem] leading-8 text-zinc-700">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {section.bullets ? <ul className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-6">{section.bullets.map((bullet) => <li key={bullet} className="flex gap-3"><span aria-hidden="true" className="font-black text-amber-600">✓</span><span>{bullet}</span></li>)}</ul> : null}
                    {section.takeaway ? <div className="rounded-2xl border-l-4 border-amber-500 bg-amber-50 p-5 text-zinc-800"><strong>Practical takeaway:</strong> {section.takeaway}</div> : null}
                    {section.sources ? (
                      <ul className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-6">
                        {section.sources.map((source) => (
                          <li key={source.href}>
                            <a href={source.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-700 underline decoration-amber-300 underline-offset-4 hover:text-amber-800">
                              {source.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </section>
              ))}

              <section className="rounded-3xl bg-zinc-900 p-8 text-white sm:p-10">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-400">Put it into practice</p>
                <h2 className="mt-3 text-2xl font-black">Continue with the relevant SnapMod workflow</h2>
                <p className="mt-3 leading-7 text-zinc-300">Use the tool as a starting point, then apply the review steps from this guide before you publish.</p>
                <Link href={guide.toolHref} className="mt-6 inline-block rounded-full bg-amber-500 px-6 py-3 font-bold text-white hover:bg-amber-400">{guide.toolLabel}</Link>
              </section>

              <section>
                <h2 className="text-2xl font-black tracking-tight">Related creator guides</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {relatedGuides.map((related) => <Link key={related.slug} href={`/guides/${related.slug}`} className="rounded-2xl border border-zinc-200 bg-white p-5 hover:border-amber-400"><span className="text-xs font-bold uppercase tracking-wider text-amber-700">{related.category}</span><h3 className="mt-2 font-bold leading-6">{related.title}</h3></Link>)}
                </div>
              </section>
            </div>
          </div>
        </article>
      </main>

      <footer className="border-t border-zinc-200 bg-white px-6 py-10 text-sm text-zinc-600">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 sm:flex-row"><p>© 2026 SnapMod. Built for responsible creative work.</p><nav className="flex flex-wrap gap-6" aria-label="Footer navigation"><Link href="/guides">Guides</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/contact">Contact</Link></nav></div>
      </footer>
    </div>
  );
}
