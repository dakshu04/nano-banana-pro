import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "../../components/guide-article";
import { getGuide, guides } from "../guides";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const path = `/guides/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: path },
    authors: [{ name: "Daksh Purohit", url: "/about" }],
    openGraph: { title: guide.title, description: guide.description, url: path, type: "article", publishedTime: guide.published, modifiedTime: guide.updated, authors: ["https://snapmod.xyz/about"] },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const relatedGuides = guide.related.map((relatedSlug) => getGuide(relatedSlug)).filter((item): item is NonNullable<typeof item> => Boolean(item));
  return <GuideArticle guide={guide} relatedGuides={relatedGuides} />;
}
