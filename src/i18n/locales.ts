// The site's two languages. French is the default and lives at the root with
// no prefix (/, /contact, …); English lives under /en. Each language has its
// own root layout — app/(fr)/layout.tsx and app/(en)/layout.tsx — so every
// page carries the right <html lang> without middleware, and every French
// URL stays exactly where it was before English existed.

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export function isLocale(value: unknown): value is Locale {
  return value === "fr" || value === "en";
}

/** The <html lang> value. */
export const htmlLang: Record<Locale, string> = { fr: "fr-CH", en: "en" };

/** schema.org inLanguage (BCP 47). */
export const contentLanguage: Record<Locale, string> = { fr: "fr-CH", en: "en" };

/** Open Graph og:locale. en_US: the largest English-speaking landscaping
    market, and the English case study (Jimi Builds) is in Colorado. */
export const ogLocale: Record<Locale, string> = { fr: "fr_CH", en: "en_US" };

/** hreflang codes. Plain "fr", not "fr-CH": the studio also serves French
    speakers outside Switzerland. */
export const hreflang: Record<Locale, string> = { fr: "fr", en: "en" };

/** The other language — the target of the header's language switcher. */
export const otherLocale = (locale: Locale): Locale => (locale === "fr" ? "en" : "fr");
