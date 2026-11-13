import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(120),
  email: z.string().trim().email("Email invalide").max(200),
  // Free-form: Swiss numbers get written 076 612 27 41, +41 76 612 27 41 and
  // several other ways, and rejecting a real number loses a lead.
  phone: z.string().trim().max(40).optional(),
  company: z.string().trim().max(120).optional(),
  currentSite: z.string().trim().max(300).optional(),
  message: z.string().trim().min(10, "Message trop court").max(4000),
  tier: z.enum(["showcase", "growth", "partnership"]).optional(),
  // "contact" was missing here while ContactForm has been sending it from the
  // contact section — every submission from the main form failed validation
  // with a 422.
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

export type ContactInput = z.infer<typeof contactSchema>;

// The free audit + homepage draft request (ui/AuditForm, first in the
// contact section). `site` is free text, not a URL: visitors type
// "monsite.ch" without a scheme. Firms with no site yet tick `noSite`, and
// the work starts from their company's Google listing instead.
export const auditSchema = z
  .object({
    name: z.string().trim().min(2, "Nom trop court").max(120),
    company: z.string().trim().min(2, "Indiquez le nom de votre entreprise").max(160),
    site: z.string().trim().max(300).default(""),
    noSite: z.boolean().default(false),
    email: z.string().trim().email("Email invalide").max(200),
    locale: z.enum(["fr", "de", "en"]).default("fr"),
    // Honeypot, permissive for the same reason as contactSchema's.
    website: z.string().optional(),
  })
  .refine((d) => d.noSite || d.site.length >= 3, {
    path: ["site"],
    message: "Indiquez votre site, ou cochez « Pas encore de site »",
  });

export type AuditInput = z.infer<typeof auditSchema>;
