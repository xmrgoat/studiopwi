// English copy for /en. Adapted from content/fr/site.ts for English-speaking
// landscaping businesses in Switzerland and abroad: plain words, short
// sentences, the same facts. The typecheck holds it to the French keys, and
// every number comes from content/facts.ts.
//
// Word choices: "quote" for "devis", "jobs" for "chantiers", "homepage
// mockup" for "maquette de la page d'accueil".
import { facts } from "../facts";
import { chf } from "../format";
import type { SiteCopy } from "../types";
import { names } from "./services";

const { tiers: t, care: c } = facts;
const WHATSAPP_TEXT = "Hi Studio PWI, I have a question about my website:";
const days = (d: readonly number[]) => `${d[0]}–${d[1]} business days`;

const ids = {
  main: "main",
  caseStudy: "case-study",
  about: "about",
  services: "services",
  process: "process",
  faq: "faq",
  contact: "contact",
} as const;

export const site = {
  name: facts.name,
  domain: facts.domain,
  tagline: "Websites for landscapers",
  address: "Route des Addoz 52 · 2017 Boudry · Switzerland",
  email: facts.email,
  phone: facts.phone,
  whatsapp: {
    number: facts.whatsapp,
    url: `https://wa.me/${facts.whatsappDigits}?text=${encodeURIComponent(WHATSAPP_TEXT)}`,
    label: "Message us on WhatsApp",
  },
  locale: "en",
  ids,

  callCta: "Get my free audit + mockup",
  booking: {
    url: facts.bookingUrl,
    label: "Pick a time",
  },
  founder: facts.founder,

  // Researched as English queries, not translated from the French ones:
  // "landscaping website design", "website design for landscapers",
  // "web design for landscaping companies". Title ≤ 60 with the
  // " · Studio PWI" suffix, description ≤ 155.
  seo: {
    title: "Website Design for Landscaping Companies",
    description: `Swiss web studio building websites for landscapers in Switzerland and abroad, made to get found on Google and bring in quote requests. From ${chf(t.showcase.price, "en")}.`,
    keywords: [
      "landscaping website design",
      "website design for landscapers",
      "web design for landscaping companies",
      "landscaper website",
      "landscaping company website",
      "web designer Switzerland",
      "web design Neuchâtel",
    ],
    ogAlt: `${facts.name} — Website design for landscapers`,
    ogKicker: "Switzerland — Web studio for landscapers",
    ogLine: "Attract more clients, get more quote requests and win better jobs.",
  },

  schema: {
    description:
      "Swiss web studio for landscapers. Websites built to turn visitors into quote requests, with support after launch included.",
    founderTitle: "Founder",
    knowsAbout: ["Website design", "Local SEO", "Landscaping"],
    cities: ["Neuchâtel", "Lausanne", "Geneva", "Fribourg"],
  },

  headerCta: { label: "Free audit", href: `#${ids.contact}` },
  nav: [
    { label: "About", href: `#${ids.about}` },
    { label: "Services", href: `#${ids.services}` },
    { label: "Our work", menu: "projects" },
    { label: "Contact", href: "/en/contact" },
  ],

  hero: {
    headline: "Websites for landscapers who want more jobs",
    lead:
      "We're based in Switzerland and build websites that help landscaping companies, wherever they are, attract more clients, get more quote requests and win better jobs.",
    primaryCta: { label: "Get my free audit + mockup", href: `#${ids.contact}` },
  },

  // Kept in step with the French block; only `form` is shown today. The
  // example stays anonymised: the audited firm has not agreed to appear.
  audit: {
    eyebrow: "Free",
    title: "Your website, audited for free",
    intro:
      "Send us your website address. We look at it the way a client looking for a landscaper would, then show you what stops it from bringing you quote requests.",
    deliverables: [
      {
        title: "Your website audit, as a PDF",
        delay: `Within ${days(facts.auditDays)}`,
        body:
          "A score out of 10, what already works, what makes visitors hesitate, and the top fixes. You can make most of them yourself.",
      },
      {
        title: "A mockup of your homepage",
        delay: `Within ${days(facts.draftDays)}`,
        body:
          "Your homepage redesigned with your photos and your story, so you can see the difference before you decide anything.",
      },
    ],
    example: {
      label: "From a real audit, anonymized",
      client: "A landscaper in the canton of Neuchâtel",
      scoreLabel: "Overall score",
      score: 5,
      scoreMax: 10,
      findings: [
        {
          label: "Strength",
          text: "A real family story, and already at the top of the Google map in its town.",
        },
        {
          label: "What holds it back",
          text: "No quote button at the top of the page, and no phone number on its Google listing: visitors don't know what to do.",
        },
        {
          label: "The fix",
          text: "5 changes, 4 of which the owner can make in about an hour.",
        },
      ],
      criteria: [
        { label: "Clear message", score: 6 },
        { label: "Call-to-action buttons", score: 4 },
        { label: "Trust", score: 5 },
        { label: "Mobile speed", score: 6 },
        { label: "Google visibility", score: 5 },
      ],
    },
    draft: {
      src: "/images/projects/o-paysage/desktop.webp",
      width: 1440,
      height: 1000,
      alt: "Homepage of the Ô Paysage website, designed by Studio PWI: a path toward the mountains and a free quote button",
      caption: "The level of finish of our mockups: here, the homepage we designed for Ô Paysage.",
    },
    scarcity: `${facts.auditsPerWeek} free audits per week, first come, first served.`,
    form: {
      title: "Free audit + homepage mockup",
      lead: `We review your website within ${days(facts.auditDays)}, then send you a mockup of your homepage within ${facts.draftDays[0]}–${facts.draftDays[1]} days. ${facts.auditsPerWeek} audits per week.`,
      name: { label: "Name", placeholder: "First and last name" },
      company: { label: "Company", placeholder: "Your company name" },
      site: {
        label: "Website",
        placeholder: "www.your-site.com",
        noSite: "No website yet",
      },
      email: { label: "Email", placeholder: "you@email.com" },
      submit: "Get my free audit + mockup",
      reassurance: "Free, no strings attached. The audit is yours to keep, even if we never work together.",
    },
  },

  whyUs: {
    title: "Why work with us?",
    paragraphs: [
      `We're based in the canton of Neuchâtel, Switzerland, and we've built **more than ${facts.sitesBuilt} websites across many industries.** That taught us what really turns a visitor into a client.`,
      "Like a landscaper who plans around the weather, we keep up with how the web changes, and we build **websites made to last.**",
    ],
    testimonialsTitle: "What a client says",
    cta: { label: "Get my free audit + mockup", href: `#${ids.contact}` },
    testimonials: [
      {
        // Jimi's own words: the part of the original English review that the
        // French site shows in translation.
        quote:
          "What stood out most was that he actually listened to what I wanted instead of just building something and calling it finished. He stayed involved until we got to the final product I was looking for. Really awesome guy to work with, and I'd definitely recommend Jean-Pierre to anyone looking for someone dependable, responsive, and committed to doing quality work.",
        author: "Jimi Builds",
        role: "",
      },
    ],
  },

  process: {
    title: "How we work",
    intro:
      "A clear, step-by-step process that turns your vision into a website that looks right and gets results.",
    steps: [
      {
        number: "1",
        title: `Discovery call: ${facts.callMinutes} min, free`,
        body: "We talk about your business, your goals and what your company needs.",
      },
      {
        number: "2",
        title: `Design and build: ${facts.buildWeeks[0]} to ${facts.buildWeeks[1]} weeks, depending on the plan`,
        body:
          "We plan, design and build your site around one goal: turning your visitors into clients.",
      },
      {
        number: "3",
        title: `Launch and support: ${facts.supportDays} days included`,
        body: "After launch, we stay available for technical fixes and small adjustments.",
      },
    ],
    cta: { label: "Get my free audit + mockup", href: `#${ids.contact}` },
  },

  // Question-style headings with direct 40–60 word answers, for search and AI
  // answer engines. Same facts as the French FAQ; where an answer is longer,
  // it only restates what the price cards already show.
  faq: {
    title: "Frequently asked questions",
    intro: "What landscapers ask us before we start.",
    items: [
      {
        question: "Can I edit my website myself?",
        answer: `No. To keep your site clean and fast, all changes go through us. They're included in our monthly care plans: ${c["care-essentiel"].edits} small change a month with ${names["care-essentiel"]}, ${c["care-pro"].edits} with ${names["care-pro"]} and ${c.retainer.edits} with ${names.retainer}. Without a plan, each request gets a fixed-price quote, from ${chf(facts.editPrice[0], "en")} to ${facts.editPrice[1]}.`,
      },
      {
        question: "Who takes care of hosting?",
        answer:
          "Your site is hosted by Vercel or Infomaniak, two well-known hosting providers. The hosting account is in your name, and we set it up and manage it for you. You own the account; we take care of the technical side, so you don't have to.",
      },
      {
        question: "What about the domain name?",
        answer: `You pay for the domain name, and it's registered in your name. Setting it up is included for free with every plan (${names.showcase}, ${names.growth} and ${names.partnership}), so your site goes live at your own address with no setup fee from us.`,
      },
      {
        question: "Who owns the website?",
        answer:
          "You do. The website and the domain name both belong to you, not to us. The hosting account is in your name too. We take care of the technical management for you, but the site and its address are yours.",
      },
      {
        question: "Can my website be in more than one language?",
        answer: `Yes. The ${names.showcase} plan includes ${t.showcase.languages} language, ${names.growth} up to ${t.growth.languages} and ${names.partnership} up to ${t.partnership.languages}. With ${names.partnership}, Studio PWI also writes the text for you. That's useful if your clients speak different languages, which is common in Switzerland.`,
      },
      {
        question: "Who writes the text?",
        answer: `You can send us your text, or we write it for ${chf(facts.copyPerPage, "en")} per page. With the ${names.partnership} plan, copywriting is included in the price. ${names.showcase} has ${t.showcase.pages} pages and ${names.growth} has ${t.growth.pages}, so you can work out the cost up front.`,
      },
      {
        question: "How does payment work?",
        answer: `Our prices are fixed, with no hourly billing. You pay a deposit when we start (${t.showcase.deposit}% for ${names.showcase}, ${t.growth.deposit}% for ${names.growth}, ${t.partnership.deposit}% for ${names.partnership}) and the rest on delivery. Timelines start once we have your deposit and your content.`,
      },
      {
        question: "How long does it take to build my website?",
        answer: `${t.showcase.weeks[0]} to ${t.showcase.weeks[1]} weeks for the ${names.showcase} plan, ${t.growth.weeks[0]} to ${t.growth.weeks[1]} weeks for ${names.growth} and ${t.partnership.weeks[0]} to ${t.partnership.weeks[1]} weeks for ${names.partnership}. The clock starts once we have your deposit and your content, so the sooner you send your text and photos, the sooner your site goes live.`,
      },
      {
        question: "Do you work outside Switzerland?",
        answer:
          "Yes. We're based in the canton of Neuchâtel, Switzerland, and we also work remotely with landscapers abroad, in French and English. One example is Jimi Builds, a landscaper in Colorado, USA, whose one-page website we designed and built.",
      },
    ],
  },

  contact: {
    title: "Contact us",
    lead:
      "Start with a free audit of your website and a mockup of your homepage. Got another question? Just use the form below.",
    trustSignals: [`Reply within ${facts.replyHours} hours`, "Free, no strings attached"],
    generalTitle: "Another question?",
    booking: {
      lead: "Rather talk it through?",
      note: "Opens Calendly in a new tab.",
    },
    phoneLabel: "Or call us",
    whatsappLead: "Quick question?",
    form: {
      name: { label: "Name", placeholder: "First and last name" },
      email: { label: "Email", placeholder: "you@email.com" },
      message: { label: "Message", placeholder: "What would you like to improve?" },
      submit: "Send my message",
      reassurance: `Reply within ${facts.replyHours} hours, free and no strings attached.`,
      offerPrefill: "I'm interested in the {plan} plan.",
    },
  },

  contactPage: {
    seo: {
      title: "Contact: Free Website Audit or a 30-Min Call",
      description: `Get a free audit of your website and a mockup of your homepage, or book a ${facts.callMinutes}-minute call. We reply within ${facts.replyHours} hours, no strings attached.`,
    },
    faq: {
      questions: [
        "How does payment work?",
        "How long does it take to build my website?",
        "Who takes care of hosting?",
        "Can my website be in more than one language?",
      ],
      more: { label: "See all questions", href: `/en#${ids.faq}` },
    },
    // Noelia's review, translated from French.
    quote: {
      text: "Fast, very professional service. Highly recommended!",
      author: "Noelia Krähenbühl",
    },
  },

  // /en/thank-you — the English contact leads, counted apart from /merci.
  thanks: {
    title: "Message received",
    body: `Thank you. We'll get back to you within ${facts.replyHours} hours. If you'd rather talk, book a ${facts.callMinutes}-minute call right now:`,
    bookingLabel: "Book my call now",
    nextCta: { label: "See our case study", href: `/en#${ids.caseStudy}` },
  },

  // /en/thank-you-audit — the English audit requests.
  auditThanks: {
    title: "Audit request received",
    body: `Thank you. Your audit will arrive by email within ${days(facts.auditDays)}, and your homepage mockup within ${days(facts.draftDays)}. If this week's ${facts.auditsPerWeek} audits are already taken, we'll email you right away with a date.`,
    nextCta: { label: "See our work", href: `/en#${ids.caseStudy}` },
  },

  footer: {
    email: facts.email,
    tagline: "Websites for landscapers",
    nav: [
      { label: "Home", href: `#${ids.main}` },
      { label: "About", href: `#${ids.about}` },
      { label: "Services", href: `#${ids.services}` },
      { label: "How we work", href: `#${ids.process}` },
      { label: "Contact", href: "/en/contact" },
    ],
    socialLabel: "Follow us",
    social: facts.social,
    legal: [
      { label: "Legal notice", href: "/en/legal-notice" },
      { label: "Privacy policy", href: "/en/privacy" },
      { label: "Terms of use", href: "/en/terms" },
    ],
  },
} as const satisfies SiteCopy;
