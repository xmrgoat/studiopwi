// Centralized copy for the site.
// Edit copy here; sections re-render automatically.

export const site = {
  name: "Studio",
  domain: "studio.ch",
  tagline: "Web studio for Swiss landscapers.",
  address: "Rue de la Treille 2 · 2000 Neuchâtel · Switzerland",
  email: "hello@studio.ch",
  locale: "fr",

  nav: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#why" },
    { label: "Journal", href: "/journal" },
  ],

  hero: {
    eyebrow: "(CH) — Web studio for landscapers",
    // The italic word/phrase per §8.2 — kept as a single token here.
    // Component will render `accent` in Fraunces Italic + brand color.
    headline: {
      before: "We build the",
      accent: "impossible",
      after: "for those who grow it.",
    },
    lead:
      "Websites built for Swiss landscapers. Designed to grow your business — not just your online presence.",
    primaryCta: { label: "Start a project", href: "#contact" },
    secondaryCta: { label: "See our work", href: "#work" },
    metrics: [
      { value: 12, label: "Projects" },
      { value: 90, label: "Days" },
      { value: 1, label: "Contact" },
      { value: 24, label: "h Reply", suffix: "h" },
    ],
    video: {
      src: "/videos/flower.mp4",
      poster: "/images/flower-poster.webp",
    },
  },

  credibility: {
    label: "Trusted by Swiss landscapers",
    logos: [
      { name: "Jardins Dupont", src: "/images/logos/dupont.svg" },
      { name: "Paysage Müller", src: "/images/logos/muller.svg" },
      { name: "VertCH", src: "/images/logos/vertch.svg" },
      { name: "Espaces Verts SA", src: "/images/logos/espaces-verts.svg" },
      { name: "Atelier Vert", src: "/images/logos/atelier-vert.svg" },
    ],
  },

  problem: {
    marker: { number: "02", label: "THE PROBLEM" },
    headline: {
      before: "You craft outdoor spaces. Your website is still",
      accent: "stuck in 2015.",
      after: "",
    },
    lead:
      "Most Swiss landscapers lose qualified leads every week — not because they're bad at what they do, but because their online presence doesn't match the quality of their work.",
    points: [
      {
        number: "01",
        title: "Invisible on Google",
        body:
          "82% of homeowners search online before calling. If you're not on page one for « paysagiste [your city] », you're not in the conversation.",
      },
      {
        number: "02",
        title: "Generic templates",
        body:
          "A Wix template from 2019 tells prospects you're cheap — or worse, that you don't care about details. The opposite of who you are.",
      },
      {
        number: "03",
        title: "No proof, no price",
        body:
          "Beautiful projects buried three clicks deep. No idea what things cost. Prospects bounce to whoever makes it easy.",
      },
    ],
  },

  whyUs: {
    marker: { number: "05", label: "WHY US" },
    claim: {
      before: "We work with",
      accent: "landscapers only.",
      after: "So we know what works.",
    },
    badges: [
      "100% Swiss. Based in Romandie.",
      "Niche-only studio. Landscapers only.",
      "One contact. From brief to launch.",
      "90-day satisfaction guarantee.",
    ],
    process: [
      {
        number: "01",
        title: "Discovery call",
        duration: "30 min, free",
        body:
          "We listen, you talk shop. We map your goals, your audience and what we can realistically promise.",
      },
      {
        number: "02",
        title: "Design & build",
        duration: "3 to 5 weeks",
        body:
          "One designer, one developer. Weekly previews. You sign off at each stage. No surprises.",
      },
      {
        number: "03",
        title: "Launch & grow",
        duration: "Ongoing",
        body:
          "We don't ghost you after go-live. 90 days of optimization included. Real humans, real replies.",
      },
    ],
    guarantee: {
      label: "90-DAY GUARANTEE",
      title:
        "If it doesn't grow your business, we keep working until it does.",
      body:
        "Within 90 days of launch, if you haven't seen measurable improvement in qualified leads, we extend the engagement at no cost — until the numbers move.",
    },
    finalCta: {
      headline: {
        before: "Ready to",
        accent: "plant the seed?",
        after: "",
      },
      lead:
        "Book a free 20-minute discovery call. We'll tell you within the hour whether we're a good fit.",
      primary: { label: "Book a discovery call", href: "#contact" },
      secondary: { label: "Or write us — hello@studio.ch", href: "mailto:hello@studio.ch" },
      founder: { name: "Riff", role: "founder", photo: "/images/founder.webp" },
    },
  },

  footer: {
    newsletter: {
      title: "Get one editorial email every season.",
      subtitle: "No spam. Unsubscribe anytime.",
      placeholder: "your@email.com",
    },
    legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Imprint", href: "/imprint" },
    ],
    socials: [
      { label: "LinkedIn", href: "https://linkedin.com/company/studio" },
      { label: "Instagram", href: "https://instagram.com/studio" },
    ],
    signature: "Built with care in Switzerland.",
  },
} as const;

export type Site = typeof site;
