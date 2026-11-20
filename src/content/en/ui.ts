// English interface strings (see content/fr/ui.ts).
import type { UiCopy } from "../types";

export const ui = {
  skipLink: "Skip to content",
  newTab: " (opens in a new tab)",
  homeLabel: "home",
  primaryNav: "Main navigation",
  mobileNav: "Mobile navigation",
  footerNav: "Footer",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  callLabel: "Call",
  sending: "Sending…",
  perMonth: " / month",
  rights: "All rights reserved.",
  backHome: "← Back to home",
  updated: "Updated:",
  quoteOpen: "“",
  quoteClose: "”",
  contactError: "Your message couldn't be sent. Email us directly at",
  auditError: "Your request couldn't be sent. Email us directly at",
  switcher: {
    short: "FR",
    label: "Version française",
    lang: "fr",
  },
  // Keeps the French pun: the page has "grown" somewhere else.
  notFound: {
    eyebrow: "404 / PAGE NOT FOUND",
    before: "This page has ",
    accent: "grown elsewhere.",
  },
} as const satisfies UiCopy;
