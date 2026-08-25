// Centralized copy for the site.
// Edit copy here; sections re-render automatically.
//
// Copy transcribed from the "Studio PWI Website draft" Figma file. Where the
// desktop and mobile frames disagreed, the choice is noted inline.

export const site = {
  name: "Studio PWI",
  domain: "studiopwi.com",
  tagline: "Des sites web pour les paysagistes",
  address: "Rue de la Treille 2 · 2000 Neuchâtel · Suisse",
  email: "contact@studiopwi.com",
  locale: "fr",

  // Header nav — matches the three links in the Figma header frame.
  nav: [
    { label: "Services", href: "#services" },
    { label: "À propos", href: "#pourquoi" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    headline: "Des sites web pour les paysagistes qui veulent plus de chantiers",
    lead:
      "Basés en Suisse, nous concevons des sites qui aident les entreprises de paysagisme, où qu'elles soient, à attirer plus de clients, générer plus de demandes de devis et décrocher de meilleurs chantiers.",
    // Desktop reads "Démarrer un devis", mobile "Démarrer un projet". Mobile's
    // wording is the idiomatic one and matches the contact copy, so it wins.
    primaryCta: { label: "Démarrer un projet", href: "#contact" },
  },

  whyUs: {
    title: "Pourquoi nous?",
    // **bold** marks the fragments the design emphasises mid-paragraph;
    // rendered by components/ui/RichText.
    paragraphs: [
      "Basés à Neuchâtel, en Suisse, nous avons construit plus de **20 sites web dans des secteurs variés.** Cette expérience nous a appris ce qui fonctionne réellement pour convertir un visiteur en client.",
      "Comme un paysagiste qui doit s'adapter à la météo, nous nous adaptons aux tendances du web et nous construisons **des sites, pensés pour durer.**",
    ],
    testimonialsTitle: "Avis concret",
    cta: { label: "Démarrer un projet", href: "#contact" },
    testimonials: [
      {
        // Translated from the English review in the desktop "Avis concret" frame.
        quote:
          "Il a vraiment écouté ce que je voulais, au lieu de livrer quelque chose et de considérer le travail terminé. Il est resté impliqué jusqu'à ce que nous obtenions exactement le résultat que je cherchais. Un vrai plaisir de travailler avec lui : je recommande Jean-Pierre sans hésiter à quiconque cherche quelqu'un de fiable, de réactif et réellement attaché à la qualité.",
        author: "Jimi Builds",
        role: "",
      },
    ],
  },

  process: {
    title: "Notre démarche",
    intro:
      "Une approche structurée pour transformer votre vision en une expérience digitale cohérente et performante.",
    steps: [
      {
        number: "1",
        title: "Appel découverte, 30 min, gratuit",
        body:
          "Nous parlerons de votre activité, vos objectifs et les besoins de votre entreprise.",
      },
      {
        number: "2",
        title: "Design et développement, 1 à 8 semaines selon l'offre",
        body:
          "Nous structurons, concevons et développons votre site autour d'un objectif : transformer vos visiteurs en clients.",
      },
      {
        number: "3",
        title: "Lancement et suivi : 14 jours inclus",
        body:
          "Après la mise en ligne, nous restons disponibles pour les corrections techniques et ajustements mineurs.",
      },
    ],
    cta: { label: "Demander un devis", href: "#contact" },
  },

  contact: {
    title: "Contactez-nous",
    lead:
      "Remplissez le formulaire pour nous présenter votre projet. Nous vous répondrons rapidement pour organiser un appel découverte de 30 minutes.",
    trustSignals: ["Réponse sous 48h", "Appel découverte gratuit"],
    form: {
      name: { label: "Nom", placeholder: "Votre nom complet" },
      email: { label: "Email", placeholder: "votre@email.com" },
      phone: { label: "Téléphone", placeholder: "076 612 27 41" },
      message: { label: "Message", placeholder: "Décrivez votre projet..." },
      submit: "Envoyer",
    },
  },

  footer: {
    email: "contact@studiopwi.com",
    tagline: "Des sites web pour les paysagistes",
    nav: [
      { label: "Accueil", href: "#main" },
      { label: "Services", href: "#services" },
      { label: "Étude de cas", href: "#etude-de-cas" },
      { label: "Notre démarche", href: "#demarche" },
      { label: "Contact", href: "#contact" },
    ],
    socialLabel: "Suivez-nous",
    // TODO(jp): the Figma shows a LinkedIn icon but carries no URL. This is a
    // guess at the company page slug — confirm or replace before launch.
    social: [
      { label: "LinkedIn", href: "https://www.linkedin.com/company/studiopwi" },
    ],
    // The Figma footer lists only "Mentions légales" and "Politique de
    // confidentialité". /conditions-generales is kept here deliberately: the
    // route exists, and dropping the link would leave it orphaned with no
    // internal path to it. Remove this entry only alongside the route.
    legal: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Politique de confidentialité", href: "/confidentialite" },
      { label: "Conditions générales", href: "/conditions-generales" },
    ],
  },
} as const;

export type Site = typeof site;
