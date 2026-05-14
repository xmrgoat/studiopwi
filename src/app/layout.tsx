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
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://studiopwi.com",
  ),
  title: {
    default: `${site.name} — Sites web pour paysagistes suisses`,
    template: `%s · ${site.name}`,
  },
  description:
    "Studio web spécialisé pour paysagistes suisses. Sites orientés conversion, demandes de devis qualifiées, garantie 90 jours. Basés à Neuchâtel.",
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: [
    "site web paysagiste",
    "paysagiste suisse",
    "site internet paysagiste",
    "création site web paysagiste",
    "agence web paysagisme",
    "site web Neuchâtel",
    "paysagiste Romandie",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_CH",
    url: "/",
    siteName: site.name,
    title: `${site.name} — Sites web pour paysagistes suisses`,
    description:
      "Studio web dédié aux paysagistes en Suisse. Sites orientés conversion, transparence des prix, garantie 90 jours.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} — Studio web pour paysagistes suisses`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Sites web pour paysagistes suisses`,
    description:
      "Studio web dédié aux paysagistes en Suisse. Sites orientés conversion, garantie 90 jours.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "business",
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
        <a href="#main" className="skip-link">
          Aller au contenu
        </a>
        <SmoothScroll />
        {children}
        <GrainOverlay />
      </body>
    </html>
  );
}
