import type { Metadata } from "next";
import Link from "next/link";
import { PublicPage } from "../components/public-page";

export const metadata: Metadata = {
  title: "Acceptable Use Policy",
  description: "Rules for lawful, consensual, and responsible use of SnapMod AI image and writing tools.",
  alternates: { canonical: "/acceptable-use" },
  openGraph: { title: "Acceptable Use Policy | SnapMod", description: "Rules for lawful, consensual, and responsible use of SnapMod.", url: "/acceptable-use", type: "website" },
};

export default function AcceptableUsePage() {
  return (
    <PublicPage
      eyebrow="Safety"
      title="Acceptable Use Policy"
      intro="SnapMod is for legitimate creative work. These rules apply to prompts, uploads, generated output, account behavior, and any attempt to use the service indirectly."
      updated="October 23, 2026"
      sections={[
        {
          title: "Consent and identity",
          content: <ul><li>Only upload or alter a person’s image when you have the rights and appropriate consent.</li><li>Do not create deceptive impersonation, false endorsements, fabricated evidence, or content intended to mislead people about real events.</li><li>Do not create intimate or sexualized content involving a real person without their explicit consent.</li><li>Never create sexual or exploitative content involving minors or anyone presented as a minor.</li></ul>,
        },
        {
          title: "Illegal, harmful, or abusive content",
          content: <ul><li>Do not use SnapMod for fraud, threats, harassment, stalking, extortion, hateful abuse, or instructions that facilitate serious wrongdoing.</li><li>Do not upload malware, attempt to defeat security controls, scrape the service at scale, or interfere with other users.</li><li>Do not use the tools to violate privacy, publicity, copyright, trademark, or other rights.</li></ul>,
        },
        {
          title: "Responsible publishing",
          content: <p>Review every output before publishing. Disclose synthetic or materially altered media when a reasonable viewer could otherwise mistake it for authentic content. Verify factual claims in generated scripts and follow the rules of the platform where you publish.</p>,
        },
        {
          title: "Enforcement and reporting",
          content: <p>We may reject requests, remove stored material, limit access, or suspend accounts when we reasonably believe these rules have been violated. To report impersonation, rights infringement, or harmful output, use the <Link href="/contact">contact page</Link> and include enough information to locate the material.</p>,
        },
      ]}
    />
  );
}
