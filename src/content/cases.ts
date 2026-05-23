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
    before: "Un paysagiste.\nUne",
    accent: "histoire réelle.",
    after: "",
  },
  items: [
    {
      slug: "colorado-eco-garden",
      client: "Colorado Eco Garden",
      location: "Colorado, États-Unis",
      year: 2026,
      tag: "LANDING PAGE",
      image: {
        src: "/images/case-studies/colorado-eco-garden.webp",
        alt: "Jardin écologique natif — Colorado Eco Garden",
      },
      siteUrl: "https://jimmi-eco-garden.vercel.app/",
      inProduction: true,
      challenge:
        "Zéro site, zéro présence en ligne — une entreprise qui venait de lancer et avait besoin de clients dès le premier jour.",
      solution:
        "Landing page de conversion avec tunnel de devis gratuit et trois paliers de prix transparents.",
      quote: "",
      attribution: { name: "", role: "" },
    },
  ] as const satisfies readonly CaseStudy[],
} as const;
