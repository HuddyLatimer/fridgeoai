import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FridgeoAI - Free AI Recipe Generator from Your Fridge | Smart Meal Planner",
  description: "Turn your fridge ingredients into delicious meals instantly! Free AI-powered recipe generator that scans your fridge photos or pantry items and creates personalized recipes. No signup required. What's in your fridge today?",
  keywords: [
    "recipe generator",
    "recipe maker",
    "fridge recipe finder",
    "what to make with ingredients",
    "AI recipe generator",
    "meal ideas from fridge",
    "leftover recipe ideas",
    "smart recipe suggestions",
    "ingredient-based recipes",
    "free recipe generator",
    "photo to recipe",
    "fridge scanner",
    "meal planner",
    "cooking with what you have",
    "reduce food waste",
    "pantry meal ideas",
    "recipe from ingredients",
    "what can I cook with these ingredients",
  ],
  authors: [{ name: "FridgeoAI" }],
  creator: "FridgeoAI",
  publisher: "FridgeoAI",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fridgeo.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'FridgeoAI',
    title: 'FridgeoAI - Free AI Recipe Generator from Your Fridge',
    description: 'Turn your fridge ingredients into delicious meals instantly! Snap a photo of your fridge or enter ingredients to get personalized AI-powered recipes. 100% free, no signup required.',
    images: [
      {
        url: '/logo1.png',
        width: 1200,
        height: 630,
        alt: 'FridgeoAI - Smart Recipe Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FridgeoAI - Free AI Recipe Generator from Your Fridge',
    description: 'Turn your fridge ingredients into delicious meals instantly! Snap a photo or enter ingredients for personalized recipes. 100% free!',
    images: ['/logo1.png'],
    creator: '@fridgeoai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  verification: {
    google: 'google-site-verification-code', // User should replace with actual code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
