import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

// "" locally / on Vercel; "/<repo-name>" when deployed to GitHub Pages
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Who's The Imposter? — India Edition",
  description:
    "Bluff. Debate. Vote. Win. The ultimate Indian social deduction party game — Bollywood, Cricket, Street Food & more!",
  manifest: `${BASE_PATH}/manifest.json`,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Imposter India",
  },
  openGraph: {
    title: "Who's The Imposter? — India Edition",
    description: "Bluff. Debate. Vote. Win.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0817",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} ${inter.variable} min-h-dvh`}>
        {children}
      </body>
    </html>
  );
}
