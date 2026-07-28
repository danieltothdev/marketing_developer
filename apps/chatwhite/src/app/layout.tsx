import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ChatWhite — Magyar AI chatbot, ami leadet gyűjt, amíg te alszol",
  description:
    "Beágyazható, magyar nyelvű AI chatbot KKV-knak. 24/7 válaszol, összegyűjti a megkereséseket, azonnal értesít. 14 nap próba, bankkártya nélkül.",
  openGraph: {
    title: "ChatWhite — Lead gyűjtés, amíg te alszol",
    description:
      "Egy sor kód. Magyar AI. Azonnali értesítés minden megkeresésről.",
    locale: "hu_HU",
    type: "website",
    images: [{ url: "/images/chatwhite-hero.webp" }],
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
      className={`${dmSans.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
