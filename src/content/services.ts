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
    accent: "votre présence en ligne,",
    after: "",
  },
  intro:
    "Chaque offre est conçue pour aider votre entreprise de paysagisme à être trouvé, inspirer confiance et générer plus de demandes de devis.",
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
        "Pour les indépendants et petites entreprises qui veulent une présence professionnelle, claire et efficace.",
      features: [
        "Jusqu'à 5 pages essentielles",
        "Une langue et une zone d'intervention",
        "Design adapté au mobile",
        "Identité visuelle intégrée",
        "Formulaire de contact avec notifications par e-mail",
        "SEO local de base",
        "1 révision",
      ],
      payment: "Paiement : 100% après livraison",
      cta: { label: "Créer ma présence en ligne", href: "#contact?tier=showcase" },
    },
    {
      id: "growth",
      tag: "CROISSANCE",
      title: "Générer plus de demandes de devis",
      price: "CHF 1'400 – 3'200",
      duration: "2 à 4 semaines",
      description:
        "Pour les entreprises qui veulent un site plus complet, conçu pour rassurer les visiteurs et les convertir en clients potentiels.",
      features: [
        "6 à 8 pages structurées",
        "Jusqu'à 2 langues",
        "Design personnalisé à votre marque",
        "Textes optimisés pour la conversion",
        "Appels à l'action et formulaires",
        "Blog et intégration e-mail",
        "SEO amélioré et optimisation des performances",
        "2 révisions",
      ],
      payment: "Paiement : 40% d'acompte / 40% avant lancement / 20% après lancement",
      cta: { label: "Attirer plus de clients", href: "#contact?tier=growth" },
      featured: true,
    },
    {
      id: "partnership",
      tag: "PARTENARIAT",
      title: "Développer votre présence sur le long terme",
      price: "CHF 990 / mois",
      duration: "En continu",
      description:
        "Un accompagnement mensuel pour améliorer votre visibilité, vos contenus et vos performances après le lancement de votre site.",
      features: [
        "Offre Croissance incluse",
        "Engagement minimum de 3 mois",
        "Optimisations continues du site",
        "Séances photo saisonnières",
        "Rapport mensuel SEO et statistiques",
        "Gestion Google Ads",
        "Support prioritaire",
      ],
      cta: { label: "Nous contacter", href: "#contact?tier=partnership" },
    },
  ] as const satisfies readonly Service[],
} as const;
