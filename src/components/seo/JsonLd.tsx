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

// Public profiles confirming the entity (Google/AI answer engines use these
// to disambiguate the brand).
const SAME_AS = ["https://www.linkedin.com/company/studiopwi/"] as const;

// Mirrors the cities named in the on-page copy (hero/problem/FAQ) so the
// structured data and the visible content claim the same service area.
const AREA_SERVED = [
  { "@type": "City", name: "Neuchâtel" },
  { "@type": "City", name: "Lausanne" },
  { "@type": "City", name: "Genève" },
  { "@type": "City", name: "Fribourg" },
  { "@type": "Country", name: "Switzerland" },
] as const;

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
    // /apple-icon is 180×180 — Google requires the logo to be ≥112×112
    // (the 32×32 /icon is too small for the logo rich result).
    logo: `${SITE_URL}/apple-icon`,
    email: site.email,
    address: ADDRESS,
    founder: { "@type": "Person", name: "Riff" },
    sameAs: SAME_AS,
    areaServed: AREA_SERVED,
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
      "Studio web spécialisé pour paysagistes suisses. Sites orientés conversion, demandes de devis qualifiées, support post-lancement inclus.",
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    priceRange: "CHF 600–3200",
    address: ADDRESS,
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.9926,
      longitude: 6.931,
    },
    email: site.email,
    sameAs: SAME_AS,
    areaServed: AREA_SERVED,
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
      const p = priceMap[tier.id] ?? { min: 0, max: 0 };
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
