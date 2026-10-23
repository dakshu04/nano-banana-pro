import LandingPage from "./components/landingPage";
import { AdsenseScript } from "./components/adsense-script";


export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SnapMod",
    url: "https://snapmod.xyz/",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    description: "AI-assisted tools for creator thumbnails, background removal, image generation, and social script drafting.",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "0",
      highPrice: "20",
      priceCurrency: "USD",
      offerCount: "4",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <AdsenseScript />
      <LandingPage />
    </>
  )
}
