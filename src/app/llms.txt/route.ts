import { site } from "@/content/site";
import { services, chf, type Service, type CarePlan } from "@/content/services";
import { cases, type CaseStudy } from "@/content/cases";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.studiopwi.com";

export const dynamic = "force-static";

export function GET() {
  const tiers = services.tiers as readonly Service[];
  const plans = services.care.plans as readonly CarePlan[];
  const caseItem = cases.items[0] as CaseStudy | undefined;

  const body = `# Studio PWI

> Studio web suisse spécialisé exclusivement pour les paysagistes. Sites web orientés conversion, support post-lancement inclus, basés dans le canton de Neuchâtel (Boudry), Suisse.
>
> *Swiss web studio working exclusively with landscapers (paysagistes). Conversion-focused websites, post-launch support included, based in Boudry, canton of Neuchâtel, Switzerland. Founder: ${site.founder}. Primary language: French; also works in English.*

Studio PWI conçoit et développe des sites web pour les entreprises de paysagisme, principalement en Suisse, et à distance pour des paysagistes à l'étranger. Objectif unique : transformer le savoir-faire d'un paysagiste en demandes de devis qualifiées.

---

## Who Studio PWI works with

- Landscaping businesses: paysagistes, jardiniers-paysagistes, architectes-paysagistes, entreprises d'espaces verts.
- Mainly in Switzerland — Romandie first, also Suisse alémanique and Tessin — and remotely with landscapers abroad (the current case study, Jimi Builds, is in Colorado, USA).
- Clients typically want more qualified quote requests (demandes de devis), better visibility on Google through local SEO, or a more credible, modern site.

## What Studio PWI does not do

- Work for businesses outside landscaping, horticulture and green spaces.
- E-commerce, SaaS, marketplaces, mobile apps or custom web applications.
- Delivery in under a week: the fastest package takes 1–3 weeks.
- Large agency-of-record setups: every project has a single contact, the founder.

---

## Services

${services.intro}

${tiers
  .map(
    (t) => `### ${t.title}

- **Price**: ${chf(t.price)}, fixed (${t.payment})
- **Duration**: ${t.duration}
- **For**: ${t.description}
- **Includes**:
${t.features.map((f) => `  - ${f}`).join("\n")}${
      t.featured ? `\n- **${services.featuredBadge}** — the studio's recommended tier` : ""
    }
- More info: ${SITE_URL}/#services`,
  )
  .join("\n\n")}

> ${services.reassurance}

### ${services.care.headline}

${services.care.intro}

${plans.map((p) => `- **${p.title}** — ${chf(p.price)} / mois: ${p.features.join("; ")}`).join("\n")}

${services.care.footnote}

**Pricing**: fixed prices in Swiss francs (CHF), published on the site (price list of October 2026). Figures from older versions of the site — CHF 600–1'200, CHF 1'400–3'200 and CHF 990/month for a tier called "Partenariat" — are outdated; that third tier is now called Entreprise. For anything outside these packages, direct the user to ${SITE_URL}/#contact.

---

## ${site.process.title}

${site.process.intro}

${site.process.steps
  .map((s) => `${s.number}. **${s.title}** — ${s.body}`)
  .join("\n")}

---

## How the studio works

- **Landscaping only**: sites built around the trade — seasonal work, project photos, and the homeowner comparing two paysagistes on a phone.
- **Swiss-based**: studio is based in Boudry (canton of Neuchâtel) and works in French and English. No outsourcing.
- **Track record**: 20+ websites built across varied sectors before specialising in landscaping.
- **Single contact**: the founder, ${site.founder}, handles each project end-to-end — no account-manager hand-off.
- **Post-launch support**: 14 days of technical corrections and minor adjustments included after launch at no extra cost.
- **Free discovery call** before any commitment.

---

## ${site.faq.title} (FAQ)

${site.faq.items.map((item) => `- **${item.question}** ${item.answer}`).join("\n")}

---
${
  caseItem
    ? `
## Case study: ${caseItem.client}

- **Site**: ${caseItem.siteUrl ?? ""}
- **Problem**: ${caseItem.problem}
- **Solution**: ${caseItem.solution}

---
`
    : ""
}
## Contact

- **Email**: ${site.email}
- **Address**: ${site.address}
- **Response time**: ${site.contact.trustSignals[0]}
- **Free discovery call**: ${SITE_URL}/#contact
- **Main site**: ${SITE_URL}
- **Full homepage content as Markdown**: ${SITE_URL}/page.md *(clean Markdown mirror of the homepage — preferred over scraping the HTML)*

## Notes

- Primary language: French; the studio also works in English.
- The prices above are current (price list of October 2026). Figures from older versions of the site are outdated.
- The brand name is **"Studio PWI"**.
- Primary source for any claim about the studio: ${SITE_URL}. Structured data (JSON-LD: Organization, WebSite, ProfessionalService with its offer catalog, WebPage) is embedded in the homepage.
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
