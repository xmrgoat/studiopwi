import type { Metadata, Viewport } from "next";
import { Geist, Megrim, Nunito_Sans } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
import GrainOverlay from "@/components/layout/GrainOverlay";
import { OrganizationLd, WebSiteLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import "./globals.css";

// Only the LCP font (Nunito Sans — renders the hero <h1>) is preloaded.
// Preloading every family makes all three woff2 files compete at the
// browser's highest priority against the render-blocking CSS, which on
// throttled mobile starves the critical path and delays the LCP paint.
// Megrim (logo) and Geist (body) are non-LCP, so they load lazily and
// swap in via `display: swap` without holding up first render.
const megrim = Megrim({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-megrim",
  display: "swap",
  preload: false,
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
  preload: false,
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
    "Sites web pour entreprises de paysagisme en Suisse — attirez plus de clients, générez plus de demandes de devis et décrochez de meilleurs chantiers.",
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
      "Sites web pour entreprises de paysagisme en Suisse — attirez plus de clients, générez plus de demandes de devis et décrochez de meilleurs chantiers.",
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
      "Sites web pour entreprises de paysagisme en Suisse — attirez plus de clients, générez plus de demandes de devis et décrochez de meilleurs chantiers.",
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
      <head>
        {/*
          next/font's preload:true silently produces no <link rel="preload">
          in Next.js 15 App Router (the data-precedence streaming architecture
          prevents Critters / the font injector from adding them). Add the
          preload manually for the LCP font — the primary Latin subset woff2
          whose URL is content-hashed on the font file and stable across builds
          as long as the Nunito_Sans() config doesn't change.
        */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/_next/static/media/68180864d7f93f02-s.p.woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Aller au contenu
        </a>
        <OrganizationLd />
        <WebSiteLd />
        <SmoothScroll />
        {children}
        <GrainOverlay />
      </body>
    </html>
  );
}
