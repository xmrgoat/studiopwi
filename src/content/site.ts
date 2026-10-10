// Centralized copy for the site.
// Edit copy here; sections re-render automatically.
//
// Copy transcribed from the "Studio PWI Website draft" Figma file. Where the
// desktop and mobile frames disagreed, the choice is noted inline.

export const site = {
  name: "Studio PWI",
  domain: "studiopwi.com",
  tagline: "Des sites web pour les paysagistes",
  address: "Route des Addoz 52 · 2017 Boudry · Suisse",
  email: "contact@studiopwi.com",
  locale: "fr",
  // Named the same way everywhere (JSON-LD, imprint, AI files): search and AI
  // engines match the person across the site and LinkedIn by this string.
  founder: "Jean-Pierre Médard-Garza",

  // Homepage <title> (before the " · Studio PWI" suffix) and meta description,
  // shared by the OG/Twitter cards and the WebPage JSON-LD. Not visible copy,
  // but kept here so the places that state it can't drift. Keyword first:
  // nobody searches the brand yet, and "création site web paysagiste" is the
  // query this page answers. Title ≤ 60 chars, description ≈ 155.
  seo: {
    title: "Création de site web pour paysagistes en Suisse",
    description:
      "Studio web du canton de Neuchâtel dédié aux paysagistes suisses : des sites conçus pour être trouvés sur Google et générer des demandes de devis.",
  },

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
      "Basés dans le canton de Neuchâtel, en Suisse, nous avons construit plus de **20 sites web dans des secteurs variés.** Cette expérience nous a appris ce qui fonctionne réellement pour convertir un visiteur en client.",
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

  // Answers the buyer questions ChatGPT and Perplexity found unanswered in the
  // October 2026 AI-visibility test (editing, hosting, ownership, languages).
  // Facts follow the October 2026 price list; keep them in step with it.
  faq: {
    title: "Questions fréquentes",
    intro: "Ce que les paysagistes nous demandent avant de démarrer.",
    items: [
      {
        question: "Puis-je modifier mon site moi-même ?",
        answer:
          "Non : pour garder votre site propre et rapide, les modifications passent par nous. Elles sont incluses dans les forfaits de maintenance (1 à 5 par mois) ; sinon, chaque demande est devisée à prix fixe, de CHF 80 à 250.",
      },
      {
        question: "Qui s'occupe de l'hébergement ?",
        answer:
          "Votre site est hébergé chez Vercel ou Infomaniak, des hébergeurs reconnus. L'hébergement est à votre nom ; nous le configurons et le gérons pour vous.",
      },
      {
        question: "Et le nom de domaine ?",
        answer:
          "Nous l'enregistrons à votre nom, au prix coûtant, plus CHF 50 de mise en place.",
      },
      {
        question: "À qui appartient le site ?",
        answer:
          "À vous. Le site et le nom de domaine vous appartiennent ; nous nous occupons de leur gestion technique.",
      },
      {
        question: "Mon site peut-il être en plusieurs langues ?",
        answer:
          "Oui : 1 langue avec l'offre Lancement, jusqu'à 2 avec Croissance et jusqu'à 3 avec Entreprise.",
      },
      {
        question: "Qui rédige les textes ?",
        answer:
          "Vous nous les fournissez, ou nous les rédigeons pour CHF 100 par page. Avec l'offre Entreprise, la rédaction est incluse.",
      },
      {
        question: "Comment se passe le paiement ?",
        answer:
          "Les prix sont fixes, sans facturation à l'heure : un acompte au démarrage (25 à 45 % selon l'offre), le solde à la livraison. Les délais courent dès réception de l'acompte et de votre contenu.",
      },
      {
        question: "Travaillez-vous hors de Suisse ?",
        answer:
          "Oui. Basés dans le canton de Neuchâtel, nous travaillons aussi à distance avec des paysagistes à l'étranger, en français et en anglais.",
      },
    ],
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
