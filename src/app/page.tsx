import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Services from "@/components/sections/Services";
import CaseStudies from "@/components/sections/CaseStudies";
import WhyUs from "@/components/sections/WhyUs";
import { site } from "@/content/site";

export default function HomePage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description:
      "Premium websites for Swiss landscapers. Niche-only studio.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rue de la Treille 2",
      postalCode: "2000",
      addressLocality: "Neuchâtel",
      addressCountry: "CH",
    },
    email: site.email,
    areaServed: "CH",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <Header />
      <main id="main">
        <Hero />
        {/* TODO: CredibilityBar — "Trusted by Swiss landscapers" logo strip */}
        <Problem />
        <Services />
        <CaseStudies />
        <WhyUs />
      </main>
      <Footer />
    </>
  );
}
