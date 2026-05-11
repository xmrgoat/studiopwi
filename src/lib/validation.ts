import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(120),
  email: z.string().trim().email("Email invalide").max(200),
  company: z.string().trim().max(120).optional(),
  message: z.string().trim().min(10, "Message trop court").max(4000),
  tier: z.enum(["showcase", "growth", "partnership"]).optional(),
  source: z.enum(["hero", "services", "final-cta", "direct"]).default("direct"),
  locale: z.enum(["fr", "de", "en"]).default("fr"),
  // Honeypot — must remain empty
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("Email invalide").max(200),
  locale: z.enum(["fr", "de", "en"]).default("fr"),
  source: z.string().max(60).optional(),
  // Honeypot
  website: z.string().max(0).optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
