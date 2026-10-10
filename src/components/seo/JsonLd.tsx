import { site } from "@/content/site";
import { services, chf, type Service, type CarePlan } from "@/content/services";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.studiopwi.com";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBPAGE_ID = `${SITE_URL}/#webpage`;

const ADDRESS = {
  "@type": "PostalAddress",
  // No street: the studio serves clients remotely and on site, and its Google
  // Business Profile is a service-area listing with a hidden address. The
  // street is published on the legal pages, where the imprint needs it.
  postalCode: "2017",
  addressLocality: "Boudry",
  addressRegion: "NE",
  addressCountry: "CH",
} as const;

// Public profiles confirming the entity (Google/AI answer engines use these
// to disambiguate the brand).
const SAME_AS = ["https://www.linkedin.com/company/studiopwi/"] as const;

// The Romandie cities the studio serves. Since the problem and FAQ sections
// were removed, only Neuchâtel is named on the page itself; areaServed feeds
// no rich result, so the wider list states the service area for local and AI
// answers without contradicting anything the copy says.
const AREA_SERVED = [
  { "@type": "City", name: "Neuchâtel" },
  { "@type": "City", name: "Lausanne" },
  { "@type": "City", name: "Genève" },
  { "@type": "City", name: "Fribourg" },
  { "@type": "Country", name: "Switzerland" },
] as const;

const DESCRIPTION =
  "Studio web spécialisé pour paysagistes suisses. Sites orientés conversion, demandes de devis qualifiées, support post-lancement inclus.";

const KNOWS_ABOUT = [
  "Création de sites web",
  "Référencement local (SEO)",
  "Paysagisme",
] as const;

const TIER_PRICES = (services.tiers as readonly Service[]).map((t) => t.price);

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
    description: DESCRIPTION,
    slogan: site.tagline,
    email: site.email,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      availableLanguage: "French",
      areaServed: "CH",
    },
    address: ADDRESS,
    founder: { "@type": "Person", name: "Riff" },
    sameAs: SAME_AS,
    areaServed: AREA_SERVED,
    knowsAbout: KNOWS_ABOUT,
    knowsLanguage: "fr",
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
    description: DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    // Prices are visible on the service cards, so the range may be stated.
    priceRange: `${chf(Math.min(...TIER_PRICES))} – ${chf(Math.max(...TIER_PRICES))}`,
    address: ADDRESS,
    email: site.email,
    sameAs: SAME_AS,
    areaServed: AREA_SERVED,
    founder: { "@type": "Person", name: "Riff" },
    parentOrganization: { "@id": ORG_ID },
    knowsAbout: KNOWS_ABOUT,
    knowsLanguage: "fr",
    // What the studio sells, so search and AI answers can name the offers
    // and their prices. Every price here is shown on the page (#services) —
    // Google requires Offer price markup to match the visible price.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: services.headline,
      itemListElement: [
        ...(services.tiers as readonly Service[]).map((tier) => ({
          "@type": "Offer",
          url: `${SITE_URL}/#services`,
          price: tier.price,
          priceCurrency: "CHF",
          itemOffered: {
            "@type": "Service",
            name: `Offre ${tier.title} — site web pour paysagistes`,
            description: tier.description,
            serviceType: "Création de site web",
            provider: { "@id": BUSINESS_ID },
            areaServed: { "@type": "Country", name: "Switzerland" },
          },
        })),
        ...(services.care.plans as readonly CarePlan[]).map((plan) => ({
          "@type": "Offer",
          url: `${SITE_URL}/#services`,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: plan.price,
            priceCurrency: "CHF",
            unitCode: "MON",
            unitText: "mois",
          },
          itemOffered: {
            "@type": "Service",
            name: `${plan.title} — maintenance de site web`,
            description: plan.features.join(" · "),
            serviceType: "Maintenance de site web",
            provider: { "@id": BUSINESS_ID },
          },
        })),
      ],
    },
  };
  return <Ld data={data} />;
}

export function WebPageLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": WEBPAGE_ID,
    url: SITE_URL,
    name: `${site.seo.title} · ${site.name}`,
    description: site.seo.description,
    inLanguage: "fr-CH",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
    primaryImageOfPage: `${SITE_URL}/opengraph-image`,
    // No speakable: cssSelector targets literal class names, but every
    // component here uses CSS Modules — the rendered class is a hashed name
    // like Hero_lead__a1b2c, never the literal ".lead" this used to declare.
    // The previous selector matched nothing in the actual DOM.
  };
  return <Ld data={data} />;
}
