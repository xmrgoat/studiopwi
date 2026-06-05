export type ServiceTier = "showcase" | "growth" | "partnership";

export type Service = {
  id: ServiceTier;
  tag: string;
  title: string;
  price: string;
  duration: string;
  description: string;
  features: readonly string[];
  payment?: string;
  cta: { label: string; href: string };
  featured?: boolean;
};

export const services = {
  marker: { number: "03", label: "SERVICES" },
  headline: {
    before: "Trois façons de développer",
    accent: "votre présence en ligne.",
    after: "",
  },
  intro:
    "Chaque offre est conçue pour aider votre entreprise de paysagisme à être trouvée, inspirer confiance et générer plus de demandes de devis.",
  reassurance:
    "Les demandes de révision doivent être envoyées sous 48 heures. Après validation, toute modification supplémentaire est facturée séparément. Support post-lancement : 14 jours inclus.",
  tiers: [
    {
      id: "showcase",
      tag: "LANCEMENT",
      title: "Être présent et crédible",
      price: "CHF 600 – 1'200",
      duration: "1 à 2 semaines",
      description:
        "Pour les indépendants et petites entreprises qui veulent une présence professionnelle, claire et rapide.",
      features: [
        "Jusqu'à 5 pages",
        "Une langue et une zone d'intervention",
        "Design adapté aux mobiles",
        "Formulaire de contact",
        "SEO local de base",
        "1 révision",
      ],
      payment: "Paiement : 100% après livraison",
      cta: { label: "Créer ma présence en ligne", href: "#contact" },
    },
    {
      id: "growth",
      tag: "CROISSANCE",
      title: "Générer plus de demandes qualifiées",
      price: "CHF 1'400 – 3'200",
      duration: "2 à 4 semaines",
      description:
        "Pour les entreprises qui veulent un site plus complet, conçu pour inspirer confiance et convertir les visiteurs.",
      features: [
        "6 à 8 pages",
        "Jusqu'à 2 langues",
        "Design personnalisé",
        "Textes optimisés pour la conversion",
        "SEO local renforcé",
        "2 révisions",
      ],
      payment: "Paiement : 40% d'acompte / 40% avant lancement / 20% après lancement",
      cta: { label: "Attirer plus de clients", href: "#contact" },
      featured: true,
    },
    {
      id: "partnership",
      tag: "PARTENARIAT",
      title: "Développer votre présence sur le long terme",
      price: "CHF 990 / mois",
      duration: "Engagement minimum de 3 mois",
      description:
        "Pour les entreprises qui veulent un accompagnement mensuel après le lancement de leur site.",
      features: [
        "Offre Croissance incluse",
        "Optimisations continues du site",
        "Séances photo saisonnières",
        "Rapport mensuel SEO et statistiques",
        "Gestion Google Ads",
        "Support prioritaire",
      ],
      payment: "Budget publicitaire non inclus.",
      cta: { label: "Nous contacter", href: "#contact" },
    },
  ] as const satisfies readonly Service[],
} as const;
