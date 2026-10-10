import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
//
// style includes "italic": next/font only loads the normal style by default,
// so font-style: italic (the why-us attribution) fell back to faux-oblique,
// which most engines suppress at bold weights on a variable font — it
// computed as italic but rendered upright. Loading the real italic face fixes
// that, at the cost of a second woff2 request.
const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
});

// The homepage title, with the same " · Studio PWI" suffix the template gives
// every other page.
const HOME_TITLE = `${site.seo.title} · ${site.name}`;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://studiopwi.com",
  ),
  title: {
    default: HOME_TITLE,
    template: `%s · ${site.name}`,
  },
  description: site.seo.description,
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
    title: HOME_TITLE,
    description: site.seo.description,
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
    title: HOME_TITLE,
    description: site.seo.description,
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
  // One flat theme — the redesign has no dark surface, so the browser chrome
  // stays the page ground at every color-scheme setting. The old dark-mode
  // value (#1d3a32) was inherited from a color that no longer exists in
  // tokens.css and never matched anything actually on screen.
  themeColor: "#efefef",
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
        <Analytics />
      </body>
    </html>
  );
}
