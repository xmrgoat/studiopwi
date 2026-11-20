import type { Metadata } from "next";
import ThanksPage from "@/components/pages/ThanksPage";
import { getDictionary } from "@/content";

// The English contact form lands here after a successful send: each page
// view of /en/thank-you in Vercel Analytics is one English lead (French:
// /merci). Out of the index and the sitemap, linked from nowhere else.
export const metadata: Metadata = {
  title: getDictionary("en").site.thanks.title,
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ThanksPage locale="en" kind="contact" />;
}
