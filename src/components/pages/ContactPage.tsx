import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";
import Faq from "@/components/sections/Faq";
import { ContactPageLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/content";
import type { Locale } from "@/i18n/locales";

// The homepage's contact section as a page of its own (Figma "Contact —
// 1440"), followed by a short FAQ. Same components, not copies: the forms
// and the booking block stay identical in both places. The FAQ shows only
// the questions that matter before getting in touch (site.contactPage.faq)
// and links to the full list on the homepage, so the page doesn't repeat
// it. The FAQPage schema stays on the homepage only, where its @id lives.
export default function ContactPage({ locale }: { locale: Locale }) {
  const { site } = getDictionary(locale);
  return (
    <>
      <ContactPageLd locale={locale} />
      <Header locale={locale} />
      <main id="main">
        <Contact locale={locale} page />
        <Faq
          locale={locale}
          questions={site.contactPage.faq.questions}
          more={site.contactPage.faq.more}
        />
      </main>
      <Footer locale={locale} />
    </>
  );
}
