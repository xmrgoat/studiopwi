// Centralized copy for the site.
// Edit copy here; sections re-render automatically.

export const site = {
  name: "Studio PWI",
  domain: "studiopwi.com",
  tagline: "Studio web pour paysagistes suisses.",
  address: "Rue de la Treille 2 · 2000 Neuchâtel · Suisse",
  email: "contact@studiopwi.com",
  locale: "fr",

  nav: [
    { label: "Réalisations", href: "#realisations" },
    { label: "Services", href: "#services" },
    { label: "À propos", href: "#pourquoi" },
    { label: "Contact", href: "/contact" },
  ],

  hero: {
    eyebrow: "(CH) — Studio web pour paysagistes",
    headline: {
      before: "Des sites web pour les",
      accent: "paysagistes suisses",
      after: "qui veulent plus de chantiers.",
    },
    lead:
      "Nous créons des sites web axés conversion pour les entreprises de paysagisme en Suisse afin d'attirer plus de clients, générer plus de demandes de devis et décrocher de meilleurs projets.",
    primaryCta: { label: "Démarrer un projet", href: "/contact" },
    secondaryCta: { label: "Voir nos réalisations", href: "#realisations" },
    metrics: [
      { value: 12, label: "Projets" },
      { value: 90, label: "Jours" },
      { value: 1, label: "Contact" },
      { value: 24, label: "h Réponse", suffix: "h" },
    ],
    video: {
      src: "/videos/flower.mp4",
      poster: "/images/flower-poster.webp",
      title: "Studio PWI — Sites web pour paysagistes suisses",
      description: "Nous créons des sites web axés conversion pour les entreprises de paysagisme en Suisse — pour attirer plus de clients et générer plus de demandes de devis.",
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
      before: "Votre site vous fait",
      accent: "perdre des chantiers.",
      after: "",
    },
    lead:
      "Un propriétaire compare deux entreprises sur Google. L'une inspire confiance avec un site soigné, des photos réelles et des informations claires. L'autre paraît absente ou négligée. Il appelle la première. Pas forcément la meilleure. Celle qui rassure.",
    points: [
      {
        number: "01",
        title: "Introuvable sur Google",
        body:
          "Vos clients cherchent un paysagiste à Lausanne, Neuchâtel ou Genève. S'ils ne vous trouvent pas, ils contactent un concurrent.",
      },
      {
        number: "02",
        title: "Votre site nuit à votre image.",
        body:
          "Un site bricolé peut donner une mauvaise impression de votre savoir-faire.",
      },
      {
        number: "03",
        title: "Chantiers invisibles",
        body:
          "Sans preuves visibles, vos prospects choisissent ailleurs.",
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
      "100% suisse. Basés à Neuchâtel, en Romandie.",
      "Studio spécialisé. Paysagistes uniquement.",
      "Un seul contact. Du brief au lancement.",
      "Garantie satisfaction 90 jours.",
    ],
    process: [
      {
        number: "01",
        title: "Appel découverte",
        duration: "20 min, gratuit",
        body:
          "On écoute votre situation, vos objectifs et vos besoins. On vous dit clairement si votre site peut devenir un levier de confiance, de visibilité et de demandes qualifiées.",
      },
      {
        number: "02",
        title: "Design & développement",
        duration: "3 à 4 semaines",
        body:
          "On structure, conçoit et développe votre site autour d'un objectif : transformer les visiteurs en prospects. Vous validez le site avant la mise en ligne.",
      },
      {
        number: "03",
        title: "Lancement & suivi",
        duration: "14 jours inclus",
        body:
          "Après la mise en ligne, on reste présent pour les corrections techniques, ajustements mineurs et vérifications essentielles.",
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
      primary: { label: "Réserver un appel", href: "/contact" },
      secondary: { label: "Ou écrivez-nous — contact@studiopwi.com", href: "mailto:contact@studiopwi.com" },
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
      { label: "Email", value: "contact@studiopwi.com" },
      { label: "Délai de réponse", value: "Sous 48h ouvrées" },
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
          "Nos offres démarrent à CHF 600 pour une présence simple et vont jusqu'à CHF 3'200 pour un site complet orienté conversion. Pour un paysagiste en Suisse romande — à Neuchâtel, Lausanne, Genève ou Fribourg — le tarif dépend du nombre de pages, des fonctionnalités souhaitées et du niveau de personnalisation. Chaque offre inclut le design, le développement et le référencement de base. Aucun abonnement caché.",
      },
      {
        question: "Combien de temps faut-il pour créer mon site ?",
        answer:
          "L'offre Lancement est livrée en 1 à 2 semaines, l'offre Croissance en 2 à 4 semaines. Dès que nous avons vos contenus — logo, photos de chantier, textes — nous respectons les délais convenus. Nos clients paysagistes en Romandie reçoivent souvent leur site en ligne avant la fin de leur saison.",
      },
      {
        question: "Est-ce que je peux modifier le site moi-même après livraison ?",
        answer:
          "Oui. Nous livrons un site simple à mettre à jour et nous vous formons à l'utilisation. Que vous soyez à Neuchâtel, Lausanne ou Genève, on peut se retrouver ou faire ça en visio. Vous pouvez ajouter de nouvelles réalisations, modifier vos services ou changer vos coordonnées sans passer par nous.",
      },
      {
        question: "Travaillez-vous uniquement avec des paysagistes ?",
        answer:
          "Oui, c'est notre seule spécialité. Nous travaillons exclusivement avec des entreprises de paysagisme en Suisse romande — jardins résidentiels, entretien d'espaces verts, aménagement paysager, terrasses et massifs. Cette focalisation nous permet de comprendre votre métier, votre clientèle et ce qui fonctionne réellement dans votre secteur.",
      },
      {
        question: "Mon site sera-t-il visible sur Google ?",
        answer:
          "Toutes nos offres incluent les bases du SEO local : balises optimisées, structure claire, vitesse de chargement. Concrètement, votre site sera mieux positionné quand un propriétaire cherche « paysagiste Neuchâtel », « paysagiste Lausanne », « jardinage Genève » ou « entretien jardin Fribourg ». L'offre Croissance intègre un SEO avancé avec optimisation continue pour vous positionner sur des requêtes locales ciblées.",
      },
      {
        question: "Que se passe-t-il si je ne suis pas satisfait ?",
        answer:
          "Nous travaillons en révisions validées à chaque étape pour éviter les mauvaises surprises. De plus, toutes nos offres incluent une garantie satisfaction de 90 jours après le lancement : si vous ne constatez pas d'amélioration mesurable en demandes qualifiées, nous continuons à travailler jusqu'à ce que les résultats soient là — sans frais supplémentaires.",
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
    cta: { label: "Démarrer un projet", href: "/contact" },
  },

  footer: {
    email: "contact@studiopwi.com",
    legal: [
      { label: "Confidentialité", href: "/confidentialite" },
      { label: "CGU", href: "/conditions-generales" },
      { label: "Mentions légales", href: "/mentions-legales" },
    ],
    signature: "Conçu avec soin en Suisse.",
  },
} as const;

export type Site = typeof site;
