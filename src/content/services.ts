export type ServiceTier = "showcase" | "growth" | "partnership";

export type Service = {
  id: ServiceTier;
  tag: string;
  title: string;
  price: string;
  duration: string;
  description: string;
  features: readonly string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

export const services = {
  marker: { number: "03", label: "SERVICES" },
  headline: {
    before: "Three ways to",
    accent: "plant your roots",
    after: "online.",
  },
  intro:
    "Transparent pricing. Clear timelines. No surprises. Each package is built around what Swiss landscapers actually need to win local clients.",
  reassurance:
    "All packages include: 90-day satisfaction guarantee · CHF, no hidden fees · Swiss hosting · Single point of contact",
  tiers: [
    {
      id: "showcase",
      tag: "ESSENTIAL",
      title: "Showcase Site",
      price: "CHF 3,900",
      duration: "3 weeks",
      description:
        "A beautiful 5-page website built around your work. Mobile-first, fast, SEO-ready.",
      features: [
        "Custom design (no templates)",
        "5 core pages",
        "Local SEO foundations",
        "Contact form + Google Maps",
        "1-year hosting included",
      ],
      cta: { label: "Choose Showcase", href: "#contact?tier=showcase" },
    },
    {
      id: "growth",
      tag: "MOST POPULAR",
      title: "Growth Site",
      price: "CHF 5,900",
      duration: "5 weeks",
      description:
        "Everything in Showcase, plus a portfolio system, blog, and ongoing optimization for 3 months.",
      features: [
        "Portfolio with project pages",
        "Blog / journal",
        "Advanced local SEO",
        "Google Business Profile setup",
        "3 months optimization included",
      ],
      cta: { label: "Choose Growth", href: "#contact?tier=growth" },
      featured: true,
    },
    {
      id: "partnership",
      tag: "PARTNERSHIP",
      title: "Growth Partnership",
      price: "CHF 990 / month",
      duration: "Ongoing",
      description:
        "Your in-house digital team. Site, content, SEO, ads, photography — handled.",
      features: [
        "Everything in Growth",
        "Quarterly seasonal content shoots",
        "Monthly SEO + analytics report",
        "Google Ads management",
        "Priority support",
      ],
      cta: { label: "Talk to us", href: "#contact?tier=partnership" },
    },
  ] as const satisfies readonly Service[],
} as const;
