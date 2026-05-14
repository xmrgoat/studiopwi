import { site } from "@/content/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://studiopwi.com";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBPAGE_ID = `${SITE_URL}/#webpage`;

const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Rue de la Treille 2",
  postalCode: "2000",
  addressLocality: "Neuchâtel",
  addressCountry: "CH",
} as const;

function serialize(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function Ld({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}

export function OrganizationLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    url: SITE_URL,
    logo: `${SITE_URL}/icon`,
    email: site.email,
    address: ADDRESS,
    founder: { "@type": "Person", name: "Riff" },
    areaServed: { "@type": "Country", name: "Switzerland" },
  };
  return <Ld data={data} />;
}

export function WebSiteLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: site.name,
    inLanguage: "fr-CH",
    publisher: { "@id": ORG_ID },
  };
  return <Ld data={data} />;
}

export function LocalBusinessLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: site.name,
    description:
      "Studio web spécialisé pour paysagistes suisses. Sites orientés conversion, demandes de devis qualifiées, garantie 90 jours.",
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    priceRange: "CHF 600–3200",
    address: ADDRESS,
    email: site.email,
    areaServed: { "@type": "Country", name: "Switzerland" },
    founder: { "@type": "Person", name: "Riff" },
    parentOrganization: { "@id": ORG_ID },
  };
  return <Ld data={data} />;
}

export function FaqLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: site.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
  return <Ld data={data} />;
}

export function WebPageLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": WEBPAGE_ID,
    url: SITE_URL,
    name: `${site.name} — Sites web pour paysagistes suisses`,
    inLanguage: "fr-CH",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
    primaryImageOfPage: `${SITE_URL}/opengraph-image`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".lead"],
    },
  };
  return <Ld data={data} />;
}
