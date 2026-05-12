// Centralized copy for the site.
// Edit copy here; sections re-render automatically.

export const site = {
  name: "Studio PWI",
  domain: "studio.ch",
  tagline: "Studio web pour paysagistes suisses.",
  address: "Rue de la Treille 2 · 2000 Neuchâtel · Suisse",
  email: "hello@studio.ch",
  locale: "fr",

  nav: [
    { label: "Réalisations", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "À propos", href: "#why" },
    { label: "Journal", href: "/journal" },
  ],

  hero: {
    eyebrow: "(CH) — Studio web pour paysagistes",
    // The italic word/phrase per §8.2 — kept as a single token here.
    // Component will render `accent` in Fraunces Italic + brand color.
    headline: {
      before: "Des sites web conçus pour les",
      accent: "paysagistes suisses",
      after: "qui veulent plus de projets.",
    },
    lead:
      "Des sites web pour paysagistes suisses. Pensés pour faire croître votre activité — pas seulement votre présence en ligne.",
    primaryCta: { label: "Démarrer un projet", href: "#contact" },
    secondaryCta: { label: "Voir nos réalisations", href: "#work" },
    metrics: [
      { value: 12, label: "Projets" },
      { value: 90, label: "Jours" },
      { value: 1, label: "Contact" },
      { value: 24, label: "h Réponse", suffix: "h" },
    ],
    video: {
      src: "/videos/flower.mp4",
      poster: "/images/flower-poster.webp",
    },
  },

  credibility: {
    label: "Ils nous font confiance",
    logos: [
      { name: "Jardins Dupont", src: "/images/logos/dupont.svg" },
      { name: "Paysage Müller", src: "/images/logos/muller.svg" },
      { name: "VertCH", src: "/images/logos/vertch.svg" },
      { name: "Espaces Verts SA", src: "/images/logos/espaces-verts.svg" },
      { name: "Atelier Vert", src: "/images/logos/atelier-vert.svg" },
    ],
  },

  problem: {
    marker: { number: "02", label: "LE PROBLÈME" },
    headline: {
      before: "Vous gagnez des chantiers grâce à votre travail. Vous en perdez",
      accent: "à cause de votre site.",
      after: "",
    },
    lead:
      "Un propriétaire reçoit deux devis. Il cherche les deux entreprises sur Google. L'une a un site soigné, des photos de réalisations, une adresse claire. L'autre n'a rien — ou presque. Il appelle le premier. Pas parce qu'il est meilleur. Parce qu'il inspire confiance.",
    points: [
      {
        number: "01",
        title: "Introuvable au moment où ça compte",
        body:
          "Quand un propriétaire tape « paysagiste [votre ville] » sur Google, il appelle les trois premiers résultats. Si vous n'y êtes pas, ce chantier n'existe pas pour vous — même si vous habitez à 2 km de chez lui.",
      },
      {
        number: "02",
        title: "Votre site dit le contraire de ce que vous faites",
        body:
          "Un template Wix bricolé un dimanche soir, c'est le premier signal que les clients lisent. Avant votre devis. Avant votre réputation. Avant même de vous parler. Et ce signal dit : « les détails, ce n'est pas ma priorité. »",
      },
      {
        number: "03",
        title: "Vos meilleurs chantiers restent invisibles",
        body:
          "Vous avez des réalisations dont vous êtes fier. Elles sont enfouies dans votre téléphone, sur un Facebook que vous n'avez pas mis à jour depuis 2022, ou nulle part. Le prospect qui ne vous connaît pas a besoin de les voir — pas de les imaginer.",
      },
    ],
  },

  whyUs: {
    marker: { number: "05", label: "POURQUOI NOUS" },
    claim: {
      before: "Nous travaillons avec",
      accent: "des paysagistes uniquement.",
      after: "On sait ce qui fonctionne.",
    },
    badges: [
      "100% suisse. Basés en Romandie.",
      "Studio spécialisé. Paysagistes uniquement.",
      "Un seul contact. Du brief au lancement.",
      "Garantie satisfaction 90 jours.",
    ],
    process: [
      {
        number: "01",
        title: "Appel découverte",
        duration: "30 min, gratuit",
        body:
          "On vous écoute, vous nous parlez de votre activité. On définit vos objectifs, votre cible et ce qu'on peut réalistement promettre.",
      },
      {
        number: "02",
        title: "Design & développement",
        duration: "3 à 5 semaines",
        body:
          "Un designer, un développeur. Aperçus hebdomadaires. Vous validez à chaque étape. Aucune surprise.",
      },
      {
        number: "03",
        title: "Lancement & croissance",
        duration: "Continu",
        body:
          "On ne disparaît pas après le lancement. 90 jours d'optimisation inclus. De vraies personnes, de vraies réponses.",
      },
    ],
    guarantee: {
      label: "GARANTIE 90 JOURS",
      title:
        "Si ça ne fait pas croître votre activité, on continue jusqu'à ce que ça marche.",
      body:
        "Dans les 90 jours suivant le lancement, si vous n'avez pas constaté d'amélioration mesurable en leads qualifiés, on prolonge l'engagement sans frais — jusqu'à ce que les chiffres bougent.",
    },
    finalCta: {
      headline: {
        before: "Prêt à",
        accent: "planter la graine ?",
        after: "",
      },
      lead:
        "Réservez un appel découverte gratuit de 20 minutes. On vous dit dans l'heure si on est faits l'un pour l'autre.",
      primary: { label: "Réserver un appel", href: "#contact" },
      secondary: { label: "Ou écrivez-nous — hello@studio.ch", href: "mailto:hello@studio.ch" },
      founder: { name: "Riff", role: "fondateur", photo: "/images/founder.webp" },
    },
  },

  footer: {
    newsletter: {
      title: "Un email éditorial par saison.",
      subtitle: "Pas de spam. Désinscription à tout moment.",
      placeholder: "votre@email.com",
    },
    legal: [
      { label: "Confidentialité", href: "/privacy" },
      { label: "CGU", href: "/terms" },
      { label: "Mentions légales", href: "/imprint" },
    ],
    socials: [
      { label: "LinkedIn", href: "https://linkedin.com/company/studio" },
      { label: "Instagram", href: "https://instagram.com/studio" },
    ],
    signature: "Conçu avec soin en Suisse.",
  },
} as const;

export type Site = typeof site;
