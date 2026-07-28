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

export const metadata: Metadata = {
  title: "AI Tracker HU — Megjelenik-e a céged a ChatGPT válaszaiban?",
  description:
    "Magyar AI kereső monitor: ChatGPT, Perplexity, Gemini, Google AI. Látod, kit ajánlanak helyetted — és mit kell javítanod. Első scan 14 900 Ft-tól.",
  openGraph: {
    title: "AI Tracker HU — Ki nyer az AI keresőkben?",
    description:
      "Havi monitor: a ChatGPT a konkurenciát ajánlja, vagy téged? Magyar kulcsszavakra, javítási tervvel.",
    locale: "hu_HU",
    type: "website",
    images: [{ url: "/images/aitracker-hero.webp" }],
  },
  robots: { index: true, follow: true },
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
