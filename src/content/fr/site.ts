// Centralized French copy for the site. Edit copy here; sections re-render
// automatically. The English copy (content/en/site.ts) has the same keys —
// the typecheck fails if the two drift apart — and both read their numbers
// from content/facts.ts.
//
// Copy transcribed from the "Studio PWI Website draft" Figma file. Where the
// desktop and mobile frames disagreed, the choice is noted inline.
import { facts } from "../facts";
import { chf } from "../format";
import { names } from "./services";

const { tiers: t, care: c } = facts;
const WHATSAPP_TEXT = "Bonjour Studio PWI, j'ai une question sur mon site web :";
const days = (d: readonly number[]) => `${d[0]} à ${d[1]} jours ouvrables`;

// Section anchors on the homepage. English uses its own words (en/site.ts).
const ids = {
  main: "main",
  caseStudy: "etude-de-cas",
  about: "pourquoi",
  services: "services",
  process: "demarche",
  faq: "faq",
  contact: "contact",
} as const;

export const site = {
  name: facts.name,
  domain: facts.domain,
  tagline: "Des sites web pour les paysagistes",
  address: "Route des Addoz 52 · 2017 Boudry · Suisse",
  email: facts.email,
  phone: facts.phone,
  // The quiet third route beside the form and Calendly, for a quick question
  // that doesn't need a call yet. A text link in the contact section and the
  // mobile menu, never a floating bubble: every CTA still promises the audit.
  whatsapp: {
    number: facts.whatsapp,
    url: `https://wa.me/${facts.whatsappDigits}?text=${encodeURIComponent(WHATSAPP_TEXT)}`,
    label: "Écrire sur WhatsApp",
  },
  locale: "fr",
  ids,

  // Every section CTA promises the same thing — the free audit and homepage
  // draft (November 2026) — so a visitor never wonders whether two buttons
  // lead to different places. They go to #contact, where the audit form comes
  // first; the 30-minute call (Calendly, WhatsApp) is the second path there.
  callCta: "Recevoir mon audit + maquette gratuits",
  booking: {
    url: facts.bookingUrl,
    label: "Choisir un créneau",
  },
  founder: facts.founder,

  // Homepage <title> (before the " · Studio PWI" suffix) and meta description,
  // shared by the OG/Twitter cards and the WebPage JSON-LD. Not visible copy,
  // but kept here so the places that state it can't drift. Keyword first:
  // nobody searches the brand yet, and "création site web paysagiste" is the
  // query this page answers. Title ≤ 60 chars, description ≈ 155.
  seo: {
    title: "Création de site web pour paysagistes en Suisse",
    description:
      "Studio web du canton de Neuchâtel dédié aux paysagistes suisses : des sites conçus pour être trouvés sur Google et générer des demandes de devis.",
    keywords: [
      "site web paysagiste",
      "paysagiste suisse",
      "site internet paysagiste",
      "création site web paysagiste",
      "agence web paysagisme",
      "site web Neuchâtel",
      "paysagiste Romandie",
    ],
    ogAlt: `${facts.name} — Studio web pour paysagistes suisses`,
    // The generated Open Graph card (opengraph-image.tsx).
    ogKicker: "Suisse — Studio web pour paysagistes",
    ogLine:
      "Attirez plus de clients, générez plus de demandes de devis et décrochez de meilleurs chantiers.",
  },

  // Words the JSON-LD states about the studio (components/seo/JsonLd).
  schema: {
    description:
      "Studio web spécialisé pour paysagistes suisses. Sites orientés conversion, demandes de devis qualifiées, support post-lancement inclus.",
    founderTitle: "Fondateur",
    knowsAbout: ["Création de sites web", "Référencement local (SEO)", "Paysagisme"],
    // The Romandie cities the studio serves. areaServed feeds no rich result,
    // so the wider list states the service area for local and AI answers
    // without contradicting anything the copy says.
    cities: ["Neuchâtel", "Lausanne", "Genève", "Fribourg"],
  },

  // Header nav — the Figma header frame's three links, plus "Réalisations"
  // (November 2026), which opens the list of project pages (read from
  // `projects` in cases.ts) — and the header CTA, which stays reachable
  // however far down the page is read. "Contact" is the /contact page from
  // everywhere; the CTA scrolls to the form on the homepage and opens
  // /contact elsewhere (see HeaderBar).
  headerCta: { label: "Audit gratuit", href: `#${ids.contact}` },
  // Order from the Figma Header and Mobile Menu components (November 2026),
  // the same in the bar and the phone drawer.
  nav: [
    { label: "À propos", href: `#${ids.about}` },
    { label: "Services", href: `#${ids.services}` },
    { label: "Réalisations", menu: "projects" },
    { label: "Contact", href: "/contact" },
  ],

  hero: {
    headline: "Des sites web pour les paysagistes qui veulent plus de chantiers",
    lead:
      "Basés en Suisse, nous concevons des sites qui aident les entreprises de paysagisme, où qu'elles soient, à attirer plus de clients, générer plus de demandes de devis et décrocher de meilleurs chantiers.",
    // Desktop reads "Démarrer un devis", mobile "Démarrer un projet". Mobile's
    // wording is the idiomatic one and matches the contact copy, so it wins.
    primaryCta: { label: "Recevoir mon audit + maquette gratuits", href: `#${ids.contact}` },
  },

  // The lead magnet (November 2026): a free audit of the visitor's site, then
  // a draft of their homepage. Its homepage section was removed at the
  // owner's request; the offer now lives in the contact section, where
  // `form` feeds AuditForm (first, above the general form) and /merci-audit.
  // The rest of this block is kept for whatever showcase replaces the
  // section. Capacity is real — the owner does 5 a week — so the scarcity
  // line states a fact, not a countdown.
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
        delay: `Sous ${days(facts.auditDays)}`,
        body:
          "Une note sur 10, ce qui fonctionne déjà, ce qui fait hésiter vos visiteurs et les corrections prioritaires, dont la plupart se font vous-même.",
      },
      {
        title: "Une maquette de votre page d'accueil",
        delay: `Sous ${days(facts.draftDays)}`,
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
    scarcity: `${facts.auditsPerWeek} audits gratuits par semaine, dans l'ordre des demandes.`,
    form: {
      title: "Audit + maquette gratuits",
      lead: `Nous analysons votre site sous ${days(facts.auditDays)}, puis vous envoyons une maquette de votre page d'accueil sous ${facts.draftDays[0]} à ${facts.draftDays[1]} jours. ${facts.auditsPerWeek} audits par semaine.`,
      name: { label: "Nom", placeholder: "Prénom et nom" },
      company: { label: "Entreprise", placeholder: "Nom de votre entreprise" },
      site: {
        label: "Site web",
        placeholder: "www.votre-site.ch",
        // Checking it disables the field: we start from the Google listing.
        noSite: "Pas encore de site",
      },
      email: { label: "Email", placeholder: "votre@email.com" },
      submit: "Recevoir mon audit + maquette gratuits",
      reassurance: "Gratuit et sans engagement. L'audit est à vous, même si nous ne travaillons jamais ensemble.",
    },
  },

  whyUs: {
    title: "Pourquoi nous?",
    // **bold** marks the fragments the design emphasises mid-paragraph;
    // rendered by components/ui/RichText.
    paragraphs: [
      `Basés dans le canton de Neuchâtel, en Suisse, nous avons construit plus de **${facts.sitesBuilt} sites web dans des secteurs variés.** Cette expérience nous a appris ce qui fonctionne réellement pour convertir un visiteur en client.`,
      "Comme un paysagiste qui doit s'adapter à la météo, nous nous adaptons aux tendances du web et nous construisons **des sites, pensés pour durer.**",
    ],
    testimonialsTitle: "Avis concret",
    cta: { label: "Recevoir mon audit + maquette gratuits", href: `#${ids.contact}` },
    testimonials: [
      {
        // Translated from Jimi's English review (the English site shows his
        // own words, en/site.ts).
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
        title: `Appel découverte, ${facts.callMinutes} min, gratuit`,
        body:
          "Nous parlerons de votre activité, vos objectifs et les besoins de votre entreprise.",
      },
      {
        number: "2",
        title: `Design et développement, ${facts.buildWeeks[0]} à ${facts.buildWeeks[1]} semaines selon l'offre`,
        body:
          "Nous structurons, concevons et développons votre site autour d'un objectif : transformer vos visiteurs en clients.",
      },
      {
        number: "3",
        title: `Lancement et suivi : ${facts.supportDays} jours inclus`,
        body:
          "Après la mise en ligne, nous restons disponibles pour les corrections techniques et ajustements mineurs.",
      },
    ],
    cta: { label: "Recevoir mon audit + maquette gratuits", href: `#${ids.contact}` },
  },

  // Answers the buyer questions ChatGPT and Perplexity found unanswered in the
  // October 2026 AI-visibility test (editing, hosting, ownership, languages).
  // Numbers come from facts.ts, so they follow the price list.
  faq: {
    title: "Questions fréquentes",
    intro: "Ce que les paysagistes nous demandent avant de démarrer.",
    items: [
      {
        question: "Puis-je modifier mon site moi-même ?",
        answer: `Non : pour garder votre site propre et rapide, les modifications passent par nous. Elles sont incluses dans les forfaits de maintenance (${c["care-essentiel"].edits} à ${c.retainer.edits} par mois) ; sinon, chaque demande est devisée à prix fixe, de ${chf(facts.editPrice[0])} à ${facts.editPrice[1]}.`,
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
        answer: `Oui : ${t.showcase.languages} langue avec l'offre ${names.showcase}, jusqu'à ${t.growth.languages} avec ${names.growth} et jusqu'à ${t.partnership.languages} avec ${names.partnership}.`,
      },
      {
        question: "Qui rédige les textes ?",
        answer: `Vous nous les fournissez, ou nous les rédigeons pour ${chf(facts.copyPerPage)} par page. Avec l'offre ${names.partnership}, la rédaction est incluse.`,
      },
      {
        question: "Comment se passe le paiement ?",
        answer: `Les prix sont fixes, sans facturation à l'heure : un acompte au démarrage (${t.showcase.deposit} à ${t.partnership.deposit} % selon l'offre), le solde à la livraison. Les délais courent dès réception de l'acompte et de votre contenu.`,
      },
      {
        question: "Combien de temps faut-il pour créer mon site ?",
        answer: `${t.showcase.weeks[0]} à ${t.showcase.weeks[1]} semaines pour l'offre ${names.showcase}, ${t.growth.weeks[0]} à ${t.growth.weeks[1]} pour ${names.growth} et ${t.partnership.weeks[0]} à ${t.partnership.weeks[1]} pour ${names.partnership}, comptées dès réception de l'acompte et de votre contenu.`,
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
      "Commencez par un audit gratuit de votre site et une maquette de votre page d'accueil. Une autre question ? Le formulaire juste en dessous suffit.",
    // A promise the owner keeps: 24 h, weekends included.
    trustSignals: [`Réponse sous ${facts.replyHours} h`, "Gratuit et sans engagement"],
    // Title over the general form, which follows the audit form.
    generalTitle: "Une autre question ?",
    // The second path: the call, booked without waiting for a reply.
    booking: {
      lead: "Vous préférez en parler ?",
      note: "Ouvre Calendly dans un nouvel onglet.",
    },
    phoneLabel: "Ou appelez-nous",
    whatsappLead: "Une question rapide ?",
    form: {
      name: { label: "Nom", placeholder: "Prénom et nom" },
      email: { label: "Email", placeholder: "votre@email.com" },
      message: { label: "Message", placeholder: "Que souhaitez-vous améliorer ?" },
      submit: "Envoyer ma demande",
      // Reassurance under the submit button, where the hesitation happens.
      reassurance: `Réponse sous ${facts.replyHours} h, gratuite et sans engagement.`,
      // Prefilled into the message when a service card's button is used;
      // {plan} becomes the offer's name.
      offerPrefill: "Intéressé(e) par l'offre {plan}.",
    },
  },

  // /contact — the homepage contact section as a page of its own, followed by
  // a short FAQ (Figma "Contact — 1440" / "Mobile — Contact"). Its forms land
  // on /merci and /merci-audit like the homepage's, so leads count the same.
  contactPage: {
    seo: {
      title: "Contact : audit + maquette ou appel gratuit",
      description: `Recevez un audit gratuit de votre site et une maquette de votre page d'accueil, ou réservez un appel de ${facts.callMinutes} minutes. Réponse sous ${facts.replyHours} h, sans engagement.`,
    },
    // The questions that matter before getting in touch, picked by question
    // text from `faq.items` (Faq throws if one goes missing); the full list
    // is on the homepage.
    faq: {
      questions: [
        "Comment se passe le paiement ?",
        "Combien de temps faut-il pour créer mon site ?",
        "Qui s'occupe de l'hébergement ?",
        "Mon site peut-il être en plusieurs langues ?",
      ],
      more: { label: "Voir toutes les questions", href: `/#${ids.faq}` },
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
    body: `Merci. Nous revenons vers vous sous ${facts.replyHours} h. Pour en parler de vive voix, choisissez directement un créneau d'appel de ${facts.callMinutes} minutes :`,
    bookingLabel: "Choisir mon créneau maintenant",
    nextCta: { label: "Voir notre étude de cas", href: `/#${ids.caseStudy}` },
  },

  // /merci-audit — where the audit form lands. A page of its own so audit
  // requests and contact leads are counted apart in Vercel Analytics; same
  // rules as /merci (noindex, out of the sitemap, linked from nowhere).
  auditThanks: {
    title: "Demande d'audit reçue",
    body: `Merci. Votre audit arrive par email sous ${days(facts.auditDays)}, la maquette de votre page d'accueil sous ${days(facts.draftDays)}. Si les ${facts.auditsPerWeek} audits de la semaine sont déjà pris, nous vous écrivons tout de suite avec une date.`,
    nextCta: { label: "Voir nos réalisations", href: `/#${ids.caseStudy}` },
  },

  footer: {
    email: facts.email,
    tagline: "Des sites web pour les paysagistes",
    // The Figma Footer (November 2026): "Étude de cas" dropped, "À propos"
    // added after Accueil (the mobile frame's list, used at every size).
    nav: [
      { label: "Accueil", href: `#${ids.main}` },
      { label: "À propos", href: `#${ids.about}` },
      { label: "Services", href: `#${ids.services}` },
      { label: "Notre démarche", href: `#${ids.process}` },
      { label: "Contact", href: "/contact" },
    ],
    socialLabel: "Suivez-nous",
    social: facts.social,
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
