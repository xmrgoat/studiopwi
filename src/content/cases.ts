import { site } from "./site";

export type CaseStudy = {
  slug: string;
  client: string;
  eyebrow: string;
  image: { src: string; alt: string; width: number; height: number };
  siteUrl?: string;
  siteLabel?: string;
  inProduction?: boolean;
  statusLabel?: string;
  problemLabel: string;
  problem: string;
  solutionLabel: string;
  solution: string;
  cta: { label: string; href: string };
  /** The full project page, linked under the CTA. */
  detail?: { label: string; href: string };
};

export const cases = {
  items: [
    {
      slug: "jimi-builds",
      client: "Jimi Builds",
      eyebrow: "Un projet paysagiste,",
      image: {
        src: "/images/case-studies/JimiBuilds.webp",
        alt: "Page d'accueil du site Jimi Builds — aménagement paysager écologique",
        width: 2377,
        height: 1357,
      },
      siteUrl: "https://www.jimibuilds.com",
      siteLabel: "www.jimibuilds.com",
      inProduction: true,
      statusLabel: "En direct",
      problemLabel: "Le problème :",
      // Desktop copy. The mobile frame carries a condensed variant of the same
      // paragraph; the fuller desktop wording is used at every breakpoint
      // rather than duplicating the string per viewport.
      problem:
        "L'entreprise, n'ayant pas de site web ni de présence en ligne, n'a aucun moyen de se faire trouver par quelqu'un qui aurait besoin de ses services, ni de lui faire savoir pourquoi il devrait la choisir. Cette personne ira donc chez un concurrent qui, lui, aura su le faire.",
      solutionLabel: "La solution :",
      solution:
        "Une landing page conçue pour présenter l'offre, rassurer les visiteurs et faciliter les demandes de devis.",
      cta: { label: "Discuter de mon projet", href: "#contact" },
      detail: { label: "Voir le projet en détail", href: "/portfolio/jimi-builds" },
    },
  ] as const satisfies readonly CaseStudy[],
} as const;

// ── Project pages (/portfolio/[slug]) ───────────────────────────────────────
// Copy transcribed from the Figma "Projet — …" frames (November 2026). Strings
// with "\n" break where the frame breaks its headline; on narrow screens the
// lines also wrap on their own.

export type Shot = { src: string; alt: string; width: number; height: number };

export type Project = {
  slug: string;
  client: string;
  /** <title> (before " · Studio PWI") and meta description. ≤ 60 / ≈ 155. */
  seo: { title: string; description: string };
  title: string;
  summary: string;
  facts: readonly { label: string; value: string }[];
  site: { url: string; label: string };
  problem: { title: string; lead: string; body: readonly string[] };
  solution: {
    title: string;
    lead: string;
    decisions: readonly { title: string; body: string }[];
  };
  shots: { desktop: Shot; mobile: Shot; process: Shot; form: Shot };
  captions: { mobileLabel: string; mobile: string; process: string; form: string };
  testimonial: { title: string; quote: string; author: string; role: string };
  /** One line under the client name in the "Projet suivant" link. */
  teaser: string;
  next: string;
};

// A project page that quotes a review the homepage also shows picks it up from
// site.whyUs.testimonials by author, so it is written once. A review the owner
// keeps off the homepage (Ô Paysage) is written on its project below.
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

export const projectPage = {
  nextLabel: "Projet suivant",
  // Labelled site.callCta, the one promise every CTA makes: the free call.
  cta: {
    href: "/contact",
    title: "Envie d'un site\ncomme celui-ci ?",
    lead: "Parlons de votre entreprise pendant 30 minutes. C'est gratuit.",
    note: "Gratuit et sans engagement.",
  },
} as const;

export const projects = [
  {
    slug: "jimi-builds",
    client: "Jimi Builds",
    seo: {
      title: "Jimi Builds : le site web d'un paysagiste au Colorado",
      description:
        "Étude de cas : Jimi Builds, paysagiste au Colorado, n'avait pas de site. Une page claire présente aujourd'hui ses services et invite à demander un rendez-vous.",
    },
    title: "Site web paysagiste\nau Colorado.",
    summary:
      "Jimi n'avait pas de site. Aujourd'hui, une page claire présente ses services et invite à le contacter.",
    facts: [
      { label: "Métier", value: "Paysagiste" },
      { label: "Lieu", value: "Colorado, États-Unis" },
      { label: "Ce que nous avons fait", value: "Un site d'une page" },
    ],
    site: { url: "https://www.jimibuilds.com", label: "jimibuilds.com" },
    // The desktop frame's headline. The mobile frame still carries the older
    // "Du bon travail. Mais introuvable en ligne" — desktop is the newer edit.
    problem: {
      title: "Votre travail mérite d'être vu",
      lead: "Sans site, difficile d'être choisi.",
      body: [
        "Quelqu'un qui cherchait un paysagiste ne pouvait ni voir son travail, ni savoir pourquoi le choisir. Il appelait donc un concurrent.",
      ],
    },
    solution: {
      title: "Une page claire\nqui donne envie\nd'appeler",
      lead: "Une seule page qui explique ce que fait Jimi et invite à demander un rendez-vous.",
      decisions: [
        {
          title: "Parler à ses clients",
          body: "Dès le premier écran : le Colorado et des jardins qui demandent peu d'eau.",
        },
        {
          title: "Facile à lire",
          body: "Le problème, la solution, puis les prix : dans l'ordre où l'on se pose les questions.",
        },
        {
          title: "Facile à contacter",
          body: "Des boutons, tout au long de la page, mènent à un formulaire court.",
        },
      ],
    },
    shots: {
      desktop: shot("jimi-builds", "desktop", 1440, 1000,
        "Page d'accueil du site Jimi Builds sur ordinateur : un jardin sobre en eau et le titre « Your Colorado lawn is costing you more than you think »"),
      mobile: shot("jimi-builds", "mobile", 390, 844,
        "Le site Jimi Builds sur téléphone : le titre, l'accroche et le bouton de rendez-vous dès le premier écran"),
      process: shot("jimi-builds", "process", 1440, 815,
        "Section « How we turn high-maintenance lawns into eco-friendly gardens » : les trois étapes, de la consultation à l'installation"),
      form: shot("jimi-builds", "form", 1824, 1039,
        "Formulaire de demande de consultation du site Jimi Builds"),
    },
    captions: {
      mobileLabel: "Sur téléphone",
      mobile: "L'essentiel est visible dès le premier écran.",
      process: "Comment ça marche, en 3 étapes",
      form: "Un formulaire court pour demander un rendez-vous",
    },
    // Desktop reads "Ce que Jimi en pense", mobile "Ce qu'en dit Jimi"; the
    // mobile wording matches the Ô Paysage page, so both pages read alike.
    testimonial: { title: "Ce qu'en dit Jimi", ...review("Jimi Builds") },
    teaser: "Un paysagiste au Colorado.",
    next: "o-paysage",
  },
  {
    slug: "o-paysage",
    client: "Ô Paysage",
    seo: {
      title: "Ô Paysage : le nouveau site d'un paysagiste à Saint-Aubin",
      description:
        "Étude de cas : Nicolas Descloux, paysagiste à Saint-Aubin (FR), avait perdu son site. Nous lui en avons créé un nouveau, de trois pages, qui facilite les demandes de devis.",
    },
    title: "Site web paysagiste\nà Saint-Aubin.",
    summary:
      "Plus de 140 projets et bientôt 18 ans de métier. Nicolas avait perdu son ancien site : nous lui en avons fait un nouveau.",
    facts: [
      { label: "Métier", value: "Paysagiste indépendant" },
      { label: "Lieu", value: "Saint-Aubin (FR), dans la Broye" },
      { label: "Ce que nous avons fait", value: "Un site de 3 pages" },
    ],
    site: { url: "https://o-paysage.ch", label: "o-paysage.ch" },
    problem: {
      title: "Un bon paysagiste\nun site perdu",
      lead: "Son ancien site ne lui appartenait plus.",
      body: [
        "Nicolas n'avait plus accès à son site. À son adresse, on tombait tantôt sur l'ancien site, tantôt sur un casino en ligne ou une page « domaine à vendre ».",
        "Pas idéal pour donner confiance, avant même le premier appel.",
      ],
    },
    solution: {
      title: "Un site neuf,\nà son image",
      lead: "Trois pages : qui est Nicolas, ce qu'il fait, et comment le contacter.",
      decisions: [
        {
          title: "Un visage, un nom",
          body: "Sa photo, son nom et son expérience : on sait tout de suite à qui on parle.",
        },
        {
          title: "Des services clairs",
          body: "Cinq types de services, bien séparés. Chacun trouve vite ce qu'il cherche.",
        },
        {
          title: "Un devis facile",
          body: "Des boutons mènent à un formulaire court. Nicolas sait tout de suite ce dont vous avez besoin.",
        },
      ],
    },
    shots: {
      desktop: shot("o-paysage", "desktop", 1440, 1000,
        "Page d'accueil du site Ô Paysage sur ordinateur : un chemin vers les montagnes et le titre « Un jardin impeccable toute l'année, sans les mauvaises surprises »"),
      mobile: shot("o-paysage", "mobile", 390, 844,
        "Le site Ô Paysage sur téléphone : le titre et le bouton de devis gratuit dès le premier écran"),
      process: shot("o-paysage", "process", 1440, 916,
        "Section « Votre jardin entretenu, en 5 étapes simples » du site Ô Paysage"),
      form: shot("o-paysage", "form", 1440, 859,
        "Formulaire de demande de devis du site Ô Paysage, avec les coordonnées de Nicolas"),
    },
    captions: {
      mobileLabel: "Sur téléphone",
      mobile: "Le devis gratuit se voit dès le premier écran.",
      process: "Comment ça marche, en 5 étapes",
      form: "Un formulaire court pour demander un devis",
    },
    // Nicolas's review, lightly corrected with his wording kept (owner
    // approved, November 2026). The 👌 he ended with is left out. Shown here
    // only: the owner keeps it off the homepage.
    testimonial: {
      title: "Ce qu'en dit Nicolas",
      quote:
        "Jean-Pierre a très vite compris ce que je souhaitais : communication claire et efficacité ! Le tout à des tarifs tout à fait corrects. Je ne peux que recommander.",
      author: "Nicolas Descloux",
      role: "Ô Paysage",
    },
    teaser: "Un paysagiste à Saint-Aubin (FR).",
    next: "jimi-builds",
  },
] as const satisfies readonly Project[];

export function getProject(slug: string): Project | undefined {
  return (projects as readonly Project[]).find((p) => p.slug === slug);
}
