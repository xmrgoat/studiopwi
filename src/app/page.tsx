import Header from "@/components/layout/Header";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Services from "@/components/sections/Services";
import CaseStudies from "@/components/sections/CaseStudies";
import WhyUs from "@/components/sections/WhyUs";
import FAQ from "@/components/sections/FAQ";
import CTABanner from "@/components/sections/CTABanner";
import {
  LocalBusinessLd,
  FaqLd,
  WebPageLd,
} from "@/components/seo/JsonLd";

export default function HomePage() {
  return (
    <>
      <WebPageLd />
      <LocalBusinessLd />
      <FaqLd />
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero />
        {/* TODO: CredibilityBar — "Trusted by Swiss landscapers" logo strip */}
        <Problem />
        <Services />
        <CaseStudies />
        <WhyUs />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
