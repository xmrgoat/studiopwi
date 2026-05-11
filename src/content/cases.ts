export type CaseStudy = {
  slug: string;
  client: string;
  location: string;
  year: number;
  tag: string;
  image: { src: string; alt: string };
  challenge: string;
  solution: string;
  resultNumber: number;
  resultUnit: "%" | "x" | "";
  resultLabel: string;
  quote: string;
  attribution: { name: string; role: string };
};

export const cases = {
  marker: { number: "04", label: "SELECTED WORK" },
  headline: {
    before: "Three landscapers.\nThree different",
    accent: "roots.",
    after: "",
  },
  items: [
    {
      slug: "jardins-dupont",
      client: "Jardins Dupont",
      location: "Lausanne, VD",
      year: 2025,
      tag: "SHOWCASE SITE",
      image: {
        src: "/images/case-studies/dupont.webp",
        alt: "Editorial garden shot — Jardins Dupont",
      },
      challenge:
        "A family business with 30 years of work hidden in a folder.",
      solution:
        "Editorial portfolio site with seasonal photography rotation.",
      resultNumber: 180,
      resultUnit: "%",
      resultLabel: "qualified leads in 6 months",
      quote:
        "We finally have a site that looks like our gardens — not like everyone else's.",
      attribution: { name: "Marie Dupont", role: "Co-founder" },
    },
    {
      slug: "paysage-muller",
      client: "Paysage Müller",
      location: "Neuchâtel, NE",
      year: 2025,
      tag: "GROWTH SITE",
      image: {
        src: "/images/case-studies/muller.webp",
        alt: "Garden detail — Paysage Müller",
      },
      challenge:
        "New generation taking over, wanted to attract premium clients.",
      solution:
        "Editorial site with blog, SEO content strategy, before/after sliders.",
      resultNumber: 35,
      resultUnit: "%",
      resultLabel: "average project value uplift",
      quote:
        "I now spend less time chasing leads. The right ones come to us.",
      attribution: { name: "Lukas Müller", role: "Director" },
    },
    {
      slug: "vertch",
      client: "VertCH",
      location: "Geneva, GE",
      year: 2026,
      tag: "PARTNERSHIP",
      image: {
        src: "/images/case-studies/vertch.webp",
        alt: "Landscape architecture — VertCH",
      },
      challenge:
        "Strong reputation, weak digital presence. No time for marketing.",
      solution:
        "Full partnership: site + monthly content + Google Ads + seasonal shoots.",
      resultNumber: 12,
      resultUnit: "",
      resultLabel: "inbound qualified leads per month in 90 days",
      quote:
        "It feels like having a marketing team without the overhead.",
      attribution: { name: "Sophie Berger", role: "Owner" },
    },
  ] as const satisfies readonly CaseStudy[],
} as const;
