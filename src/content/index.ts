// One entry point for all copy: getDictionary(locale). Server components and
// the generated routes call it; client components get only the strings they
// render, as props, so one language's copy never ships in the other's bundle.
import type { Locale } from "@/i18n/locales";
import { site as frSite } from "./fr/site";
import { services as frServices } from "./fr/services";
import { cases as frCases } from "./fr/cases";
import { ui as frUi } from "./fr/ui";
import { site as enSite } from "./en/site";
import { services as enServices } from "./en/services";
import { cases as enCases } from "./en/cases";
import { ui as enUi } from "./en/ui";
import type { CasesCopy, Project, ServicesCopy, SiteCopy, UiCopy } from "./types";

export type Dictionary = {
  locale: Locale;
  site: SiteCopy;
  services: ServicesCopy;
  cases: CasesCopy;
  ui: UiCopy;
};

const dictionaries: Record<Locale, Dictionary> = {
  fr: { locale: "fr", site: frSite, services: frServices, cases: frCases, ui: frUi },
  en: { locale: "en", site: enSite, services: enServices, cases: enCases, ui: enUi },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function getProject(locale: Locale, slug: string): Project | undefined {
  return dictionaries[locale].cases.projects.find((p) => p.slug === slug);
}

/** The project slugs. Both languages carry the same ones (checked below). */
export const projectSlugs: readonly string[] = frCases.projects.map((p) => p.slug);

// Fail the build if a project exists in one language only: the sitemap,
// hreflang and the switcher assume every project page has its translation.
if (enCases.projects.map((p) => p.slug).join() !== projectSlugs.join()) {
  throw new Error("content/fr/cases.ts and content/en/cases.ts list different projects");
}

export type { CaseStudy, CarePlan, Project, Service, ServiceTier } from "./types";
export { chf } from "./format";
export { facts } from "./facts";
