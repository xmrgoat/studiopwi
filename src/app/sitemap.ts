import type { MetadataRoute } from "next";
import { projectSlugs } from "@/content";
import { hreflang, locales } from "@/i18n/locales";
import { SITE_URL } from "@/i18n/metadata";
import { projectPaths, routes, type PagePaths } from "@/i18n/routes";

const abs = (path: string) => (path === "/" ? SITE_URL : `${SITE_URL}${path}`);

type Page = {
  paths: PagePaths;
  // Bump when the page's content, title or structured data changes.
  lastModified: string;
  changeFrequency: "monthly" | "yearly";
  priority: number;
};

// Every indexable page, once per language. Each entry lists both versions
// (and x-default, French) as xhtml:link alternates, the same hreflang the
// pages declare. Never the thank-you pages: they are noindex conversions.
const pages: Page[] = [
  { paths: routes.home, lastModified: "2026-11-20", changeFrequency: "monthly", priority: 1 },
  { paths: routes.contact, lastModified: "2026-11-20", changeFrequency: "monthly", priority: 0.8 },
  ...projectSlugs.map((slug) => ({
    paths: projectPaths(slug),
    lastModified: "2026-11-20",
    changeFrequency: "yearly" as const,
    priority: 0.7,
  })),
  { paths: routes.privacy, lastModified: "2026-11-20", changeFrequency: "yearly", priority: 0.3 },
  { paths: routes.terms, lastModified: "2026-11-20", changeFrequency: "yearly", priority: 0.3 },
  { paths: routes.legalNotice, lastModified: "2026-11-20", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: abs(page.paths[locale]),
      lastModified: new Date(page.lastModified),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          [hreflang.fr]: abs(page.paths.fr),
          [hreflang.en]: abs(page.paths.en),
          "x-default": abs(page.paths.fr),
        },
      },
    })),
  );
}
