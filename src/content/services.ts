// "partnership" is the id of the Entreprise tier. It was called Partenariat
// before the October 2026 price list; the id is kept because the contact form
// and its validation schema send it, and it never reaches the page.
export type ServiceTier = "showcase" | "growth" | "partnership";

export type Service = {
  id: ServiceTier;
  title: string;
  duration: string;
  /** Fixed price in CHF — shown on the card and in the Offer JSON-LD. */
  price: number;
  payment: string;
  description: string;
  features: readonly string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

export type CarePlan = {
  id: string;
  title: string;
  /** Monthly price in CHF. */
  price: number;
  features: readonly string[];
};

/** Swiss price formatting, as on the price list: 2600 → "CHF 2'600". */
export function chf(amount: number): string {
  return `CHF ${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, "'")}`;
}

// Source of truth: the "Studio PWI – Liste de prix" PDF (October 2026).
// Prices are shown on the page, which is what allows them in the Offer
// JSON-LD too — Google requires price markup to match visible prices.
// The à la carte list stays off the site.
export const services = {
  headline: "Trois façons de développer votre présence en ligne",
  intro:
    "Chaque offre est conçue pour aider votre entreprise de paysagisme à être trouvée, inspirer confiance et générer plus de demandes de devis.",
  reassurance:
    "Prix fixes, sans facturation à l'heure. Pages légales non comptées. Révisions : 72 h ouvrables pour valider le design ou envoyer une liste groupée de retours. Délais comptés dès réception de l'acompte et du contenu. Support après la mise en ligne : 14 jours inclus.",
  featuredBadge: "Recommandé",

  // NOTE: all three CTAs read "Créer ma présence en ligne" in the Figma — the
  // component default was never overridden per tier. Reproduced faithfully;
  // differentiating them is a one-line change here if that was unintended.
  tiers: [
    {
      id: "showcase",
      title: "Lancement",
      duration: "1 à 3 semaines",
      price: 1200,
      payment: "Acompte 25 % · solde 75 % à la livraison",
      description:
        "Pour les indépendants et petites entreprises qui veulent une présence professionnelle, claire et rapide.",
      features: [
        "3 pages : accueil, services, contact",
        "Design sur mesure, identité visuelle et logo textuel",
        "Formulaire de contact",
        "SEO essentiel : sitemap, Google Search Console, Bing",
        "1 langue · 2 rounds de révisions",
        "14 jours de support après la mise en ligne",
      ],
      cta: { label: "Créer ma présence en ligne", href: "#contact" },
      featured: false,
    },
    {
      id: "growth",
      title: "Croissance",
      duration: "3 à 4 semaines",
      price: 2600,
      payment: "Acompte 35 % · solde 65 % à la livraison",
      description:
        "Pour les entreprises qui veulent un site plus complet, conçu pour inspirer confiance et convertir les visiteurs.",
      features: [
        "Tout le Lancement inclus",
        "5 pages : + à propos et réalisations",
        "Vidéo de présentation en motion graphic",
        "Jusqu'à 2 langues",
        "Statistiques de visites (analytics)",
        "SEO local : Google Business Profile, local.ch, search.ch",
      ],
      cta: { label: "Créer ma présence en ligne", href: "#contact" },
      featured: true,
    },
    {
      id: "partnership",
      title: "Entreprise",
      duration: "4 à 8 semaines",
      price: 5200,
      payment: "Acompte 45 % · solde 55 % à la livraison",
      description:
        "Pour les entreprises sérieuses qui veulent se démarquer et s'établir durablement.",
      features: [
        "Tout le Croissance inclus",
        "10 pages : 6 pages services, blog, réalisations",
        "Jusqu'à 3 langues, textes rédigés par Studio PWI",
        "Formulaire relié à un CRM, ou outil de réservation",
        "SEO avancé : mots-clés, pages services, plan de blog",
        "Support prioritaire de 14 jours",
      ],
      cta: { label: "Créer ma présence en ligne", href: "#contact" },
      featured: false,
    },
  ] as const satisfies readonly Service[],

  care: {
    headline: "Maintenance mensuelle",
    intro:
      "Hébergement, sauvegardes et surveillance inclus dans chaque formule. Petites modifications : texte, image, ajout d'avis… Sans engagement, minimum recommandé de 3 mois.",
    // The price list marks the SEO report "–" for Care Essentiel and prices it
    // at CHF 25 in the row label; read as an Essentiel add-on.
    plans: [
      {
        id: "care-essentiel",
        title: "Care Essentiel",
        price: 45,
        features: [
          "1 petite modification par mois",
          "Rapport SEO et statistiques en option (CHF 25)",
        ],
      },
      {
        id: "care-pro",
        title: "Care Pro",
        price: 90,
        features: [
          "3 petites modifications par mois",
          "Rapport SEO, performances et statistiques",
        ],
      },
      {
        id: "retainer",
        title: "Retainer",
        price: 150,
        features: [
          "5 petites modifications par mois",
          "Rapport SEO, performances et statistiques",
          "−25 % sur les landing pages et campagnes",
        ],
      },
    ] as const satisfies readonly CarePlan[],
    footnote: "Toute demande hors forfait est devisée séparément, à prix fixe.",
  },
} as const;
