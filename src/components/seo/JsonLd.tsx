import { chf, getDictionary, type CarePlan, type Project, type Service } from "@/content";
import { contentLanguage, locales, type Locale } from "@/i18n/locales";
import { SITE_URL, ogImagePath } from "@/i18n/metadata";
import { projectPath, routes } from "@/i18n/routes";

// One graph, two languages. The entities — the organization, the website,
// the business and its founder — keep a single @id, so Google and AI answer
// engines see one studio whichever language they crawl. Each page has its
// own @id per language, and an English page points at its French original
// with translationOfWork.

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const BUSINESS_ID = `${SITE_URL}/#business`;
const FOUNDER_ID = `${SITE_URL}/#founder`;

/** Absolute URL of a path: "/" → the bare site URL, as before. */
const abs = (path: string) => (path === "/" ? SITE_URL : `${SITE_URL}${path}`);
const homeUrl = (locale: Locale) => abs(routes.home[locale]);
/** A homepage fragment: "https://…/#services", "https://…/en#services". */
const anchor = (locale: Locale, id: string) => `${SITE_URL}${locale === "fr" ? "/" : routes.home.en}#${id}`;
const webpageId = (locale: Locale) => anchor(locale, "webpage");

const LANGUAGES = locales.map((l) => contentLanguage[l]);

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

function founder(locale: Locale) {
  const { site } = getDictionary(locale);
  return {
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: site.founder,
    jobTitle: site.schema.founderTitle,
    worksFor: { "@id": ORG_ID },
  };
}

// The Romandie cities the studio serves (site.schema.cities). areaServed
// feeds no rich result, so the wider list states the service area for local
// and AI answers without contradicting anything the copy says.
function areaServed(locale: Locale) {
  return [
    ...getDictionary(locale).site.schema.cities.map((name) => ({ "@type": "City", name })),
    { "@type": "Country", name: "Switzerland" },
  ];
}

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

export function OrganizationLd({ locale }: { locale: Locale }) {
  const { site } = getDictionary(locale);
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    url: SITE_URL,
    // /apple-icon is 180×180 — Google requires the logo to be ≥112×112
    // (the 32×32 /icon is too small for the logo rich result).
    logo: `${SITE_URL}/apple-icon`,
    description: site.schema.description,
    slogan: site.tagline,
    email: site.email,
    // The WhatsApp Business number, shown in the footer and stated the same
    // way on the Google Business Profile.
    telephone: site.whatsapp.number,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      telephone: site.whatsapp.number,
      availableLanguage: ["French", "English"],
      areaServed: "CH",
    },
    address: ADDRESS,
    founder: founder(locale),
    // Public profiles confirming the entity, read from the footer's social
    // links, so the profiles the page shows and the schema claims can't drift.
    sameAs: site.footer.social.map((profile) => profile.href),
    areaServed: areaServed(locale),
    knowsAbout: site.schema.knowsAbout,
    knowsLanguage: ["fr", "en"],
  };
  return <Ld data={data} />;
}

export function WebSiteLd({ locale }: { locale: Locale }) {
  const { site } = getDictionary(locale);
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: site.name,
    inLanguage: LANGUAGES,
    publisher: { "@id": ORG_ID },
  };
  return <Ld data={data} />;
}

export function LocalBusinessLd({ locale }: { locale: Locale }) {
  const { site, services } = getDictionary(locale);
  const tiers = services.tiers as readonly Service[];
  const plans = services.care.plans as readonly CarePlan[];
  const prices = tiers.map((t) => t.price);
  const offersUrl = anchor(locale, site.ids.services);
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: site.name,
    description: site.schema.description,
    url: homeUrl(locale),
    image: abs(ogImagePath[locale]),
    // Prices are visible on the service cards, so the range may be stated.
    priceRange: `${chf(Math.min(...prices), locale)} – ${chf(Math.max(...prices), locale)}`,
    address: ADDRESS,
    email: site.email,
    telephone: site.whatsapp.number,
    sameAs: site.footer.social.map((profile) => profile.href),
    areaServed: areaServed(locale),
    founder: { "@id": FOUNDER_ID },
    parentOrganization: { "@id": ORG_ID },
    knowsAbout: site.schema.knowsAbout,
    knowsLanguage: ["fr", "en"],
    // What the studio sells, so search and AI answers can name the offers
    // and their prices. Every price here is shown on the page (#services) —
    // Google requires Offer price markup to match the visible price.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: services.headline,
      itemListElement: [
        ...tiers.map((tier) => ({
          "@type": "Offer",
          url: offersUrl,
          price: tier.price,
          priceCurrency: "CHF",
          itemOffered: {
            "@type": "Service",
            name: services.schema.tierName(tier.title),
            description: tier.description,
            serviceType: services.schema.tierType,
            provider: { "@id": BUSINESS_ID },
            areaServed: { "@type": "Country", name: "Switzerland" },
          },
        })),
        ...plans.map((plan) => ({
          "@type": "Offer",
          url: offersUrl,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: plan.price,
            priceCurrency: "CHF",
            unitCode: "MON",
            unitText: services.schema.month,
          },
          itemOffered: {
            "@type": "Service",
            name: services.schema.careName(plan.title),
            description: plan.features.join(" · "),
            serviceType: services.schema.careType,
            provider: { "@id": BUSINESS_ID },
          },
        })),
      ],
    },
  };
  return <Ld data={data} />;
}

// Mirrors the FAQ section question for question — FAQPage markup is only
// valid for Q&A visible on the page. Google limits FAQ rich results to a few
// authoritative sites, so the value here is for AI answer engines.
export function FaqLd({ locale }: { locale: Locale }) {
  const { site } = getDictionary(locale);
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": anchor(locale, site.ids.faq),
    inLanguage: contentLanguage[locale],
    isPartOf: { "@id": webpageId(locale) },
    mainEntity: site.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return <Ld data={data} />;
}

/** On an English page: "this is a translation of the French one". */
const translationOf = (locale: Locale, frenchPageId: string) =>
  locale === "fr" ? {} : { translationOfWork: { "@id": frenchPageId } };

export function WebPageLd({ locale }: { locale: Locale }) {
  const { site } = getDictionary(locale);
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": webpageId(locale),
    url: homeUrl(locale),
    name: `${site.seo.title} · ${site.name}`,
    description: site.seo.description,
    inLanguage: contentLanguage[locale],
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
    primaryImageOfPage: abs(ogImagePath[locale]),
    ...translationOf(locale, webpageId("fr")),
    // No speakable: cssSelector targets literal class names, but every
    // component here uses CSS Modules — the rendered class is a hashed name
    // like Hero_lead__a1b2c, never the literal ".lead" this used to declare.
  };
  return <Ld data={data} />;
}

// /contact and /en/contact: a ContactPage about the business, joined to the
// sitewide graph.
export function ContactPageLd({ locale }: { locale: Locale }) {
  const { site } = getDictionary(locale);
  const url = abs(routes.contact[locale]);
  const data = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${url}#webpage`,
    url,
    name: `${site.contactPage.seo.title} · ${site.name}`,
    description: site.contactPage.seo.description,
    inLanguage: contentLanguage[locale],
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
    ...translationOf(locale, `${abs(routes.contact.fr)}#webpage`),
  };
  return <Ld data={data} />;
}

// A portfolio page: the page itself, joined to the sitewide graph by @id, and
// the client site it presents, credited to the studio. No Review markup for
// the client quote — Google ignores reviews a business publishes about itself.
export function ProjectPageLd({ locale, project }: { locale: Locale; project: Project }) {
  const { site } = getDictionary(locale);
  const url = abs(projectPath(locale, project.slug));
  const image = `${SITE_URL}${project.shots.desktop.src}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: `${project.seo.title} · ${site.name}`,
    description: project.seo.description,
    inLanguage: contentLanguage[locale],
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    primaryImageOfPage: image,
    about: {
      "@type": "WebSite",
      name: project.client,
      url: project.site.url,
      creator: { "@id": BUSINESS_ID },
      image,
    },
    ...translationOf(locale, `${abs(projectPath("fr", project.slug))}#webpage`),
  };
  return <Ld data={data} />;
}
