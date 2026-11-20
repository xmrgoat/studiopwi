import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Hero from "@/components/sections/Hero";
import CaseStudies from "@/components/sections/CaseStudies";
import Services from "@/components/sections/Services";
import WhyUs from "@/components/sections/WhyUs";
import Process from "@/components/sections/Process";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import { FaqLd, LocalBusinessLd, WebPageLd } from "@/components/seo/JsonLd";
import type { Locale } from "@/i18n/locales";

// The homepage, in either language (app/(fr)/page.tsx at /, app/(en)/en/
// page.tsx at /en). The sections are server components with no client
// bundle to split — only Header, ContactForm and the shared Reveal observer
// ship JavaScript at all.
export default function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <WebPageLd locale={locale} />
      <LocalBusinessLd locale={locale} />
      <FaqLd locale={locale} />
      <ScrollProgress />
      <Header locale={locale} />
      <main id="main">
        <Hero locale={locale} />
        <CaseStudies locale={locale} />
        <Services locale={locale} />
        <WhyUs locale={locale} />
        <Process locale={locale} />
        <Faq locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} onHome />
    </>
  );
}
