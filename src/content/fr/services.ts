import { facts, split } from "../facts";
import { chf } from "../format";
import type { CarePlan, Service, ServicesCopy } from "../types";

const { tiers: t, care: c } = facts;
const weeks = (w: readonly number[]) => `${w[0]} à ${w[1]} semaines`;
const payment = (tier: keyof typeof t) => {
  const [deposit, balance] = split(tier);
  return `Acompte ${deposit} % · solde ${balance} % à la livraison`;
};

// The offer names, used by the cards, the FAQ, the JSON-LD and the AI files.
export const names = {
  showcase: "Lancement",
  growth: "Croissance",
  partnership: "Entreprise",
  "care-essentiel": "Care Essentiel",
  "care-pro": "Care Pro",
  retainer: "Retainer",
} as const;

// Prices are shown on the page, which is what allows them in the Offer
// JSON-LD too. The à la carte list stays off the site.
export const services = {
  headline: "Trois façons de développer votre présence en ligne",
  intro:
    "Chaque offre est conçue pour aider votre entreprise de paysagisme à être trouvée, inspirer confiance et générer plus de demandes de devis.",
  reassurance: `Prix fixes, sans facturation à l'heure. Pages légales non comptées. Révisions : ${facts.revisionHours} h ouvrables pour valider le design ou envoyer une liste groupée de retours. Délais comptés dès réception de l'acompte et du contenu. Support après la mise en ligne : ${facts.supportDays} jours inclus.`,
  featuredBadge: "Recommandé",

  // All three CTAs read "Commencer mon projet" (October 2026, replacing the
  // Figma's "Créer ma présence en ligne"). Each button also carries its tier
  // into the contact form (see ContactForm).
  tiers: [
    {
      id: "showcase",
      title: names.showcase,
      duration: weeks(t.showcase.weeks),
      price: t.showcase.price,
      payment: payment("showcase"),
      description:
        "Pour les indépendants et petites entreprises qui veulent une présence professionnelle, claire et rapide.",
      features: [
        `${t.showcase.pages} pages : accueil, services, contact`,
        "Design sur mesure, identité visuelle et logo textuel",
        "Formulaire de contact",
        "SEO essentiel : sitemap, Google Search Console, Bing",
        `${t.showcase.languages} langue · ${facts.revisionRounds} rounds de révisions`,
        `${facts.supportDays} jours de support après la mise en ligne`,
      ],
      cta: { label: "Commencer mon projet", href: "#contact" },
      featured: false,
    },
    {
      id: "growth",
      title: names.growth,
      duration: weeks(t.growth.weeks),
      price: t.growth.price,
      payment: payment("growth"),
      description:
        "Pour les entreprises qui veulent un site plus complet, conçu pour inspirer confiance et convertir les visiteurs.",
      features: [
        `Tout le ${names.showcase} inclus`,
        `${t.growth.pages} pages : + à propos et réalisations`,
        "Vidéo de présentation en motion graphic",
        `Jusqu'à ${t.growth.languages} langues`,
        "Statistiques de visites (analytics)",
        "SEO local : Google Business Profile, local.ch, search.ch",
      ],
      cta: { label: "Commencer mon projet", href: "#contact" },
      featured: true,
    },
    {
      id: "partnership",
      title: names.partnership,
      duration: weeks(t.partnership.weeks),
      price: t.partnership.price,
      payment: payment("partnership"),
      description:
        "Pour les entreprises sérieuses qui veulent se démarquer et s'établir durablement.",
      features: [
        `Tout le ${names.growth} inclus`,
        `${t.partnership.pages} pages : 6 pages services, blog, réalisations`,
        `Jusqu'à ${t.partnership.languages} langues, textes rédigés par Studio PWI`,
        "Formulaire relié à un CRM, ou outil de réservation",
        "SEO avancé : mots-clés, pages services, plan de blog",
        `Support prioritaire de ${facts.supportDays} jours`,
      ],
      cta: { label: "Commencer mon projet", href: "#contact" },
      featured: false,
    },
  ] as const satisfies readonly Service[],

  care: {
    headline: "Maintenance mensuelle",
    intro: `Sauvegardes et surveillance incluses dans chaque formule. Petites modifications : texte, image, ajout d'avis… Sans engagement, minimum recommandé de ${facts.careMinMonths} mois.`,
    plans: [
      {
        id: "care-essentiel",
        title: names["care-essentiel"],
        price: c["care-essentiel"].price,
        features: [
          `${c["care-essentiel"].edits} petite modification par mois`,
          `Rapport SEO et statistiques en option (${chf(facts.seoReportAddon)})`,
        ],
        featured: false,
      },
      {
        id: "care-pro",
        title: names["care-pro"],
        price: c["care-pro"].price,
        features: [
          `${c["care-pro"].edits} petites modifications par mois`,
          "Rapport SEO, performances et statistiques",
        ],
        featured: false,
      },
      {
        id: "retainer",
        title: names.retainer,
        price: c.retainer.price,
        features: [
          `${c.retainer.edits} petites modifications par mois`,
          "Rapport SEO, performances et statistiques",
          `−${facts.landingDiscount} % sur les landing pages et campagnes`,
        ],
        featured: true,
      },
    ] as const satisfies readonly CarePlan[],
    footnote: "Toute demande hors forfait est devisée séparément, à prix fixe.",
    // One button under the whole care block (Figma desktop Services frame),
    // worded like the tier cards; no tier is passed, the plans aren't one.
    cta: { label: "Commencer mon projet", href: "#contact" },
  },

  schema: {
    tierName: (title: string) => `Offre ${title} — site web pour paysagistes`,
    tierType: "Création de site web",
    careName: (title: string) => `${title} — maintenance de site web`,
    careType: "Maintenance de site web",
    month: "mois",
  },
} as const satisfies ServicesCopy;
