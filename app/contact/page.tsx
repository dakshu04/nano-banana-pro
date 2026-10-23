import type { Metadata } from "next";
import { PublicPage } from "../components/public-page";

export const metadata: Metadata = {
  title: "Contact SnapMod",
  description: "Contact SnapMod for product help, billing questions, privacy requests, or content and safety concerns.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact SnapMod", description: "Get help with SnapMod accounts, billing, privacy, or safety.", url: "/contact", type: "website" },
};

export default function ContactPage() {
  return (
    <PublicPage
      eyebrow="Contact"
      title="How can we help?"
      intro="Choose the route that best matches your question. Include the email used for your SnapMod account when asking about an account or purchase."
      sections={[
        {
          title: "Product and account support",
          content: <p>Email <a href="mailto:support@snapmod.xyz">support@snapmod.xyz</a> with a short description, the page where the issue occurred, and any non-sensitive error message. Do not email passwords, payment card details, API keys, or identity documents.</p>,
        },
        {
          title: "Billing questions",
          content: <p>For a payment or credit-pack question, email <a href="mailto:support@snapmod.xyz?subject=Billing%20support">support@snapmod.xyz</a> with the purchase date and transaction reference. Payments are handled by Dodo Payments; SnapMod does not ask you to send full card details.</p>,
        },
        {
          title: "Privacy, copyright, and safety",
          content: <p>Use <a href="mailto:support@snapmod.xyz?subject=Privacy%20or%20safety%20request">support@snapmod.xyz</a> for data-access or deletion requests, copyright complaints, impersonation reports, or concerns about generated content. Provide links or record identifiers where possible so the report can be reviewed.</p>,
        },
        {
          title: "Response expectations",
          content: <p>We aim to acknowledge support requests within three business days. Complex privacy, payment, or abuse reviews can take longer because identity, ownership, or transaction details may need to be verified.</p>,
        },
      ]}
    />
  );
}
