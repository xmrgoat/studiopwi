import type { Metadata } from "next";
import ThanksPage from "@/components/pages/ThanksPage";
import { getDictionary } from "@/content";

// The audit form navigates here after a successful send, so each page view
// is one French audit request in Vercel Analytics, counted apart from /merci
// (English: /en/thank-you-audit). Out of the index and the sitemap, and
// linked from nowhere else.
export const metadata: Metadata = {
  title: getDictionary("fr").site.auditThanks.title,
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ThanksPage locale="fr" kind="audit" />;
}
