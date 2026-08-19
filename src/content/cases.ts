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
};

export const cases = {
  items: [
    {
      slug: "jimi-builds",
      // NOTE: the Figma titles this case "Jimi Builds" and links
      // www.jimibuilds.com, but the screenshot it uses is the Eco Garden site
      // (the local webp below is the same image). Either the client rebranded
      // and the screenshot is stale, or the title/URL belong to another
      // project. Confirm before launch — as written, the section shows one
      // brand and names another.
      client: "Jimi Builds",
      eyebrow: "Un projet paysagiste,",
      image: {
        src: "/images/case-studies/jimi-ecograden-herosection-website.webp",
        alt: "Page d'accueil du site Jimi Builds — aménagement paysager écologique",
        width: 2373,
        height: 1362,
      },
      siteUrl: "https://www.jimibuilds.com",
      siteLabel: "www.jimibuilds.com",
      inProduction: true,
      statusLabel: "En production",
      problemLabel: "Le problème :",
      // Desktop copy. The mobile frame carries a condensed variant of the same
      // paragraph; the fuller desktop wording is used at every breakpoint
      // rather than duplicating the string per viewport.
      problem:
        "L'entreprise, n'ayant pas de site web ni de présence en ligne, n'a aucun moyen de se faire trouver par quelqu'un qui aurait besoin de ses services, ni de lui faire savoir pourquoi il devrait la choisir. Cette personne ira donc chez un concurrent qui, lui, aura su le faire.",
      solutionLabel: "La solution :",
      solution:
        "Une landing page conçue pour présenter l'offre, rassurer les visiteurs et faciliter les demandes de devis.",
      cta: { label: "Démarrer un projet", href: "#contact" },
    },
  ] as const satisfies readonly CaseStudy[],
} as const;
