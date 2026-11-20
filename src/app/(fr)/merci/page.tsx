import type { Metadata } from "next";
import ThanksPage from "@/components/pages/ThanksPage";
import { getDictionary } from "@/content";

// The contact form navigates here after a successful send, so every page view
// of /merci in Vercel Analytics is one French lead (English: /en/thank-you).
// Kept out of the index and the sitemap: a search visit would count as a lead.
export const metadata: Metadata = {
  title: getDictionary("fr").site.thanks.title,
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ThanksPage locale="fr" kind="contact" />;
}
