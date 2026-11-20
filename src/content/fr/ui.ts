// Interface strings that used to be hardcoded in components: screen-reader
// notes, aria labels, form states, the 404. English: content/en/ui.ts.
export const ui = {
  skipLink: "Aller au contenu",
  newTab: " (nouvel onglet)",
  homeLabel: "accueil",
  primaryNav: "Navigation principale",
  mobileNav: "Navigation mobile",
  footerNav: "Pied de page",
  openMenu: "Ouvrir le menu",
  closeMenu: "Fermer le menu",
  callLabel: "Appeler le",
  sending: "Envoi en cours…",
  perMonth: " / mois",
  rights: "Tous droits réservés.",
  backHome: "← Retour à l'accueil",
  updated: "Mise à jour :",
  // Around a quoted client (the /contact review). French spacing included.
  quoteOpen: "« ",
  quoteClose: " »",
  // Shown when a send fails, followed by the contact address.
  contactError: "Votre message n'a pas pu être envoyé. Écrivez-nous directement à",
  auditError: "Votre demande n'a pas pu être envoyée. Écrivez-nous directement à",
  // The header link to the same page in the other language. Written in that
  // language, with lang/hrefLang set on the link.
  switcher: {
    short: "EN",
    label: "English version",
    lang: "en",
  },
  notFound: {
    eyebrow: "404 / PAGE INTROUVABLE",
    before: "Cette page a ",
    accent: "poussé ailleurs.",
  },
} as const;
