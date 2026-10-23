import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://snapmod.xyz'),
  applicationName: "SnapMod",
  authors: [{ name: "SnapMod", url: "https://snapmod.xyz/about" }],
  creator: "SnapMod",
  publisher: "SnapMod",
  category: "Creative software",
  alternates: {
    canonical: "/",
  },

  title: {
    default: "SnapMod | The Ultimate Toolkit for Creators & Agencies",
    template: "%s | SnapMod"
  },
  
  description: "Create original thumbnails, remove image backgrounds, generate social scripts, and produce creator assets with SnapMod's practical AI tools.",
  
  keywords: [
    "SnapMod", "AI creator tools", "AI face swap", "background remover",
    "AI script writer", "YouTube thumbnail tools", "content creator software"
  ],

  openGraph: {
    title: "SnapMod | The Ultimate Toolkit for Creators & Agencies",
    description: "Practical AI tools for original thumbnails, background removal, social scripts, and creator assets.",
    url: "https://snapmod.xyz",
    siteName: "SnapMod",
    images: [
      {
        url: "/snapmod.png", // Ensure this file is in your 'public' folder
        width: 1200,
        height: 630,
        alt: "SnapMod Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SnapMod | For Creators & Agencies",
    description: "Create original thumbnails, remove backgrounds, and draft social scripts with SnapMod.",
    images: ["/snapmod.png"], 
    creator: "@dkshuxcodes", // Add your handle here for better attribution
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "MQ00drVCfrnNPwcdRxKf0xy4d3q7V6DoGuLnPdSzHf8",
  },
  other: {
    "google-adsense-account": "ca-pub-6044278578685946",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          {children}
          
          {/* UI Components like Toaster go at the end of body */}
          <Toaster richColors position="top-center" /> 
          
          {/* Analytics & Insights should be INSIDE the body */}
          <SpeedInsights />
          <Analytics />
          <GoogleAnalytics gaId="G-KEPXV1W91E" /> 
        </body>
      </html>
    </ClerkProvider>
  );
}
