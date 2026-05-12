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
    before: "Trois paysagistes.\nTrois",
    accent: "histoires différentes.",
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
    {
      slug: "paysage-muller",
      client: "Paysage Müller",
      location: "Neuchâtel, NE",
      year: 2025,
      tag: "SITE CROISSANCE",
      image: {
        src: "/images/case-studies/muller.webp",
        alt: "Détail de jardin — Paysage Müller",
      },
      challenge:
        "Nouvelle génération reprenant les rênes, souhaitait attirer une clientèle premium.",
      solution:
        "Site éditorial avec blog, stratégie de contenu SEO, sliders avant/après.",
      resultNumber: 35,
      resultUnit: "%",
      resultLabel: "d'augmentation de la valeur moyenne des projets",
      quote:
        "Je passe moins de temps à courir après les leads. Les bons viennent à nous.",
      attribution: { name: "Lukas Müller", role: "Directeur" },
    },
    {
      slug: "vertch",
      client: "VertCH",
      location: "Genève, GE",
      year: 2026,
      tag: "PARTENARIAT",
      image: {
        src: "/images/case-studies/vertch.webp",
        alt: "Architecture paysagère — VertCH",
      },
      challenge:
        "Solide réputation, faible présence digitale. Pas le temps pour le marketing.",
      solution:
        "Partenariat complet : site + contenus mensuels + Google Ads + shootings saisonniers.",
      resultNumber: 12,
      resultUnit: "",
      resultLabel: "leads qualifiés entrants par mois en 90 jours",
      quote:
        "C'est comme avoir une équipe marketing sans les contraintes.",
      attribution: { name: "Sophie Berger", role: "Propriétaire" },
    },
  ] as const satisfies readonly CaseStudy[],
} as const;
