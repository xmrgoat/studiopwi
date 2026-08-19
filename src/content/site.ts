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
    paragraphs: [
      "Basé à Neuchâtel, en Suisse, nous avons construit plus de 20 sites web dans des secteurs variés. Cette expérience nous a appris ce qui fonctionne réellement pour convertir un visiteur en client.",
      "Comme un paysagiste qui doit s'adapter à la météo, nous nous adaptons aux tendances du web et nous construisons des sites, pensés pour durer.",
    ],
    testimonialsTitle: "Avis concret",
    testimonials: [
      {
        quote:
          "Avant, je n'avais pas de site, juste ma page Facebook. Studio PWI a compris rapidement ce dont j'avais besoin : montrer mes chantiers et être trouvable sur Google. En moins de deux semaines, j'avais un site professionnel, et j'ai reçu ma première demande de devis via le site dès le premier mois.",
        author: "Marc D.",
        role: "Paysagiste, Neuchâtel",
      },
      {
        // Translated from the English review in the desktop "Avis concret"
        // frame. The Figma carries no attribution for it — fill `author`/`role`
        // in before launch, or drop this entry. The component hides the
        // attribution line while both fields are empty.
        quote:
          "Il a vraiment écouté ce que je voulais, au lieu de livrer quelque chose et de considérer le travail terminé. Il est resté impliqué jusqu'à ce que nous obtenions exactement le résultat que je cherchais. Un vrai plaisir de travailler avec lui : je recommande Jean-Pierre sans hésiter à quiconque cherche quelqu'un de fiable, de réactif et réellement attaché à la qualité.",
        author: "",
        role: "",
      },
    ],
  },

  process: {
    title: "Notre démarche",
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
    cta: { label: "Démarrer un projet", href: "#contact" },
  },

  contact: {
    title: "Contactez-nous",
    lead:
      "Remplissez le formulaire pour nous présenter votre projet. Nous vous répondrons rapidement pour organiser un appel découverte de 20 minutes.",
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
