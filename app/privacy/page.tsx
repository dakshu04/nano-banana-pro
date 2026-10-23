import type { Metadata } from "next";
import Link from "next/link";
import { PublicPage } from "../components/public-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How SnapMod collects, uses, stores, and shares account, payment, analytics, prompt, and image data.",
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy Policy | SnapMod", description: "How SnapMod handles account, payment, analytics, prompt, and image data.", url: "/privacy", type: "website" },
};

export default function PrivacyPage() {
  return (
    <PublicPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="This policy explains the information SnapMod processes when you browse the site, create an account, purchase credits, or use its AI-assisted creative tools."
      updated="October 23, 2026"
      sections={[
        {
          title: "Information we process",
          content: <ul><li><strong>Account data:</strong> identifiers and email address supplied through our authentication provider.</li><li><strong>Creative inputs:</strong> prompts, scripts, and images you submit to use a tool.</li><li><strong>Generated content:</strong> generated images, output links, and related history stored for your account.</li><li><strong>Transaction data:</strong> plan, product, transaction reference, status, and billing contact data. Payment credentials are processed by the payment provider.</li><li><strong>Usage data:</strong> device, page, referral, performance, and interaction information collected through hosting and analytics services.</li><li><strong>Support data:</strong> messages and attachments you voluntarily send us.</li></ul>,
        },
        {
          title: "How we use information",
          content: <p>We use information to authenticate users, operate requested tools, store account history, deliver purchases, prevent abuse, troubleshoot errors, understand product performance, communicate about support, and comply with legal obligations. We do not claim ownership of content merely because you submit it.</p>,
        },
        {
          title: "Service providers and transfers",
          content: <p>SnapMod uses specialist providers for authentication (Clerk), AI processing (Google), hosting and performance measurement (Vercel), analytics (Google Analytics and Vercel Analytics), data and file storage (database and Supabase services), and checkout processing (Dodo Payments). These providers may process information in other countries under their own contractual and legal safeguards.</p>,
        },
        {
          title: "Cookies and advertising",
          content: <><p>Authentication and security features may use essential cookies. Analytics services may use cookies or similar technologies to measure site use. If advertising is enabled, Google and its partners may use cookies to serve and measure ads, subject to consent requirements that apply in your region.</p><p>You can limit optional cookies through browser controls and any consent controls shown on the site. Blocking essential cookies may prevent sign-in. Learn more from <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google’s advertising technology policy</a>.</p></>,
        },
        {
          title: "Storage and retention",
          content: <p>Account records and generated-image history are kept while needed to provide the service and maintain legitimate business records. Prompts and generated image URLs are associated with your account. Upstream AI, hosting, storage, analytics, and payment providers may retain data according to their own terms. We remove or anonymize information when it is no longer reasonably needed, subject to backups, fraud prevention, disputes, and legal duties.</p>,
        },
        {
          title: "Your choices and rights",
          content: <p>Depending on where you live, you may request access, correction, deletion, portability, or restriction of personal data, or object to certain processing. You may also withdraw consent where processing relies on consent. Send a request through the <Link href="/contact">contact page</Link>; we may need to verify that the account belongs to you.</p>,
        },
        {
          title: "Children and security",
          content: <><p>SnapMod is not directed to children under 13, and users must meet any higher minimum age required in their country. We do not knowingly collect personal data from children below the applicable minimum age.</p><p>We use reasonable technical and organizational safeguards, but no online service can guarantee absolute security. Report suspected unauthorized access promptly.</p></>,
        },
        {
          title: "Questions and changes",
          content: <p>We may update this policy when the product or law changes. Material changes will be reflected by the date above. Privacy questions can be sent to <a href="mailto:support@snapmod.xyz?subject=Privacy%20request">support@snapmod.xyz</a>.</p>,
        },
      ]}
    />
  );
}
