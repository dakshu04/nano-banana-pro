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

  title: {
    default: "SnapMod | The Ultimate Toolkit for Creators & Agencies",
    template: "%s | SnapMod"
  },
  
  description: "Accelerate your creative workflow with SnapMod. The #1 platform for freelancers, digital agencies, and content creators to build, manage, and scale their visual assets.",
  
  keywords: [
    "SnapMod", "Creator Tools", "Freelance Productivity", "Agency Software", 
    "Digital Asset Management", "Next.js", "React", "SaaS", "Viral Scripts", "Face Swap"
  ],

  openGraph: {
    title: "SnapMod | The Ultimate Toolkit for Creators & Agencies",
    description: "Accelerate your creative workflow. The #1 platform for freelancers and agencies.",
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
    description: "The ultimate platform for freelancers and creative agencies.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
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