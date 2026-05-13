import type { Metadata, Viewport } from "next";
import { Geist, Megrim, Nunito_Sans } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
import GrainOverlay from "@/components/layout/GrainOverlay";
import { site } from "@/content/site";
import "./globals.css";

const megrim = Megrim({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-megrim",
  display: "swap",
  preload: true,
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
  preload: true,
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Premium websites that generate qualified leads for craft-driven Swiss landscapers.",
  applicationName: site.name,
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "fr_CH",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description:
      "Premium websites for Swiss landscapers. Niche-only studio, transparent pricing, 90-day guarantee.",
    images: ["/images/og.png"],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#efefef" },
    { media: "(prefers-color-scheme: dark)", color: "#1d3a32" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr-CH"
      className={`${megrim.variable} ${nunitoSans.variable} ${geist.variable}`}
    >
      <body>
        <SmoothScroll />
        {children}
        <GrainOverlay />
      </body>
    </html>
  );
}
