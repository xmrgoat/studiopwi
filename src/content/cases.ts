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
      slug: "colorado-eco-garden",
      client: "Colorado Eco Garden",
      location: "Colorado, États-Unis",
      year: 2026,
      tag: "LANDING PAGE",
      image: {
        src: "/images/case-studies/colorado-eco-garden.webp",
        alt: "Jardin écologique natif — Colorado Eco Garden",
      },
      challenge:
        "Zéro site, zéro présence en ligne — une entreprise qui venait de lancer et avait besoin de clients dès le premier jour.",
      solution:
        "Landing page de conversion avec tunnel de devis gratuit, galerie de réalisations natives et trois paliers de prix transparents.",
      resultNumber: 65,
      resultUnit: "%",
      resultLabel: "réduction d'eau dès la première saison",
      quote:
        "We cut our water bill in half and our neighbors keep asking who did our yard. Best decision we've made for our home.",
      attribution: { name: "Sarah M.", role: "Cliente — Colorado Eco Garden" },
    },
  ] as const satisfies readonly CaseStudy[],
} as const;
