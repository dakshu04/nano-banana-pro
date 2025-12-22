import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
// 1. Optimize Fonts (Inter is great for professional/agency vibes)
const inter = Inter({ subsets: ["latin"] });

// 2. SEO Metadata (Customized for SnapMod)
export const metadata: Metadata = {
  // This sets the "base" for all your links, so you don't need to type https://... every time
  metadataBase: new URL('https://snapmod.xyz'),

  title: {
    default: "SnapMod | The Ultimate Toolkit for Creators & Agencies",
    template: "%s | SnapMod"
  },
  
  description: "Accelerate your creative workflow with SnapMod. The #1 platform for freelancers, digital agencies, and content creators to build, manage, and scale their visual assets.",
  
  // High-value keywords for your specific niche
  keywords: [
    "SnapMod", 
    "Creator Tools", 
    "Freelance Productivity", 
    "Agency Software", 
    "Digital Asset Management", 
    "Next.js", 
    "React", 
    "SaaS"
  ],

  // How your link looks when shared on LinkedIn, Discord, Twitter, etc.
  openGraph: {
    title: "SnapMod | The Ultimate Toolkit for Creators & Agencies",
    description: "Accelerate your creative workflow. The #1 platform for freelancers and agencies.",
    url: "https://snapmod.xyz",
    siteName: "SnapMod",
    images: [
      {
        url: "/mrbeast-daksh.png", // Make sure you put a file named 'og-image.jpg' in your 'public' folder
        width: 1200,
        height: 630,
        alt: "SnapMod Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter specific card (Critical for tech/creator Twitter)
  twitter: {
    card: "summary_large_image",
    title: "SnapMod | For Creators & Agencies",
    description: "The ultimate platform for freelancers and creative agencies.",
    images: ["/mrbeast-daksh.png"], // Uses the same image from public folder
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

  // 3. Google Search Console Verification
  verification: {
    google: "MQ00drVCfrnNPwcdRxKf0xy4d3q7V6DoGuLnPdSzHf8", // Paste the code from Search Console here
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <SpeedInsights />

      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster richColors position="top-center" /> 
        </body>
        {/* 4. Google Analytics - Paste your 'G-...' ID below */}
          <Analytics />
        <GoogleAnalytics gaId="G-KEPXV1W91E" /> 
      </html>
    </ClerkProvider>
  );
}