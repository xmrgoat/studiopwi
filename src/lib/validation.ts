import { z } from "zod";
import { isLocale, type Locale } from "@/i18n/locales";

// The messages a visitor can see when a field is wrong, in the language of
// the form they used. The API routes read `locale` from the request first
// (requestLocale), then validate with that language's schema.
const MESSAGES = {
  fr: {
    nameRequired: "Indiquez votre nom",
    nameShort: "Nom trop court",
    companyRequired: "Indiquez le nom de votre entreprise",
    emailRequired: "Indiquez votre email",
    emailInvalid: "Email invalide",
    messageShort: "Message trop court",
    siteRequired: "Indiquez votre site, ou cochez « Pas encore de site »",
  },
  en: {
    nameRequired: "Please enter your name",
    nameShort: "Name is too short",
    companyRequired: "Please enter your company name",
    emailRequired: "Please enter your email",
    emailInvalid: "Invalid email address",
    messageShort: "Message is too short",
    siteRequired: "Enter your website, or tick “No website yet”",
  },
} as const satisfies Record<Locale, Record<string, string>>;

/** The form's language, from the raw request body; French by default. */
export function requestLocale(json: unknown): Locale {
  const value = (json as { locale?: unknown } | null)?.locale;
  return isLocale(value) ? value : "fr";
}

export function contactSchemaFor(locale: Locale) {
  const m = MESSAGES[locale];
  return z.object({
    name: z.string({ required_error: m.nameRequired }).trim().min(2, m.nameShort).max(120),
    email: z.string({ required_error: m.emailRequired }).trim().email(m.emailInvalid).max(200),
    // Free-form: Swiss numbers get written 076 612 27 41, +41 76 612 27 41 and
    // several other ways, and rejecting a real number loses a lead.
    phone: z.string().trim().max(40).optional(),
    company: z.string().trim().max(120).optional(),
    currentSite: z.string().trim().max(300).optional(),
    message: z.string().trim().min(10, m.messageShort).max(4000),
    tier: z.enum(["showcase", "growth", "partnership"]).optional(),
    source: z
      .enum(["hero", "services", "final-cta", "direct", "contact"])
      .default("direct"),
    locale: z.enum(["fr", "de", "en"]).default("fr"),
    // Honeypot. Deliberately permissive: the route inspects this field and
    // answers a silent 200 so the bot believes it succeeded. Constraining it to
    // max(0) here made zod reject first, which returned a 422 naming `website`
    // as the offending field — telling the bot precisely which input to leave
    // empty next time, and leaving the route's honeypot branch unreachable.
    website: z.string().optional(),
  });
}

export type ContactInput = z.infer<ReturnType<typeof contactSchemaFor>>;

// The free audit + homepage draft request (ui/AuditForm, first in the
// contact section). `site` is free text, not a URL: visitors type
// "monsite.ch" without a scheme. Firms with no site yet tick `noSite`, and
// the work starts from their company's Google listing instead.
export function auditSchemaFor(locale: Locale) {
  const m = MESSAGES[locale];
  return z
    .object({
      name: z.string({ required_error: m.nameRequired }).trim().min(2, m.nameShort).max(120),
      company: z
        .string({ required_error: m.companyRequired })
        .trim()
        .min(2, m.companyRequired)
        .max(160),
      site: z.string().trim().max(300).default(""),
      noSite: z.boolean().default(false),
      email: z.string({ required_error: m.emailRequired }).trim().email(m.emailInvalid).max(200),
      locale: z.enum(["fr", "de", "en"]).default("fr"),
      // Honeypot, permissive for the same reason as the contact schema's.
      website: z.string().optional(),
    })
    .refine((d) => d.noSite || d.site.length >= 3, {
      path: ["site"],
      message: m.siteRequired,
    });
}

export type AuditInput = z.infer<ReturnType<typeof auditSchemaFor>>;
