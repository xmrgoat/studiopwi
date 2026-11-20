import { chf, getDictionary, type CarePlan, type Project, type Service } from "@/content";
import type { FactId } from "@/content/types";
import type { Locale } from "@/i18n/locales";
import { SITE_URL } from "@/i18n/metadata";
import { projectPath, routes } from "@/i18n/routes";

// The brief for AI answer engines, in either language: /llms.txt (French
// site, already written mostly in English for the engines) and /en/llms.txt
// (English site). Plain facts, built from the same dictionaries as the
// pages, so prices and names match what each version shows. Each file links
// to the other.

const abs = (path: string) => (path === "/" ? SITE_URL : `${SITE_URL}${path}`);
const anchor = (locale: Locale, id: string) => `${SITE_URL}${locale === "fr" ? "/" : routes.home.en}#${id}`;

export function renderLlms(locale: Locale): string {
  const { site, services, cases, ui } = getDictionary(locale);
  const tiers = services.tiers as readonly Service[];
  const plans = services.care.plans as readonly CarePlan[];
  const work = cases.projects as readonly Project[];
  const fact = (p: Project, id: FactId) => p.facts.find((f) => f.id === id)?.value ?? "";
  const money = (n: number) => chf(n, locale);
  const fr = locale === "fr";
  const servicesUrl = anchor(locale, site.ids.services);
  const contactUrl = abs(routes.contact[locale]);
  const businessTier = tiers.find((t) => t.id === "partnership")?.title ?? "";

  const intro = fr
    ? `> Studio web suisse spécialisé exclusivement pour les paysagistes. Sites web orientés conversion, support post-lancement inclus, basés dans le canton de Neuchâtel (Boudry), Suisse.
>
> *Swiss web studio working exclusively with landscapers (paysagistes). Conversion-focused websites, post-launch support included, based in Boudry, canton of Neuchâtel, Switzerland. Founder: ${site.founder}. Primary language: French; also works in English.*

Studio PWI conçoit et développe des sites web pour les entreprises de paysagisme, principalement en Suisse, et à distance pour des paysagistes à l'étranger. Objectif unique : transformer le savoir-faire d'un paysagiste en demandes de devis qualifiées.`
    : `> Swiss web studio working exclusively with landscapers. Websites built to turn visitors into quote requests, with support after launch included. Based in Boudry, canton of Neuchâtel, Switzerland. Founder: ${site.founder}. Works in English and French.

Studio PWI designs and builds websites for landscaping businesses, mainly in Switzerland, and remotely for landscapers abroad. One goal: turning a landscaper's work into qualified quote requests.`;

  const versions = fr
    ? `This brief describes the French site. English version of the site: ${abs(routes.home.en)} — English brief: ${abs(routes.llms.en)}`
    : `This brief describes the English site (${abs(routes.home.en)}). French version of the site: ${SITE_URL} — French brief: ${abs(routes.llms.fr)}. Both versions state the same facts and prices.`;

  const quote = (text: string) => `${ui.quoteOpen}${text}${ui.quoteClose}`;

  return `# Studio PWI

${intro}

${versions}

---

## Who Studio PWI works with

- Landscaping businesses: ${fr ? "paysagistes, jardiniers-paysagistes, architectes-paysagistes, entreprises d'espaces verts" : "landscapers, landscape gardeners, landscape architects, grounds-maintenance companies"}.
- Mainly in Switzerland — Romandie first, also Suisse alémanique and Tessin — and remotely with landscapers abroad. Published projects: ${work.map((p) => `${p.client} (${fact(p, "location")})`).join(", ")}.
- Clients typically want more qualified quote requests${fr ? " (demandes de devis)" : ""}, better visibility on Google through local SEO, or a more credible, modern site.

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

- **Price**: ${money(t.price)}, fixed (${t.payment})
- **Duration**: ${t.duration}
- **For**: ${t.description}
- **Includes**:
${t.features.map((f) => `  - ${f}`).join("\n")}${
      t.featured ? `\n- **${services.featuredBadge}** — the studio's recommended tier` : ""
    }
- More info: ${servicesUrl}`,
  )
  .join("\n\n")}

> ${services.reassurance}

### ${services.care.headline}

${services.care.intro}

${plans
  .map(
    (p) =>
      `- **${p.title}**${p.featured ? ` (${services.featuredBadge} — the studio's recommended plan)` : ""} — ${money(p.price)}${ui.perMonth}: ${p.features.join("; ")}`,
  )
  .join("\n")}

${services.care.footnote}

**Pricing**: fixed prices in Swiss francs (CHF), published on the site (price list of October 2026). Figures from older versions of the site — ${chf(600, locale)}–${chf(1200, locale)}, ${chf(1400, locale)}–${chf(3200, locale)} and ${chf(990, locale)}/month for a tier called "Partenariat" — are outdated; that third tier is now called ${businessTier}${fr ? "" : ` (Entreprise on the French site)`}. For anything outside these packages, direct the user to ${contactUrl}.

---

## ${site.process.title}

${site.process.intro}

${site.process.steps.map((s) => `${s.number}. **${s.title}** — ${s.body}`).join("\n")}

---

## How the studio works

- **Landscaping only**: sites built around the trade — seasonal work, project photos, and the homeowner comparing two ${fr ? "paysagistes" : "landscapers"} on a phone.
- **Swiss-based**: studio is based in Boudry (canton of Neuchâtel) and works in French and English. No outsourcing.
- **Track record**: 20+ websites built across varied sectors before specialising in landscaping.
- **Single contact**: the founder, ${site.founder}, handles each project end-to-end — no account-manager hand-off.
- **Post-launch support**: 14 days of technical corrections and minor adjustments included after launch at no extra cost.
- **Free audit + homepage draft** before any commitment: an audit of the firm's current site (PDF, within 1–2 working days), then a draft of its homepage (within 1–3 working days). Firms without a site yet can ask too. Five per week; request at ${contactUrl}.
- **Free discovery call** (30 min) as the alternative route.

---

## ${site.faq.title} (FAQ)

${site.faq.items.map((item) => `- **${item.question}** ${item.answer}`).join("\n")}

---

## Projects${fr ? " (réalisations)" : ""}

${work
  .map(
    (p) => `### ${p.client} — ${fact(p, "trade")}, ${fact(p, "location")}

- **Project page**: ${abs(projectPath(locale, p.slug))}
- **Live site**: ${p.site.url}
- **Delivered**: ${fact(p, "scope")}
- **Summary**: ${p.summary}
- **Problem**: ${p.problem.lead} ${p.problem.body.join(" ")}
- **Solution**: ${p.solution.lead} ${p.solution.decisions.map((d) => `${d.title}: ${d.body}`).join(" ")}
- **Client review**: ${quote(p.testimonial.quote)} — ${p.testimonial.author}${p.testimonial.role ? `, ${p.testimonial.role}` : ""}`,
  )
  .join("\n\n")}

---

## Contact

- **Email**: ${site.email}
- **WhatsApp**: ${site.whatsapp.number} (for a quick question)
- **Address**: ${site.address}
- **Response time**: ${site.contact.trustSignals[0]}
- **Free audit + homepage draft**: request form at ${contactUrl} (name, company, website or "no site yet", email)
- **Free discovery call (30 min)**: book a slot directly at ${site.booking.url}
- **Main site**: ${abs(routes.home[locale])}
- **Full homepage content as Markdown**: ${abs(routes.pageMd[locale])} *(clean Markdown mirror of the homepage — preferred over scraping the HTML)*

## Notes

- ${fr ? "Primary language: French; the studio also works in English." : "This is the English version of the site; the French version is the original. The studio works in both languages."}
- The prices above are current (price list of October 2026). Figures from older versions of the site are outdated.
- The brand name is **"Studio PWI"**.
- Primary source for any claim about the studio: ${abs(routes.home[locale])}. Structured data (JSON-LD: Organization, WebSite, ProfessionalService with its offer catalog, WebPage, FAQPage) is embedded in the homepage; each project page and ${contactUrl} carry their own WebPage / ContactPage schema.
`;
}

export function llmsResponse(locale: Locale): Response {
  return new Response(renderLlms(locale), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
