import type { Metadata } from "next";
import { Space_Grotesk, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin", "latin-ext"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
});

const siteUrl = "https://aitracker.hu";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "AI Tracker HU — ChatGPT és AI kereső láthatóság monitor Magyarország",
    template: "%s | AI Tracker HU",
  },
  description:
    "AI Tracker HU: mérd, megjelenik-e a céged a ChatGPT, Perplexity, Gemini és Google AI válaszaiban. Magyar kulcsszavak, versenytárs lista, PDF riport. Első AI audit 14 900 Ft-tól.",
  keywords: [
    "AI SEO",
    "AEO",
    "ChatGPT láthatóság",
    "AI kereső monitor",
    "Perplexity SEO",
    "Google AI Overviews",
    "AI Tracker HU",
    "magyar AEO",
    "LLM citation",
    "AI search visibility",
    "ChatGPT említés",
    "generatív kereső",
  ],
  authors: [{ name: "TD-AI & Marketing", url: "https://tdaimarketing.hu" }],
  creator: "TD-AI & Marketing",
  publisher: "TD-AI & Marketing",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AI Tracker HU — Megjelenik-e a céged a ChatGPT válaszaiban?",
    description:
      "Havi AI kereső monitor magyar kulcsszavakra. ChatGPT, Perplexity, Gemini, Google AI.",
    url: siteUrl,
    siteName: "AI Tracker HU",
    locale: "hu_HU",
    type: "website",
    images: [
      {
        url: "/images/aitracker-hero.webp",
        width: 1120,
        height: 700,
        alt: "AI Tracker HU dashboard — AI kereső láthatóság",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tracker HU — AI kereső láthatóság monitor",
    description:
      "Látod, kit ajánl a ChatGPT helyetted. Első scan 14 900 Ft.",
    images: ["/images/aitracker-hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hu"
      className={`${space.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
