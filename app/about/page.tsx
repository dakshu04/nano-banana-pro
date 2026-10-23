import type { Metadata } from "next";
import Link from "next/link";
import { PublicPage } from "../components/public-page";

export const metadata: Metadata = {
  title: "About SnapMod",
  description: "Learn why SnapMod exists, who it is for, and the principles behind its responsible AI creator tools.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About SnapMod", description: "Why SnapMod exists and the principles behind its responsible AI creator tools.", url: "/about", type: "website" },
};

export default function AboutPage() {
  return (
    <PublicPage
      eyebrow="About SnapMod"
      title="Useful creative tools, without the complicated workflow."
      intro="SnapMod is an independent creator-tool project focused on everyday production tasks: preparing images, exploring thumbnail concepts, and drafting scripts for social content."
      sections={[
        {
          title: "Why we built it",
          content: <p>Creators often move between several apps just to prepare one post or thumbnail. SnapMod brings a small set of focused tools into one workspace so an idea can move from draft to usable asset faster.</p>,
        },
        {
          title: "What the product does",
          content: <><p>The current toolkit includes AI-assisted image generation, background removal, consent-based face replacement, and a script-writing assistant. Each tool is designed as a starting point: users remain responsible for reviewing accuracy, rights, and suitability before publishing.</p><p>Read the practical guides for our <Link href="/tools/ai-face-swap">AI face swap</Link>, <Link href="/tools/background-remover">background remover</Link>, and <Link href="/tools/ai-script-writer">AI script writer</Link>.</p></>,
        },
        {
          title: "Our principles",
          content: <ul><li><strong>Utility:</strong> every feature should solve a recognizable production problem.</li><li><strong>Transparency:</strong> AI output can be imperfect and should be reviewed by a person.</li><li><strong>Consent:</strong> images of real people must only be used with the necessary permission.</li><li><strong>Ownership:</strong> users should upload only material they have the right to process.</li></ul>,
        },
        {
          title: "Who is behind SnapMod",
          content: <p>SnapMod is built in public by Daksh Purohit. Product updates and development notes are shared on <a href="https://www.linkedin.com/in/purohitdaksh" rel="noopener noreferrer" target="_blank">LinkedIn</a> and <a href="https://x.com/dkshuxcodes" rel="noopener noreferrer" target="_blank">X</a>. Questions and policy concerns can be sent through the <Link href="/contact">contact page</Link>.</p>,
        },
      ]}
    />
  );
}
