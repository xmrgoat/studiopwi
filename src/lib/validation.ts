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

export const newsletterSchema = z.object({
  email: z.string().trim().email("Email invalide").max(200),
  locale: z.enum(["fr", "de", "en"]).default("fr"),
  source: z.string().max(60).optional(),
  // Honeypot — see the note on contactSchema.website
  website: z.string().optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
