import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Hero from "@/components/sections/Hero";
import CaseStudies from "@/components/sections/CaseStudies";
import Services from "@/components/sections/Services";
import WhyUs from "@/components/sections/WhyUs";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import { LocalBusinessLd, WebPageLd } from "@/components/seo/JsonLd";

// Sections are plain imports again. They were wrapped in next/dynamic to keep
// each one's GSAP ScrollTrigger setup off the initial hydration pass, which was
// saturating the main thread on throttled mobile. The redesign removes every
// scroll-linked effect, so the sections are server components with no client
// bundle to split — only Header, ContactForm and the shared Reveal observer
// ship JavaScript at all.
export default function HomePage() {
  return (
    <>
      <WebPageLd />
      <LocalBusinessLd />
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero />
        <CaseStudies />
        <Services />
        <WhyUs />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
