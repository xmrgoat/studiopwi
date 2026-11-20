// The facts both languages state: identity, contact routes, prices, deposits,
// timelines, page counts. The French and English copy (content/fr, content/en)
// build their sentences from these values instead of retyping them, so the
// two versions of the site — and the JSON-LD, llms.txt and page.md built
// from them — can't quote different numbers.
//
// Source of truth for the offers: the "Studio PWI – Liste de prix" PDF
// (October 2026). Prices are shown on the page, which is what allows them in
// the Offer JSON-LD too — Google requires price markup to match visible prices.

// "partnership" is the id of the Entreprise / Business tier. It was called
// Partenariat before the October 2026 price list; the id is kept because the
// contact form and its validation schema send it, and it never reaches the page.
export type ServiceTier = "showcase" | "growth" | "partnership";
export type CarePlanId = "care-essentiel" | "care-pro" | "retainer";

const WHATSAPP = "+41 77 267 33 24";

export const facts = {
  name: "Studio PWI",
  domain: "studiopwi.com",
  email: "contact@studiopwi.com",
  // Click-to-call: when set (e.g. "+41 76 000 00 00"), a phone button appears
  // in the mobile header and the contact section. Left empty until confirmed.
  phone: null as string | null,
  // WhatsApp Business. wa.me takes the number in international form, digits
  // only; each language adds its own prefilled first line.
  whatsapp: WHATSAPP,
  whatsappDigits: WHATSAPP.replace(/\D/g, ""),
  // Named the same way everywhere (JSON-LD, imprint, AI files): search and AI
  // engines match the person across the site and LinkedIn by this string.
  founder: "Jean-Pierre Médard-Garza",
  bookingUrl: "https://calendly.com/contact-studiopwi/30min",

  // The label doubles as the icon key (lowercased → data-icon in Footer).
  // TODO(jp): the LinkedIn URL is a guess at the company page slug — confirm
  // or replace before launch. Facebook and Instagram are the owner's own.
  // The JSON-LD sameAs list is read from here.
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/studiopwi" },
    { label: "Facebook", href: "https://www.facebook.com/studiopwi/" },
    { label: "Instagram", href: "https://www.instagram.com/studiopwi/" },
  ],

  // Track record and promises stated in the copy.
  sitesBuilt: 20,
  replyHours: 24,
  callMinutes: 30,
  supportDays: 14,
  auditsPerWeek: 5,
  auditDays: [1, 2],
  draftDays: [1, 3],
  // The process step's span, Launch's minimum to Business's maximum.
  buildWeeks: [1, 8],

  tiers: {
    showcase: { price: 1200, deposit: 25, weeks: [1, 3], pages: 3, languages: 1 },
    growth: { price: 2600, deposit: 35, weeks: [3, 4], pages: 5, languages: 2 },
    partnership: { price: 5200, deposit: 45, weeks: [4, 8], pages: 10, languages: 3 },
  },
  revisionRounds: 2,
  revisionHours: 72,

  care: {
    "care-essentiel": { price: 45, edits: 1 },
    "care-pro": { price: 90, edits: 3 },
    retainer: { price: 150, edits: 5 },
  },
  careMinMonths: 3,
  // The price list marks the SEO report "–" for Care Essentiel and prices it
  // at CHF 25 in the row label; read as an Essentiel add-on.
  seoReportAddon: 25,
  landingDiscount: 25,

  // À la carte prices the FAQ quotes (the list itself stays off the site).
  editPrice: [80, 250],
  copyPerPage: 100,
} as const satisfies {
  tiers: Record<ServiceTier, unknown>;
  care: Record<CarePlanId, unknown>;
  [key: string]: unknown;
};

/** The deposit/balance split, e.g. 25 → [25, 75]. */
export const split = (tier: ServiceTier) => {
  const deposit = facts.tiers[tier].deposit;
  return [deposit, 100 - deposit] as const;
};
