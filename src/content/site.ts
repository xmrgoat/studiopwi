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
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    eyebrow: "(CH) — Studio web spécialisé pour paysagistes",
    headline: {
      before: "Des sites web pour les",
      accent: "paysagistes suisses",
      after: "qui veulent plus de chantiers.",
    },
    lead:
      "Nous créons des sites web conçus pour les entreprises de paysagisme en Suisse afin d'attirer plus de clients, générer plus de demandes de devis et décrocher de meilleurs chantiers.",
    primaryCta: { label: "Démarrer un projet", href: "#contact" },
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
      "Sur Google, vos **prospects** choisissent l'entreprise qui les rassure le plus vite : un site soigné, des photos réelles et des informations claires. S'ils ne trouvent pas ces éléments chez vous, ils **contactent** un **concurrent**.",
    points: [
      {
        number: "01",
        title: "Introuvable sur Google",
        body:
          "Vos **prospects** cherchent un paysagiste à Lausanne, Neuchâtel ou Genève. S'ils ne vous **trouvent pas**, ils vont voir ailleurs.",
      },
      {
        number: "02",
        title: "Une image peu professionnelle",
        body:
          "Un site peu soigné peut donner une **mauvaise impression** de votre savoir-faire.",
      },
      {
        number: "03",
        title: "Des chantiers invisibles",
        body:
          "Sans **preuves** de vos réalisations, vos prospects manquent de raisons de vous **contacter**.",
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
          "Nous échangeons sur votre activité, vos objectifs et les besoins de votre entreprise.",
      },
      {
        number: "02",
        title: "Design et développement",
        duration: "1 à 4 semaines selon l'offre",
        body:
          "Nous structurons, concevons et développons votre site autour d'un objectif : transformer vos visiteurs en clients.",
      },
      {
        number: "03",
        title: "Lancement et suivi",
        duration: "14 jours inclus",
        body:
          "Après la mise en ligne, nous restons disponibles pour les corrections techniques et ajustements mineurs.",
      },
    ],
    guarantee: {
      label: "SUIVI POST-LANCEMENT",
      title: "Votre site est accompagné après sa mise en ligne.",
      body:
        "Pendant 14 jours après le lancement, nous corrigeons les éventuels problèmes techniques et effectuons les ajustements mineurs convenus, sans frais supplémentaires.",
    },
  },

  contact: {
    marker: { number: "06", label: "CONTACT" },
    headline: {
      before: "Prêt à",
      accent: "planter la graine ?",
      after: "",
    },
    lead: "Remplissez le formulaire pour nous présenter votre projet.\nNous vous répondrons rapidement pour organiser un appel découverte de 20 minutes si votre projet correspond à notre accompagnement.",
    primary: { label: "Réserver un appel", href: "mailto:contact@studiopwi.com" },
    secondary: { label: "Écrivez-nous directement", href: "mailto:contact@studiopwi.com" },
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
          "Entre 1 et 4 semaines selon l'offre choisie, le nombre de pages et la disponibilité de vos contenus.",
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
          "Toutes nos offres incluent les bases du SEO local : structure claire, balises essentielles et optimisation technique de base. La visibilité dépend ensuite de votre marché, de votre zone d'intervention et du suivi SEO mis en place.",
      },
      {
        question: "Que se passe-t-il si je ne suis pas satisfait ?",
        answer:
          "Vous bénéficiez de 1 à 2 séries de révisions selon l'offre choisie avant la mise en ligne. Après le lancement, 14 jours de support sont inclus pour les corrections techniques et ajustements mineurs convenus.",
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
