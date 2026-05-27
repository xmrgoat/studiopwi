import { site } from "@/content/site";
import { services } from "@/content/services";

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

export function OffersLd() {
  const priceMap: Record<string, { min: number; max: number; unit?: string }> = {
    showcase: { min: 600, max: 1200 },
    growth: { min: 1400, max: 3200 },
    partnership: { min: 990, max: 990, unit: "month" },
  };
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.tiers.map((tier, i) => {
      const p = priceMap[tier.id];
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Offer",
          "@id": `${SITE_URL}/#offer-${tier.id}`,
          name: tier.title,
          description: tier.description,
          price: p.min,
          priceCurrency: "CHF",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: p.min,
            maxPrice: p.max,
            priceCurrency: "CHF",
            ...(p.unit ? { unitCode: p.unit } : {}),
          },
          seller: { "@id": BUSINESS_ID },
          url: `${SITE_URL}/#services`,
        },
      };
    }),
  };
  return <Ld data={data} />;
}

export function VideoObjectLd() {
  const video = site.hero.video;
  const data = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${SITE_URL}/#video-hero`,
    name: video.title,
    description: video.description,
    thumbnailUrl: `${SITE_URL}${video.poster}`,
    contentUrl: `${SITE_URL}${video.src}`,
    uploadDate: "2026-01-15",
    inLanguage: "fr-CH",
    isPartOf: { "@id": WEBPAGE_ID },
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
