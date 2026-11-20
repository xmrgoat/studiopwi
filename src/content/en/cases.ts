// English case studies and project pages, at /en/portfolio/<slug>. Same
// slugs, images and facts as content/fr/cases.ts. Client quotes are
// translated without a note (owner's choice); Jimi's is his own English.
import { site } from "./site";
import type { CasesCopy, CaseStudy, Project, Shot } from "../types";

const items = [
  {
    slug: "jimi-builds",
    client: "Jimi Builds",
    eyebrow: "A landscaping project,",
    image: {
      src: "/images/case-studies/JimiBuilds.webp",
      alt: "Homepage of the Jimi Builds website: eco-friendly landscaping",
      width: 2377,
      height: 1357,
    },
    siteUrl: "https://www.jimibuilds.com",
    siteLabel: "www.jimibuilds.com",
    inProduction: true,
    statusLabel: "Live",
    problemLabel: "The problem:",
    problem:
      "With no website and no online presence, the business had no way to be found by people who needed its services, or to show them why they should choose it. So those people went to a competitor who did.",
    solutionLabel: "The solution:",
    solution:
      "A landing page built to present the offer, reassure visitors and make it easy to ask for a quote.",
    cta: { label: "Let's talk about my project", href: "#contact" },
    detail: { label: "See the full project", href: "/en/portfolio/jimi-builds" },
  },
] as const satisfies readonly CaseStudy[];

// Picks up a review the homepage also shows, so it is written once.
function review(author: string) {
  const found = site.whyUs.testimonials.find((t) => t.author === author);
  if (!found) throw new Error(`No testimonial by "${author}" in site.whyUs`);
  return { quote: found.quote, author: found.author, role: found.role };
}

const shot = (slug: string, name: string, width: number, height: number, alt: string): Shot => ({
  src: `/images/projects/${slug}/${name}.webp`,
  alt,
  width,
  height,
});

const projectPage = {
  nextLabel: "Next project",
  cta: {
    href: "/en/contact",
    title: "Want a website\nlike this one?",
    lead: "Get an audit of your website and a mockup of your homepage. It's free.",
    note: "Free, no strings attached.",
  },
} as const;

const projects = [
  {
    slug: "jimi-builds",
    client: "Jimi Builds",
    seo: {
      title: "Jimi Builds: A Landscaper's Website in Colorado",
      description:
        "Case study: Jimi Builds, a landscaper in Colorado, had no website. Now one clear page presents the services and invites visitors to book an appointment.",
    },
    title: "Landscaper website\nin Colorado.",
    summary:
      "Jimi had no website. Now one clear page presents the services and invites people to get in touch.",
    facts: [
      { id: "trade", label: "Trade", value: "Landscaper" },
      { id: "location", label: "Location", value: "Colorado, USA" },
      { id: "scope", label: "What we did", value: "A one-page website" },
    ],
    site: { url: "https://www.jimibuilds.com", label: "jimibuilds.com" },
    problem: {
      title: "Your work deserves to be seen",
      lead: "Without a website, it's hard to get chosen.",
      body: [
        "People looking for a landscaper couldn't see Jimi's work or find out why to choose Jimi Builds. So they called a competitor.",
      ],
    },
    solution: {
      title: "One clear page\nthat makes people\nwant to call",
      lead: "A single page that explains what Jimi does and invites visitors to book an appointment.",
      decisions: [
        {
          title: "Speak to the right clients",
          body: "Right from the first screen: Colorado, and gardens that need little water.",
        },
        {
          title: "Easy to read",
          body: "The problem, the solution, then the prices: in the order people ask the questions.",
        },
        {
          title: "Easy to contact",
          body: "Buttons all along the page lead to a short form.",
        },
      ],
    },
    shots: {
      desktop: shot("jimi-builds", "desktop", 1440, 1000,
        "Jimi Builds homepage on a computer: a water-wise garden and the headline “Your Colorado lawn is costing you more than you think”"),
      mobile: shot("jimi-builds", "mobile", 390, 844,
        "The Jimi Builds website on a phone: the headline, the intro line and the appointment button on the first screen"),
      process: shot("jimi-builds", "process", 1440, 815,
        "The “How we turn high-maintenance lawns into eco-friendly gardens” section: three steps, from consultation to installation"),
      form: shot("jimi-builds", "form", 1824, 1039,
        "Consultation request form on the Jimi Builds website"),
    },
    captions: {
      mobileLabel: "On a phone",
      mobile: "The essentials show on the first screen.",
      process: "How it works, in 3 steps",
      form: "A short form to book an appointment",
    },
    testimonial: { title: "What Jimi says", ...review("Jimi Builds") },
    teaser: "A landscaper in Colorado.",
    next: "o-paysage",
  },
  {
    slug: "o-paysage",
    client: "Ô Paysage",
    seo: {
      title: "Ô Paysage: New Website for a Swiss Landscaper",
      description:
        "Case study: Nicolas Descloux, a landscaper in Saint-Aubin, Switzerland, had lost the old website. Our new three-page site makes quote requests easy.",
    },
    title: "Landscaper website\nin Saint-Aubin.",
    summary:
      "More than 140 projects and nearly 18 years in the trade. Nicolas had lost the old website, so we built a new one.",
    facts: [
      { id: "trade", label: "Trade", value: "Independent landscaper" },
      // "Saint-Aubin (FR)": FR is the canton of Fribourg, not France.
      { id: "location", label: "Location", value: "Saint-Aubin, canton of Fribourg (Broye region)" },
      { id: "scope", label: "What we did", value: "A 3-page website" },
    ],
    site: { url: "https://o-paysage.ch", label: "o-paysage.ch" },
    problem: {
      title: "A good landscaper,\na lost website",
      lead: "The old website no longer belonged to Nicolas.",
      body: [
        "Nicolas had lost access to the website. At its address, visitors found the old site one day, and an online casino or a “domain for sale” page the next.",
        "Not great for building trust, before the first call even happens.",
      ],
    },
    solution: {
      title: "A new website,\ntrue to Nicolas",
      lead: "Three pages: who Nicolas is, the services, and how to get in touch.",
      decisions: [
        {
          title: "A face and a name",
          body: "A photo, a name and years of experience: visitors know right away who they're dealing with.",
        },
        {
          title: "Clear services",
          body: "Five types of services, clearly separated. Everyone quickly finds what they're looking for.",
        },
        {
          title: "Easy quotes",
          body: "Buttons lead to a short form, so Nicolas knows right away what you need.",
        },
      ],
    },
    shots: {
      desktop: shot("o-paysage", "desktop", 1440, 1000,
        "Ô Paysage homepage on a computer: a path toward the mountains and the French headline “Un jardin impeccable toute l'année, sans les mauvaises surprises” (A spotless garden all year round, with no nasty surprises)"),
      mobile: shot("o-paysage", "mobile", 390, 844,
        "The Ô Paysage website on a phone: the headline and the free quote button on the first screen"),
      process: shot("o-paysage", "process", 1440, 916,
        "The “Votre jardin entretenu, en 5 étapes simples” (Your garden cared for, in 5 simple steps) section of the Ô Paysage website"),
      form: shot("o-paysage", "form", 1440, 859,
        "Quote request form on the Ô Paysage website, with Nicolas's contact details"),
    },
    captions: {
      mobileLabel: "On a phone",
      mobile: "The free quote button shows on the first screen.",
      process: "How it works, in 5 steps",
      form: "A short form to request a quote",
    },
    testimonial: {
      title: "What Nicolas says",
      quote:
        "Jean-Pierre understood very quickly what I wanted: clear communication and efficiency! All at very fair prices. I can't recommend it enough.",
      author: "Nicolas Descloux",
      role: "Ô Paysage",
    },
    teaser: "A landscaper in Saint-Aubin, Switzerland.",
    next: "jimi-builds",
  },
] as const satisfies readonly Project[];

export const cases = { items, projectPage, projects } as const satisfies CasesCopy;
