import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
import GrainOverlay from "@/components/layout/GrainOverlay";
import { OrganizationLd, WebSiteLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import "./globals.css";

// The Figma design uses a single family — Montserrat — for both display and
// body copy, so there is exactly one woff2 on the critical path instead of the
// three families the previous design shipped. It is the LCP font (it renders
// the hero <h1>), so it preloads; the variable axis covers the 500/700/800
// weights the design calls for without extra file requests.
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
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
    <html lang="fr-CH" className={montserrat.variable}>
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
