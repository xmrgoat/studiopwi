// The shape every language's copy must satisfy. The French files define the
// site copy and UI strings; DeepWiden turns their literal types into plain
// strings so the English files are checked against the same keys (a missing
// or misspelled key fails the typecheck) without having to repeat the French
// words. Keys named `id` keep their literal types, so both languages use the
// same tier and plan ids.
import type { CarePlanId, ServiceTier } from "./facts";
import type { site as frSite } from "./fr/site";
import type { ui as frUi } from "./fr/ui";

export type { CarePlanId, ServiceTier } from "./facts";

export type DeepWiden<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly DeepWiden<U>[]
        : T extends object
          ? { readonly [K in keyof T]: K extends "id" ? T[K] : DeepWiden<T[K]> }
          : T;

export type SiteCopy = DeepWiden<typeof frSite>;
export type UiCopy = DeepWiden<typeof frUi>;

export type Service = {
  id: ServiceTier;
  title: string;
  duration: string;
  /** Fixed price in CHF — shown on the card and in the Offer JSON-LD. */
  price: number;
  payment: string;
  description: string;
  features: readonly string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

export type CarePlan = {
  id: CarePlanId;
  title: string;
  /** Monthly price in CHF. */
  price: number;
  features: readonly string[];
  /** Inverted card, styled like the featured tier. */
  featured?: boolean;
};

export type ServicesCopy = {
  headline: string;
  intro: string;
  reassurance: string;
  featuredBadge: string;
  tiers: readonly Service[];
  care: {
    headline: string;
    intro: string;
    plans: readonly CarePlan[];
    footnote: string;
    cta: { label: string; href: string };
  };
  /** Words the JSON-LD offer catalog and the AI files use around the names. */
  schema: {
    tierName: (title: string) => string;
    tierType: string;
    careName: (title: string) => string;
    careType: string;
    month: string;
  };
};

export type CaseStudy = {
  slug: string;
  client: string;
  eyebrow: string;
  image: { src: string; alt: string; width: number; height: number };
  siteUrl?: string;
  siteLabel?: string;
  inProduction?: boolean;
  statusLabel?: string;
  problemLabel: string;
  problem: string;
  solutionLabel: string;
  solution: string;
  cta: { label: string; href: string };
  /** The full project page, linked under the CTA. */
  detail?: { label: string; href: string };
};

export type Shot = { src: string; alt: string; width: number; height: number };

/** Which fact a row states, so code can find it in either language. */
export type FactId = "trade" | "location" | "scope";

export type Project = {
  slug: string;
  client: string;
  /** <title> (before " · Studio PWI") and meta description. ≤ 60 / ≈ 155. */
  seo: { title: string; description: string };
  title: string;
  summary: string;
  facts: readonly { id: FactId; label: string; value: string }[];
  site: { url: string; label: string };
  problem: { title: string; lead: string; body: readonly string[] };
  solution: {
    title: string;
    lead: string;
    decisions: readonly { title: string; body: string }[];
  };
  shots: { desktop: Shot; mobile: Shot; process: Shot; form: Shot };
  captions: { mobileLabel: string; mobile: string; process: string; form: string };
  testimonial: { title: string; quote: string; author: string; role: string };
  /** One line under the client name in the "Projet suivant" link. */
  teaser: string;
  next: string;
};

export type ProjectPageCopy = {
  nextLabel: string;
  cta: { href: string; title: string; lead: string; note: string };
};

export type CasesCopy = {
  items: readonly CaseStudy[];
  projectPage: ProjectPageCopy;
  projects: readonly Project[];
};
