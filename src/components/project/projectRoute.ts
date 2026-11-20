import type { Metadata } from "next";
import { getProject, projectSlugs } from "@/content";
import type { Locale } from "@/i18n/locales";
import { pageMetadata } from "@/i18n/metadata";
import { projectPaths } from "@/i18n/routes";

// What /portfolio/[slug] and /en/portfolio/[slug] share: the prerendered
// slugs and the metadata (canonical, hreflang, the desktop shot as the card).

export function projectStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export function projectMetadata(locale: Locale, slug: string): Metadata {
  const project = getProject(locale, slug);
  if (!project) return {};
  const { desktop } = project.shots;
  return pageMetadata({
    locale,
    paths: projectPaths(slug),
    title: project.seo.title,
    description: project.seo.description,
    type: "article",
    image: { url: desktop.src, width: desktop.width, height: desktop.height, alt: desktop.alt },
  });
}
