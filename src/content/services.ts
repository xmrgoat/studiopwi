export type ServiceTier = "showcase" | "growth" | "partnership";

export type Service = {
  id: ServiceTier;
  title: string;
  duration: string;
  description: string;
  features: readonly string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

export const services = {
  headline: "Trois façons de développer votre présence en ligne",
  intro:
    "Chaque offre est conçue pour aider votre entreprise de paysagisme à être trouvée, inspirer confiance et générer plus de demandes de devis.",
  reassurance:
    "Les demandes de révision doivent être envoyées sous 48 heures. Après validation, toute modification supplémentaire est facturée séparément. Support post lancement : 14 jours inclus.",
  featuredBadge: "Recommandé",

  // NOTE: the redesign removed prices from the cards entirely — no tier shows
  // a figure. The `price` / `payment` fields are gone rather than hidden,
  // because Google requires Offer price markup to correspond to price visible
  // on the page; emitting it for prices users cannot see risks a structured
  // data manual action. See the OffersLd removal in the same change.
  //
  // NOTE: all three CTAs read "Créer ma présence en ligne" in the Figma — the
  // component default was never overridden per tier. Reproduced faithfully;
  // differentiating them is a one-line change here if that was unintended.
  tiers: [
    {
      id: "showcase",
      title: "Lancement",
      duration: "1 à 2 semaines",
      description:
        "Pour les indépendants et petites entreprises qui veulent une présence professionnelle, claire et rapide.",
      features: [
        "Jusqu'à 5 pages personnalisées",
        "Design adapté aux mobiles & tablettes",
        "Formulaire de contact optimisé",
        "SEO local de base configuré",
        "1 révision complète avant le lancement",
      ],
      cta: { label: "Créer ma présence en ligne", href: "#contact" },
    },
    {
      id: "growth",
      title: "Croissance",
      duration: "2 à 4 semaines",
      description:
        "Pour les entreprises qui veulent un site plus complet, conçu pour inspirer confiance et convertir les visiteurs.",
      features: [
        "Lancement inclus d'office",
        "Structure enrichie : 6 à 8 pages",
        "2 révisions complètes de design",
        "Optimisation de la vitesse & performance",
        "Page de statistiques personnalisée",
      ],
      cta: { label: "Créer ma présence en ligne", href: "#contact" },
      featured: true,
    },
    {
      id: "partnership",
      title: "Partenariat",
      duration: "4 à 8 semaines",
      description:
        "Pour les entreprises sérieuses qui veulent se démarquer et s'établir correctement.",
      features: [
        "Croissance incluse d'office",
        "2 à 5 révisions selon vos retours",
        "Identité visuelle complète (Charte graphique)",
        "Support mensuel technique et stratégique",
        "Photos professionnelles de vos réalisations",
      ],
      cta: { label: "Créer ma présence en ligne", href: "#contact" },
    },
  ] as const satisfies readonly Service[],
} as const;
