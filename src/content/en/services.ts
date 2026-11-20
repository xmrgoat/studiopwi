// English offers. Adapted from content/fr/services.ts, not translated word
// for word; every number comes from content/facts.ts.
import { facts, split } from "../facts";
import { chf } from "../format";
import type { CarePlan, Service, ServicesCopy } from "../types";

const { tiers: t, care: c } = facts;
const weeks = (w: readonly number[]) => `${w[0]} to ${w[1]} weeks`;
const payment = (tier: keyof typeof t) => {
  const [deposit, balance] = split(tier);
  return `${deposit}% deposit · ${balance}% on delivery`;
};

// The English plan names (approved November 2026). Used by the cards, the
// FAQ, the JSON-LD and the AI files.
export const names = {
  showcase: "Launch",
  growth: "Growth",
  partnership: "Business",
  "care-essentiel": "Care Essential",
  "care-pro": "Care Pro",
  retainer: "Retainer",
} as const;

export const services = {
  headline: "Three ways to grow your landscaping business online",
  intro:
    "Each plan is built to help your landscaping business get found, earn trust and get more quote requests.",
  // "72 h ouvrables" kept as 72 business hours, as the price list states it.
  reassurance: `Fixed prices, no hourly billing. Legal pages don't count toward the page total. Revisions: ${facts.revisionHours} business hours to approve the design or send one grouped list of changes. Timelines start once we have your deposit and your content. Support after launch: ${facts.supportDays} days included.`,
  featuredBadge: "Recommended",

  tiers: [
    {
      id: "showcase",
      title: names.showcase,
      duration: weeks(t.showcase.weeks),
      price: t.showcase.price,
      payment: payment("showcase"),
      description:
        "For sole traders and small businesses that want a clear, professional website, fast.",
      features: [
        `${t.showcase.pages} pages: home, services, contact`,
        "Custom design, visual identity and text logo",
        "Contact form",
        "SEO basics: sitemap, Google Search Console, Bing",
        `${t.showcase.languages} language · ${facts.revisionRounds} rounds of revisions`,
        `${facts.supportDays} days of support after launch`,
      ],
      cta: { label: "Start my project", href: "#contact" },
      featured: false,
    },
    {
      id: "growth",
      title: names.growth,
      duration: weeks(t.growth.weeks),
      price: t.growth.price,
      payment: payment("growth"),
      description:
        "For businesses that want a fuller website, built to earn trust and turn visitors into clients.",
      features: [
        `Everything in ${names.showcase}`,
        `${t.growth.pages} pages: + about and projects`,
        "Animated intro video (motion graphics)",
        `Up to ${t.growth.languages} languages`,
        "Visitor statistics (analytics)",
        "Local SEO: Google Business Profile, local.ch, search.ch",
      ],
      cta: { label: "Start my project", href: "#contact" },
      featured: true,
    },
    {
      id: "partnership",
      title: names.partnership,
      duration: weeks(t.partnership.weeks),
      price: t.partnership.price,
      payment: payment("partnership"),
      // "Entreprises sérieuses": "serious" reads oddly in English.
      description:
        "For established businesses that want to stand out and build a presence that lasts.",
      features: [
        `Everything in ${names.growth}`,
        `${t.partnership.pages} pages: 6 service pages, blog, projects`,
        `Up to ${t.partnership.languages} languages, text written by Studio PWI`,
        "Form connected to a CRM, or a booking tool",
        "Advanced SEO: keywords, service pages, blog plan",
        `${facts.supportDays} days of priority support`,
      ],
      cta: { label: "Start my project", href: "#contact" },
      featured: false,
    },
  ] as const satisfies readonly Service[],

  care: {
    headline: "Monthly website care",
    intro: `Backups and monitoring are included in every plan. Small changes: text, images, adding reviews… No commitment, with a recommended minimum of ${facts.careMinMonths} months.`,
    plans: [
      {
        id: "care-essentiel",
        title: names["care-essentiel"],
        price: c["care-essentiel"].price,
        features: [
          `${c["care-essentiel"].edits} small change per month`,
          `SEO and statistics report as an add-on (${chf(facts.seoReportAddon, "en")})`,
        ],
        featured: false,
      },
      {
        id: "care-pro",
        title: names["care-pro"],
        price: c["care-pro"].price,
        features: [
          `${c["care-pro"].edits} small changes per month`,
          "SEO, performance and statistics report",
        ],
        featured: false,
      },
      {
        id: "retainer",
        title: names.retainer,
        price: c.retainer.price,
        features: [
          `${c.retainer.edits} small changes per month`,
          "SEO, performance and statistics report",
          `${facts.landingDiscount}% off landing pages and campaigns`,
        ],
        featured: true,
      },
    ] as const satisfies readonly CarePlan[],
    footnote: "Anything outside your plan gets its own fixed-price quote.",
    cta: { label: "Start my project", href: "#contact" },
  },

  schema: {
    tierName: (title: string) => `${title} plan — website for landscapers`,
    tierType: "Website design",
    careName: (title: string) => `${title} — website maintenance`,
    careType: "Website maintenance",
    month: "month",
  },
} as const satisfies ServicesCopy;
