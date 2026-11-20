import type { Locale } from "@/i18n/locales";

/**
 * Prices as each audience writes them: Swiss French "CHF 2'600" (as on the
 * price list), English "CHF 2,600".
 */
export function chf(amount: number, locale: Locale = "fr"): string {
  const separator = locale === "fr" ? "'" : ",";
  return `CHF ${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, separator)}`;
}
