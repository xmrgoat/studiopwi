// Centralized copy for the site.
// Edit copy here; sections re-render automatically.
//
// Copy transcribed from the "Studio PWI Website draft" Figma file. Where the
// desktop and mobile frames disagreed, the choice is noted inline.

// WhatsApp Business. wa.me takes the number in international form, digits
// only; the text opens the chat with a first line already written.
const WHATSAPP = "+41 77 267 33 24";
const WHATSAPP_TEXT = "Bonjour Studio PWI, j'ai une question sur mon site web :";

export const site = {
  name: "Studio PWI",
  domain: "studiopwi.com",
  tagline: "Des sites web pour les paysagistes",
  address: "Route des Addoz 52 · 2017 Boudry · Suisse",
  email: "contact@studiopwi.com",
  // Click-to-call: when set (e.g. "+41 76 000 00 00"), a phone button appears
  // in the mobile header and the contact section. Left empty until confirmed.
  phone: null as string | null,
  // The quiet third route beside the form and Calendly, for a quick question
  // that doesn't need a call yet. A text link in the contact section and the
  // mobile menu, never a floating bubble: every CTA still promises the call.
  whatsapp: {
    number: WHATSAPP,
    url: `https://wa.me/${WHATSAPP.replace(/\D/g, "")}?text=${encodeURIComponent(WHATSAPP_TEXT)}`,
    label: "Écrire sur WhatsApp",
  },
  locale: "fr",

  // Every CTA promises the same thing — the free 30-minute discovery call —
  // so a visitor never wonders whether two buttons lead to different places.
  // Section buttons go to #contact, where the call can be booked directly
  // (Calendly) or requested through the form.
  callCta: "Réserver mon appel gratuit",
  booking: {
    url: "https://calendly.com/contact-studiopwi/30min",
    label: "Choisir un créneau",
  },
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

  // Header nav — the Figma header frame's three links, plus "Réalisations"
  // (November 2026), which opens the list of project pages (read from
  // `projects` in cases.ts) — and the header CTA, which stays reachable
  // however far down the page is read. "Contact" is the /contact page from
  // everywhere; the CTA scrolls to the form on the homepage and opens
  // /contact elsewhere (see HeaderBar).
  headerCta: { label: "Appel gratuit", href: "#contact" },
  // Order from the Figma Header and Mobile Menu components (November 2026),
  // the same in the bar and the phone drawer.
  nav: [
    { label: "À propos", href: "#pourquoi" },
    { label: "Services", href: "#services" },
    { label: "Réalisations", menu: "projects" },
    { label: "Contact", href: "/contact" },
  ],

  hero: {
    headline: "Des sites web pour les paysagistes qui veulent plus de chantiers",
    lead:
      "Basés en Suisse, nous concevons des sites qui aident les entreprises de paysagisme, où qu'elles soient, à attirer plus de clients, générer plus de demandes de devis et décrocher de meilleurs chantiers.",
    // Desktop reads "Démarrer un devis", mobile "Démarrer un projet". Mobile's
    // wording is the idiomatic one and matches the contact copy, so it wins.
    primaryCta: { label: "Réserver mon appel gratuit", href: "#contact" },
  },

  // The lead magnet (November 2026): a free audit of the visitor's site, then
  // a draft of their homepage. It replaces the call as the main promise of
  // the hero and header. Capacity is real — the owner does 5 a week — so the
  // scarcity line states a fact, not a countdown.
  //
  // The example is a real audit (November 2026), anonymised: the firm has
  // not agreed to appear, so nothing here may identify it (no name, town,
  // founding year, phone or photos). When it agrees, its own before/after
  // can replace the example and the draft image.
  audit: {
    eyebrow: "Offert",
    title: "Votre site, audité gratuitement",
    intro:
      "Envoyez-nous l'adresse de votre site. Nous le regardons comme un client qui cherche un paysagiste, puis nous vous montrons ce qui l'empêche de vous apporter des demandes de devis.",
    deliverables: [
      {
        title: "L'audit de votre site, en PDF",
        delay: "Sous 1 à 2 jours ouvrables",
        body:
          "Une note sur 10, ce qui fonctionne déjà, ce qui fait hésiter vos visiteurs et les corrections prioritaires, dont la plupart se font vous-même.",
      },
      {
        title: "Une maquette de votre page d'accueil",
        delay: "Sous 1 à 3 jours ouvrables",
        body:
          "Votre page d'accueil redessinée avec vos photos et votre histoire, pour voir la différence avant de décider quoi que ce soit.",
      },
    ],
    example: {
      label: "Extrait d'un audit réel, anonymisé",
      client: "Un paysagiste neuchâtelois",
      scoreLabel: "Note globale",
      score: 5,
      scoreMax: 10,
      findings: [
        {
          label: "Son atout",
          text: "Une vraie histoire de famille, et déjà en tête sur la carte Google dans sa ville.",
        },
        {
          label: "Le frein",
          text: "Aucun bouton de devis en haut de page, et pas de numéro sur sa fiche Google : le visiteur ne sait pas quoi faire.",
        },
        {
          label: "La solution",
          text: "5 changements, dont 4 qu'il peut faire lui-même en une heure environ.",
        },
      ],
      // Scores out of 10 from the same audit, criterion by criterion.
      criteria: [
        { label: "Clarté du message", score: 6 },
        { label: "Boutons d'action", score: 4 },
        { label: "Confiance", score: 5 },
        { label: "Vitesse sur mobile", score: 6 },
        { label: "Visibilité Google", score: 5 },
      ],
    },
    // The studio's own published work, labelled as such: the draft is built
    // to this standard. Not the audited firm's site.
    draft: {
      src: "/images/projects/o-paysage/desktop.webp",
      width: 1440,
      height: 1000,
      alt: "Page d'accueil du site Ô Paysage, conçue par Studio PWI : un chemin vers les montagnes et un bouton de devis gratuit",
      caption: "Le niveau de finition de nos maquettes : ici, la page d'accueil conçue pour Ô Paysage.",
    },
    scarcity: "5 audits gratuits par semaine, dans l'ordre des demandes.",
    form: {
      title: "Demander mon audit",
      name: { label: "Nom", placeholder: "Prénom et nom" },
      email: { label: "Email", placeholder: "votre@email.com" },
      site: {
        label: "Votre site web",
        placeholder: "www.votre-site.ch",
        hint: "Pas encore de site ? Indiquez le nom de votre entreprise et votre localité : nous partirons de votre fiche Google.",
      },
      submit: "Recevoir mon audit gratuit",
      reassurance: "Gratuit et sans engagement. L'audit est à vous, même si nous ne travaillons jamais ensemble.",
    },
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
    cta: { label: "Réserver mon appel gratuit", href: "#contact" },
    testimonials: [
      {
        // Translated from the English review in the desktop "Avis concret" frame.
        quote:
          "Il a vraiment écouté ce que je voulais, au lieu de livrer quelque chose et de considérer le travail terminé. Il est resté impliqué jusqu'à ce que nous obtenions exactement le résultat que je cherchais. Un vrai plaisir de travailler avec lui : je recommande Jean-Pierre sans hésiter à quiconque cherche quelqu'un de fiable, de réactif et réellement attaché à la qualité.",
        author: "Jimi Builds",
        role: "",
      },
      // Jimi's review only, as in the Figma "Avis concret" frame. Nicolas's
      // review lives on the Ô Paysage project page (cases.ts), not here.
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
    cta: { label: "Réserver mon appel gratuit", href: "#contact" },
  },

  // Answers the buyer questions ChatGPT and Perplexity found unanswered in the
  // October 2026 AI-visibility test (editing, hosting, ownership, languages).
  // Facts follow the October 2026 price list; keep them in step with it.
  faq: {
    title: "Questions fréquentes",
    intro: "Ce que les paysagistes nous demandent avant de démarrer.",
    items: [
      {
        question: "L'audit gratuit, qu'est-ce que je reçois ?",
        answer:
          "Sous 1 à 2 jours ouvrables, un PDF : une note sur 10, ce qui fonctionne, ce qui fait hésiter vos visiteurs et les corrections prioritaires. Sous 1 à 3 jours ouvrables, une maquette de votre page d'accueil. C'est gratuit et sans engagement ; nous en faisons 5 par semaine.",
      },
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
          "Le nom de domaine est à votre charge et enregistré à votre nom. Sa mise en place est offerte avec chacune de nos offres.",
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
    // The direct route: book the call without waiting for a reply.
    booking: {
      lead: "Vous préférez choisir l'horaire vous-même ?",
      note: "Ouvre Calendly dans un nouvel onglet.",
    },
    phoneLabel: "Ou appelez-nous",
    whatsappLead: "Une question rapide ?",
    form: {
      name: { label: "Nom", placeholder: "Prénom et nom" },
      email: { label: "Email", placeholder: "votre@email.com" },
      message: { label: "Message", placeholder: "Votre projet en quelques mots" },
      submit: "Envoyer ma demande",
      // Reassurance under the submit button, where the hesitation happens.
      reassurance: "Réponse sous 48 h · Appel de 30 min, gratuit et sans engagement.",
      // Prefilled into the message when a service card's button is used.
      offerPrefill: "Intéressé(e) par l'offre",
    },
  },

  // /contact — the homepage contact section as a page of its own, followed by
  // the FAQ (Figma "Contact — 1440" / "Mobile — Contact"). Its form lands on
  // /merci like the homepage's, so leads are counted the same way.
  contactPage: {
    seo: {
      title: "Contact : appel découverte gratuit de 30 minutes",
      description:
        "Parlez-nous de votre entreprise de paysagisme : formulaire, créneau en ligne ou WhatsApp. Réponse sous 48 h, appel découverte de 30 minutes gratuit et sans engagement.",
    },
    // Noelia Krähenbühl's review (nbk-interp.ch, an interpreter, not a
    // landscaper), shown on this page only.
    quote: {
      text: "Service rapide et très professionnelle, je recommande !",
      author: "Noelia Krähenbühl",
    },
  },

  // /merci — where the contact form lands after a successful send. Each view
  // of it is one lead in Vercel Analytics, so nothing else should link here.
  thanks: {
    title: "Message reçu",
    body:
      "Merci. Nous revenons vers vous sous 48 h ouvrées pour fixer votre appel découverte de 30 minutes. Pour aller plus vite, choisissez directement votre créneau :",
    bookingLabel: "Choisir mon créneau maintenant",
    nextCta: { label: "Voir notre étude de cas", href: "/#etude-de-cas" },
  },

  // /merci-audit — where the audit form lands. A page of its own so audit
  // requests and contact leads are counted apart in Vercel Analytics; same
  // rules as /merci (noindex, out of the sitemap, linked from nowhere).
  auditThanks: {
    title: "Demande d'audit reçue",
    body:
      "Merci. Votre audit arrive par email sous 1 à 2 jours ouvrables, la maquette de votre page d'accueil sous 1 à 3 jours ouvrables. Si les 5 audits de la semaine sont déjà pris, nous vous écrivons tout de suite avec une date.",
    nextCta: { label: "Voir nos réalisations", href: "/#etude-de-cas" },
  },

  footer: {
    email: "contact@studiopwi.com",
    tagline: "Des sites web pour les paysagistes",
    // The Figma Footer (November 2026): "Étude de cas" dropped, "À propos"
    // added after Accueil (the mobile frame's list, used at every size).
    nav: [
      { label: "Accueil", href: "#main" },
      { label: "À propos", href: "#pourquoi" },
      { label: "Services", href: "#services" },
      { label: "Notre démarche", href: "#demarche" },
      { label: "Contact", href: "/contact" },
    ],
    socialLabel: "Suivez-nous",
    // The label doubles as the icon key (lowercased → data-icon in Footer).
    // TODO(jp): the LinkedIn URL is a guess at the company page slug — confirm
    // or replace before launch. Facebook and Instagram are the owner's own.
    // The JSON-LD sameAs list is read from here.
    social: [
      { label: "LinkedIn", href: "https://www.linkedin.com/company/studiopwi" },
      { label: "Facebook", href: "https://www.facebook.com/studiopwi/" },
      { label: "Instagram", href: "https://www.instagram.com/studiopwi/" },
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
