import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";

// Below-the-fold sections are still server-rendered (ssr defaults to true, so
// SEO/content/LCP markup is unchanged) but their client chunks + GSAP
// ScrollTrigger setup hydrate lazily, off the first-paint critical path.
// Each section's mount runs a synchronous ScrollTrigger layout pass; doing all
// eight at once during initial hydration was saturating the main thread and
// delaying first paint on throttled mobile.
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
