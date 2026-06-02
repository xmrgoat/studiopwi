import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Hero from "@/components/sections/Hero";

// Only Hero is eagerly loaded. Every other section is server-rendered (ssr
// defaults to true, so SEO/content/LCP markup is unchanged) but its client
// chunk + GSAP ScrollTrigger setup hydrates lazily, off the first-paint
// critical path. Each section's mount runs a synchronous ScrollTrigger layout
// pass; doing all of them at once during initial hydration saturated the main
// thread and delayed first paint on throttled mobile. Keeping Problem dynamic
// too means GSAP is never imported by the eager bundle at all.
const Problem = dynamic(() => import("@/components/sections/Problem"));
const Services = dynamic(() => import("@/components/sections/Services"));
const CaseStudies = dynamic(() => import("@/components/sections/CaseStudies"));
const WhyUs = dynamic(() => import("@/components/sections/WhyUs"));
const Contact = dynamic(() => import("@/components/sections/Contact"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const CTABanner = dynamic(() => import("@/components/sections/CTABanner"));
const Footer = dynamic(() => import("@/components/layout/Footer"));
import {
  LocalBusinessLd,
  FaqLd,
  WebPageLd,
  OffersLd,
  VideoObjectLd,
} from "@/components/seo/JsonLd";

export default function HomePage() {
  return (
    <>
      <WebPageLd />
      <LocalBusinessLd />
      <FaqLd />
      <OffersLd />
      <VideoObjectLd />
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero />
        {/* TODO: CredibilityBar — "Trusted by Swiss landscapers" logo strip */}
        <Problem />
        <Services />
        <CaseStudies />
        <WhyUs />
        <Contact />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
