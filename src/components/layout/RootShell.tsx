import type { Viewport } from "next";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/layout/SmoothScroll";
import GrainOverlay from "@/components/layout/GrainOverlay";
import Magnetic from "@/components/motion/Magnetic";
import { OrganizationLd, WebSiteLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/content";
import { htmlLang, type Locale } from "@/i18n/locales";

// The Figma design uses a single family — Montserrat — for both display and
// body copy, so there is exactly one woff2 on the critical path. It is the
// LCP font (it renders the hero <h1>), so it preloads; the variable axis
// covers the 500/700/800 weights the design calls for without extra requests.
//
// style includes "italic": next/font only loads the normal style by default,
// so font-style: italic (the why-us attribution) fell back to faux-oblique,
// which most engines suppress at bold weights on a variable font. Loading
// the real italic face fixes that, at the cost of a second woff2 request.
const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  // One flat theme — the redesign has no dark surface, so the browser chrome
  // stays the page ground at every color-scheme setting.
  themeColor: "#efefef",
  width: "device-width",
  initialScale: 1,
};

// Everything both root layouts share: the <html> element with the
// language's lang, the skip link (the first focusable element in <body>),
// the sitewide JSON-LD, smooth scrolling, the magnetic CTAs, the grain and
// Vercel Analytics. Each language has its own root layout —
// app/(fr)/layout.tsx and app/(en)/layout.tsx — so <html lang> is right on
// every page without middleware.
export default function RootShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const { ui } = getDictionary(locale);
  return (
    <html lang={htmlLang[locale]} className={montserrat.variable}>
      <body>
        <a href="#main" className="skip-link">
          {ui.skipLink}
        </a>
        <OrganizationLd locale={locale} />
        <WebSiteLd locale={locale} />
        <SmoothScroll />
        <Magnetic />
        {children}
        <GrainOverlay />
        <Analytics />
      </body>
    </html>
  );
}
