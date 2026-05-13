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
    headline: {
      before: "Des sites web conçus pour les",
      accent: "paysagistes suisses",
      after: "qui veulent plus de projets.",
    },
    lead:
      "Nous créons des sites web axés conversion pour les entreprises de paysagisme en Suisse afin d'attirer plus de clients, générer plus de demandes de devis et décrocher de meilleurs projets.",
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
      before: "Vous gagnez des chantiers grâce à votre travail.\n",
      accent: "Votre site vous en fait perdre.",
      after: "",
    },
    lead:
      "Un propriétaire compare deux entreprises sur Google. L'une inspire confiance avec un site soigné, des photos réelles et des informations claires. L'autre paraît absente ou négligée. Il appelle la première. Pas forcément la meilleure. Celle qui rassure.",
    points: [
      {
        number: "01",
        title: "Introuvable au moment où ça compte",
        body:
          "Quand un propriétaire cherche « paysagiste [ville] », il contacte les premiers résultats. Si vous n'y êtes pas, le chantier part ailleurs.",
      },
      {
        number: "02",
        title: "Votre site dit le contraire de ce que vous faites",
        body:
          "Un site bricolé donne une impression avant même le premier appel. Il peut faire croire que vos détails de finition ne sont pas une priorité.",
      },
      {
        number: "03",
        title: "Vos meilleurs chantiers restent invisibles",
        body:
          "Vos meilleurs chantiers existent. Mais s'ils restent dans votre téléphone ou sur un ancien Facebook, vos prospects ne les voient pas. Ils ont besoin de preuves. Pas de promesses.",
      },
    ],
  },

  whyUs: {
    marker: { number: "05", label: "POURQUOI NOUS" },
    claim: {
      before: "Nous travaillons avec",
      accent: "des paysagistes uniquement.",
      after: "",
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

  contact: {
    marker: { number: "06", label: "CONTACT" },
    headline: {
      before: "Parlons de",
      accent: "votre projet.",
      after: "",
    },
    lead: "Dites-nous où vous en êtes. On vous répond sous 24h ouvrées.",
    info: [
      { label: "Email", value: "hello@studio.ch" },
      { label: "Délai de réponse", value: "Sous 24h ouvrées" },
      { label: "Basés à", value: "Neuchâtel, Suisse" },
    ],
  },

  faq: {
    marker: { number: "07", label: "FAQ" },
    headline: {
      before: "Questions",
      accent: "fréquentes.",
      after: "",
    },
    items: [
      {
        question: "Combien coûte un site web pour paysagiste ?",
        answer:
          "Nos offres démarrent à CHF 600 pour une présence simple et vont jusqu'à CHF 3'200 pour un site complet orienté conversion. Le prix dépend du nombre de pages, des fonctionnalités et du niveau de personnalisation.",
      },
      {
        question: "Combien de temps faut-il pour créer mon site ?",
        answer:
          "Entre 1 et 3 semaines selon l'offre choisie. Dès que nous avons vos contenus (logo, photos, textes), nous respectons les délais convenus.",
      },
      {
        question: "Est-ce que je peux modifier le site moi-même après livraison ?",
        answer:
          "Oui. Nous livrons un site simple à mettre à jour, et nous vous formons à l'utilisation. Vous restez autonome.",
      },
      {
        question: "Travaillez-vous uniquement avec des paysagistes ?",
        answer:
          "Oui, c'est notre spécialité. Cette focalisation nous permet de comprendre votre métier, votre clientèle et ce qui fonctionne réellement dans votre secteur.",
      },
      {
        question: "Mon site sera-t-il visible sur Google ?",
        answer:
          "Toutes nos offres incluent les bases du SEO local : balises optimisées, structure claire, vitesse de chargement. L'offre Croissance intègre un SEO plus avancé avec optimisation continue.",
      },
      {
        question: "Que se passe-t-il si je ne suis pas satisfait ?",
        answer:
          "Nous travaillons en révisions validées à chaque étape pour éviter les mauvaises surprises. En cas de désaccord, nous cherchons une solution — votre satisfaction est notre priorité.",
      },
    ],
  },

  ctaBanner: {
    headline: {
      before: "Prêt à décrocher",
      accent: "plus de chantiers ?",
      after: "",
    },
    lead: "Réservez un appel découverte gratuit. On vous dit en 30 minutes si on peut vous aider.",
    cta: { label: "Démarrer un projet", href: "#contact" },
  },

  footer: {
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
