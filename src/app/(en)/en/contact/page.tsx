import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { getDictionary } from "@/content";
import { pageMetadata } from "@/i18n/metadata";
import { routes } from "@/i18n/routes";

const { site } = getDictionary("en");

export const metadata: Metadata = pageMetadata({
  locale: "en",
  paths: routes.contact,
  title: site.contactPage.seo.title,
  description: site.contactPage.seo.description,
});

export default function Page() {
  return <ContactPage locale="en" />;
}
