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
    before: "Trois façons de",
    accent: "planter vos racines",
    after: "en ligne.",
  },
  intro:
    "Chaque offre est conçue pour aider votre entreprise à être trouvée, inspirer confiance et convertir les visiteurs en demandes concrètes.",
  reassurance:
    "Toutes les formules incluent : garantie satisfaction 90 jours · CHF, sans frais cachés · Hébergement suisse · Interlocuteur unique",
  tiers: [
    {
      id: "showcase",
      tag: "LANCEMENT",
      title: "Être présent et crédible",
      price: "CHF 600 – 1'200",
      duration: "1 à 2 semaines",
      description:
        "Pour les indépendants et petites entreprises qui veulent une présence professionnelle rapidement, sans complexité inutile.",
      features: [
        "Jusqu'à 5 pages essentielles",
        "Une langue, une zone d'intervention",
        "Design adapté mobile",
        "Branding appliqué à votre image",
        "Formulaire de contact avec notifications email",
        "SEO de base",
        "1 révision",
      ],
      payment: "Paiement : 100% après livraison",
      cta: { label: "Créer ma présence en ligne", href: "#contact?tier=showcase" },
    },
    {
      id: "growth",
      tag: "CROISSANCE",
      title: "Générer plus de demandes",
      price: "CHF 1'400 – 3'200",
      duration: "2 à 3 semaines",
      description:
        "Pour les entreprises qui veulent un site plus complet, capable de rassurer les prospects et de transformer les visites en leads.",
      features: [
        "6 à 8 pages structurées",
        "Jusqu'à 2 langues",
        "Mise en page personnalisée à votre marque",
        "Textes améliorés et orientés conversion",
        "Appels à l'action, formulaires",
        "Blog + intégration email",
        "SEO amélioré + optimisation performance",
        "2 révisions",
      ],
      payment: "Paiement : 40% d'acompte / 40% avant lancement / 20% après lancement",
      cta: { label: "Attirer plus de leads", href: "#contact?tier=growth" },
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
