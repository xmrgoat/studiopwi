export type CaseStudy = {
  slug: string;
  client: string;
  location: string;
  year: number;
  tag: string;
  image: { src: string; alt: string };
  siteUrl?: string;
  inProduction?: boolean;
  challenge: string;
  solution: string;
  resultNumber?: number;
  resultUnit?: "%" | "x" | "";
  resultLabel?: string;
  quote: string;
  attribution: { name: string; role: string };
};

export const cases = {
  marker: { number: "04", label: "RÉALISATIONS" },
  headline: {
    before: "Un projet paysagiste,\n",
    accent: "Une présence en ligne.",
    after: "conçue pour convertir.",
  },
  items: [
    {
      slug: "colorado-eco-garden",
      client: "Colorado Eco Garden",
      location: "Colorado, États-Unis",
      year: 2026,
      tag: "",
      image: {
        src: "/images/case-studies/colorado-eco-garden.webp",
        alt: "Jardin écologique natif — Colorado Eco Garden",
      },
      siteUrl: "https://jimmi-eco-garden.vercel.app/",
      inProduction: true,
      challenge:
        "Une entreprise récemment lancée, sans site web ni présence en ligne structurée.",
      solution:
        "Une landing page conçue pour présenter l'offre, rassurer les visiteurs et faciliter les demandes de devis.",
      quote: "",
      attribution: { name: "", role: "" },
    },
  ] as const satisfies readonly CaseStudy[],
} as const;
