import type { Metadata } from "next";
import ThanksPage from "@/components/pages/ThanksPage";
import { getDictionary } from "@/content";

// The English audit form lands here: each page view of /en/thank-you-audit
// is one English audit request (French: /merci-audit). Same rules as the
// other thank-you pages: noindex, no sitemap, linked from nowhere.
export const metadata: Metadata = {
  title: getDictionary("en").site.auditThanks.title,
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ThanksPage locale="en" kind="audit" />;
}
