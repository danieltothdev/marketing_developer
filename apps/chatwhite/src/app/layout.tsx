import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
});

const siteUrl = "https://chatwhite.hu";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "ChatWhite — Magyar AI chatbot KKV-knak | Lead gyűjtés 24/7",
    template: "%s | ChatWhite",
  },
  description:
    "ChatWhite: beágyazható magyar AI chatbot KKV-knak. 24/7 válaszol a weboldalon, leadet gyűjt (név, telefon, email), azonnal értesít. 14 nap próba bankkártya nélkül. Start 7 990 Ft/hó-tól.",
  keywords: [
    "AI chatbot",
    "magyar chatbot",
    "KKV chatbot",
    "weboldal chatbot",
    "lead gyűjtés",
    "AI ügyfélszolgálat",
    "white-label chatbot",
    "ChatWhite",
    "chatbot Magyarország",
    "éjszakai lead",
    "beágyazható chatbot",
  ],
  authors: [{ name: "TD-AI & Marketing", url: "https://tdaimarketing.hu" }],
  creator: "TD-AI & Marketing",
  publisher: "TD-AI & Marketing",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ChatWhite — Magyar AI chatbot, ami leadet gyűjt, amíg te alszol",
    description:
      "Egy sor kód. Magyar AI. Azonnali értesítés minden megkeresésről. 14 nap próba.",
    url: siteUrl,
    siteName: "ChatWhite",
    locale: "hu_HU",
    type: "website",
    images: [
      {
        url: "/images/chatwhite-hero-bg.webp",
        width: 1120,
        height: 700,
        alt: "ChatWhite AI chatbot éjszakai irodában",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatWhite — Magyar AI chatbot KKV-knak",
    description:
      "24/7 lead gyűjtés a weboldalon. Magyar AI. 14 nap próba bankkártya nélkül.",
    images: ["/images/chatwhite-hero-bg.webp"],
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
      className={`${inter.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
