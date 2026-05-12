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
    before: "Trois façons de",
    accent: "planter vos racines",
    after: "en ligne.",
  },
  intro:
    "Des offres claires, pensées pour les paysagistes suisses qui veulent plus de visibilité, plus de confiance et plus de demandes de chantier.",
  reassurance:
    "Toutes les formules incluent : garantie satisfaction 90 jours · CHF, sans frais cachés · Hébergement suisse · Interlocuteur unique",
  tiers: [
    {
      id: "showcase",
      tag: "ESSENTIEL",
      title: "Site Vitrine",
      price: "CHF 3'900",
      duration: "3 semaines",
      description:
        "Un beau site de 5 pages construit autour de vos réalisations. Mobile-first, rapide, prêt pour le SEO.",
      features: [
        "Design sur-mesure (sans templates)",
        "5 pages clés",
        "Bases SEO local",
        "Formulaire de contact + Google Maps",
        "1 an d'hébergement inclus",
      ],
      cta: { label: "Choisir Vitrine", href: "#contact?tier=showcase" },
    },
    {
      id: "growth",
      tag: "LE PLUS POPULAIRE",
      title: "Site Croissance",
      price: "CHF 5'900",
      duration: "5 semaines",
      description:
        "Tout ce qu'inclut Vitrine, plus un système de portfolio, un blog et une optimisation continue pendant 3 mois.",
      features: [
        "Portfolio avec pages projets",
        "Blog / journal",
        "SEO local avancé",
        "Création fiche Google Business",
        "3 mois d'optimisation inclus",
      ],
      cta: { label: "Choisir Croissance", href: "#contact?tier=growth" },
      featured: true,
    },
    {
      id: "partnership",
      tag: "PARTENARIAT",
      title: "Partenariat Croissance",
      price: "CHF 990 / mois",
      duration: "Continu",
      description:
        "Votre équipe digitale en interne. Site, contenus, SEO, publicités, photographie — tout est géré.",
      features: [
        "Tout ce qu'inclut Croissance",
        "Shootings saisonniers trimestriels",
        "Rapport mensuel SEO + analytics",
        "Gestion Google Ads",
        "Support prioritaire",
      ],
      cta: { label: "Nous contacter", href: "#contact?tier=partnership" },
    },
  ] as const satisfies readonly Service[],
} as const;
