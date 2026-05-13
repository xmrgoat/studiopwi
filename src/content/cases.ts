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
  marker: { number: "04", label: "RÉALISATIONS" },
  headline: {
    before: "Un paysagiste.\nUne",
    accent: "histoire réelle.",
    after: "",
  },
  items: [
    {
      slug: "jardins-dupont",
      client: "Jardins Dupont",
      location: "Lausanne, VD",
      year: 2025,
      tag: "SITE VITRINE",
      image: {
        src: "/images/case-studies/dupont.webp",
        alt: "Photo éditoriale de jardin — Jardins Dupont",
      },
      challenge:
        "Une entreprise familiale avec 30 ans de réalisations cachées dans un dossier.",
      solution:
        "Site portfolio éditorial avec rotation saisonnière de photographies.",
      resultNumber: 180,
      resultUnit: "%",
      resultLabel: "leads qualifiés en 6 mois",
      quote:
        "On a enfin un site qui ressemble à nos jardins — pas à celui de tout le monde.",
      attribution: { name: "Marie Dupont", role: "Co-fondatrice" },
    },
  ] as const satisfies readonly CaseStudy[],
} as const;
