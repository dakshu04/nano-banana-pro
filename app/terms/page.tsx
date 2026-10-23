import type { Metadata } from "next";
import Link from "next/link";
import { PublicPage } from "../components/public-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing SnapMod accounts, AI-generated content, credit packs, acceptable use, and service availability.",
  alternates: { canonical: "/terms" },
  openGraph: { title: "Terms of Service | SnapMod", description: "Terms for SnapMod accounts, AI output, credit packs, and acceptable use.", url: "/terms", type: "website" },
};

export default function TermsPage() {
  return (
    <PublicPage
      eyebrow="Legal"
      title="Terms of Service"
      intro="These terms govern your use of SnapMod. By creating an account or using the service, you agree to them and to the Acceptable Use Policy."
      updated="October 23, 2026"
      sections={[
        {
          title: "Eligibility and accounts",
          content: <p>You must be at least 13 and old enough to enter a binding agreement where you live. You are responsible for accurate account information, activity under your account, and keeping access credentials secure. Do not share access in a way that bypasses plan limits.</p>,
        },
        {
          title: "Your content and permissions",
          content: <p>You retain any rights you already hold in prompts, uploads, and outputs. You grant SnapMod and its service providers a limited permission to host, transmit, transform, and process that material only as needed to operate, secure, and improve the service. You promise that you have the rights and consent needed for every upload, including permission from identifiable people where required.</p>,
        },
        {
          title: "AI output",
          content: <p>AI output may be inaccurate, incomplete, similar to other output, or unsuitable for a particular purpose. You must review it before use. SnapMod does not guarantee uniqueness, non-infringement, factual accuracy, or platform acceptance. Do not represent synthetic or materially altered media as authentic when that could mislead someone.</p>,
        },
        {
          title: "Credits, prices, and payments",
          content: <p>Paid plans shown as packs provide the listed number of credits rather than an automatically renewing subscription unless checkout clearly states otherwise. Prices and included features are displayed before purchase. Payment processing is handled by Dodo Payments. Except where law requires otherwise, used credits and completed digital processing are not refundable. Contact support promptly about duplicate or failed charges.</p>,
        },
        {
          title: "Prohibited use",
          content: <p>You must follow the <Link href="/acceptable-use">Acceptable Use Policy</Link>. We may block content, restrict features, suspend accounts, or preserve evidence when reasonably necessary to address unlawful activity, non-consensual intimate imagery, impersonation, fraud, exploitation, malware, harassment, rights violations, or attempts to abuse the service.</p>,
        },
        {
          title: "Service changes and termination",
          content: <p>Features may change, be rate-limited, or become temporarily unavailable. You may stop using the service at any time. We may suspend or terminate access for material or repeated violations, security risk, legal requirements, or nonpayment. Sections that logically survive termination—including rights, disclaimers, and liability limits—continue to apply.</p>,
        },
        {
          title: "Disclaimers and liability",
          content: <p>To the extent permitted by law, the service is provided “as is” and “as available.” SnapMod disclaims implied warranties and is not liable for indirect, incidental, special, consequential, or lost-profit damages. Nothing in these terms excludes rights or liability that cannot legally be excluded.</p>,
        },
        {
          title: "Contact",
          content: <p>Questions about these terms can be sent through the <Link href="/contact">contact page</Link>. If one provision is unenforceable, the remaining provisions continue to apply.</p>,
        },
      ]}
    />
  );
}
