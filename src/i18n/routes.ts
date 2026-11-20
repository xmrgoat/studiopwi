import type { Metadata } from "next";
import { hreflang, type Locale } from "./locales";

// Every page that exists in both languages, by key. The header's language
// switcher, the hreflang alternates and the sitemap all read this one map,
// so a page can't link to a translation that doesn't exist.
export const routes = {
  home: { fr: "/", en: "/en" },
  contact: { fr: "/contact", en: "/en/contact" },
  legalNotice: { fr: "/mentions-legales", en: "/en/legal-notice" },
  privacy: { fr: "/confidentialite", en: "/en/privacy" },
  terms: { fr: "/conditions-generales", en: "/en/terms" },
  // The conversion pages. Each view is one lead in Vercel Analytics, so they
  // are noindex, out of the sitemap and never a language-switch target (see
  // switchMap): only a successful form send may land on them.
  thanks: { fr: "/merci", en: "/en/thank-you" },
  auditThanks: { fr: "/merci-audit", en: "/en/thank-you-audit" },
  llms: { fr: "/llms.txt", en: "/en/llms.txt" },
  pageMd: { fr: "/page.md", en: "/en/page.md" },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

export function projectPath(locale: Locale, slug: string): string {
  return `${locale === "fr" ? "" : "/en"}/portfolio/${slug}`;
}

/** A homepage section: "/#services", "/en#services". */
export function sectionPath(locale: Locale, id: string): string {
  return `${routes.home[locale]}#${id}`;
}

/** Both language versions of a page, from its key or a project slug. */
export type PagePaths = Record<Locale, string>;
export const projectPaths = (slug: string): PagePaths => ({
  fr: projectPath("fr", slug),
  en: projectPath("en", slug),
});

/**
 * Metadata alternates for a page that exists in both languages: a
 * self-referencing canonical, and hreflang links for fr, en and x-default
 * (French, the default). Relative paths resolve against metadataBase (www).
 */
export function alternates(paths: PagePaths, locale: Locale): NonNullable<Metadata["alternates"]> {
  return {
    canonical: paths[locale],
    languages: {
      [hreflang.fr]: paths.fr,
      [hreflang.en]: paths.en,
      "x-default": paths.fr,
    },
  };
}

/**
 * Pathname → the same page in the other language, for the header switcher.
 * The thank-you pages map to the other homepage, never to each other: a
 * switch must not add a page view to the conversion count.
 */
export function switchMap(locale: Locale, projectSlugs: readonly string[]): Record<string, string> {
  const other: Locale = locale === "fr" ? "en" : "fr";
  const map: Record<string, string> = {};
  for (const [key, paths] of Object.entries(routes)) {
    if (key === "llms" || key === "pageMd") continue;
    const conversion = key === "thanks" || key === "auditThanks";
    map[paths[locale]] = conversion ? routes.home[other] : paths[other];
  }
  for (const slug of projectSlugs) map[projectPath(locale, slug)] = projectPath(other, slug);
  return map;
}
