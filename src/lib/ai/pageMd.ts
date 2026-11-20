import { chf, getDictionary, type CarePlan, type CaseStudy, type Service } from "@/content";
import type { Locale } from "@/i18n/locales";
import { SITE_URL } from "@/i18n/metadata";
import { routes } from "@/i18n/routes";

// Markdown mirror of the homepage, in either language: /page.md and
// /en/page.md. Built from the same dictionaries as the page, so it can't say
// anything the page doesn't. Each links to the other.

const LABELS = {
  fr: {
    heading: "Sites web pour paysagistes suisses",
    summary:
      "Studio web spécialisé pour paysagistes suisses. Sites orientés conversion, demandes de devis qualifiées, support post-lancement inclus. Basés dans le canton de Neuchâtel.",
    canonical: "Site canonique",
    language: "Langue",
    languageValue: "français (fr-CH)",
    otherVersion: "Version anglaise",
    address: "Adresse",
    primaryAction: "Action principale",
    project: "Réalisation",
    site: "Site",
    price: "Prix",
    fixed: "prix fixe",
    duration: "Durée",
    includes: "Inclut :",
    moreInfo: "Plus d'infos",
    requestAudit: "Demander l'audit",
    alsoOn: "aussi sur",
    generalForm: "Formulaire de contact (nom, email, message)",
    bookCall: "Réserver un appel de 30 minutes",
    meta: "Métadonnées",
    name: "Nom",
    domain: "Domaine",
    area: "Zone d'intervention",
    areaValue:
      "Suisse (CH) principalement ; à distance pour des paysagistes à l'étranger (ex. Colorado, États-Unis)",
    founder: "Fondateur",
    html: "Site web (HTML)",
    brief: "Brief pour IA",
    sep: " :",
    listSep: " ; ",
  },
  en: {
    heading: "Websites for landscapers",
    summary:
      "Swiss web studio for landscapers. Websites built to turn visitors into quote requests, with support after launch included. Based in the canton of Neuchâtel, Switzerland.",
    canonical: "Canonical site",
    language: "Language",
    languageValue: "English (en)",
    otherVersion: "French version",
    address: "Address",
    primaryAction: "Main action",
    project: "Project",
    site: "Website",
    price: "Price",
    fixed: "fixed price",
    duration: "Duration",
    includes: "Includes:",
    moreInfo: "More info",
    requestAudit: "Request the audit",
    alsoOn: "also at",
    generalForm: "Contact form (name, email, message)",
    bookCall: "Book a 30-minute call",
    meta: "Metadata",
    name: "Name",
    domain: "Domain",
    area: "Service area",
    areaValue:
      "Mainly Switzerland (CH); remotely for landscapers abroad (e.g. Colorado, USA)",
    founder: "Founder",
    html: "Website (HTML)",
    brief: "AI brief",
    sep: ":",
    listSep: "; ",
  },
} as const;

// Strips the **bold** markers the content files carry for on-page emphasis.
const plain = (text: string) => text.replace(/\*\*/g, "");
const abs = (path: string) => (path === "/" ? SITE_URL : `${SITE_URL}${path}`);

export function renderPageMd(locale: Locale): string {
  const { site, services, cases, ui } = getDictionary(locale);
  const L = LABELS[locale];
  const other: Locale = locale === "fr" ? "en" : "fr";
  const home = abs(routes.home[locale]);
  // "https://…/#contact" on the French site, "https://…/en#contact" in English.
  const section = (hash: string) => `${locale === "fr" ? `${SITE_URL}/` : home}${hash}`;
  const { hero, whyUs, process: steps, contact } = site;
  const caseItem = cases.items[0] as CaseStudy | undefined;
  const money = (n: number) => chf(n, locale);
  const lines: string[] = [];
  const push = (...l: string[]) => lines.push(...l);
  const rule = () => push("---", "");

  // ---------- Header ----------
  push(`# ${site.name} — ${L.heading}`, "");
  push(`> ${site.tagline}. ${L.summary}`, "");
  push(`**${L.canonical}**${L.sep} ${home}`);
  push(`**${L.language}**${L.sep} ${L.languageValue}`);
  push(`**${L.otherVersion}**${L.sep} ${abs(routes.pageMd[other])}`);
  push(`**Email**${L.sep} ${site.email}`);
  push(`**${L.address}**${L.sep} ${site.address}`, "");
  rule();

  // ---------- Hero ----------
  push(`## ${hero.headline}`, "", hero.lead, "");
  push(`- **${L.primaryAction}**${L.sep} ${hero.primaryCta.label} — ${section(hero.primaryCta.href)}`, "");
  rule();

  // ---------- Case study ----------
  if (caseItem) {
    push(`## ${L.project}${L.sep} ${caseItem.client}`, "");
    if (caseItem.siteUrl) push(`**${L.site}**${L.sep} ${caseItem.siteUrl}`, "");
    push(`**${caseItem.problemLabel}** ${caseItem.problem}`, "");
    push(`**${caseItem.solutionLabel}** ${caseItem.solution}`, "");
    if (caseItem.detail) push(`${caseItem.detail.label}${L.sep} ${SITE_URL}${caseItem.detail.href}`, "");
    rule();
  }

  // ---------- Services ----------
  push(`## Services — ${services.headline}`, "", services.intro, "");
  for (const tier of services.tiers as readonly Service[]) {
    const featured = tier.featured ? ` *(${services.featuredBadge})*` : "";
    push(`### ${tier.title}${featured}`, "");
    push(`- **${L.price}**${L.sep} ${money(tier.price)}, ${L.fixed} (${tier.payment})`);
    push(`- **${L.duration}**${L.sep} ${tier.duration}`, "");
    push(tier.description, "");
    push(`**${L.includes}**`, "");
    for (const f of tier.features) push(`- ${f}`);
    push("", `${L.moreInfo}${L.sep} ${section(`#${site.ids.services}`)}`, "");
  }
  push(`> ${services.reassurance}`, "");
  push(`### ${services.care.headline}`, "", services.care.intro, "");
  for (const plan of services.care.plans as readonly CarePlan[]) {
    const featured = plan.featured ? ` *(${services.featuredBadge})*` : "";
    push(`- **${plan.title}**${featured} — ${money(plan.price)}${ui.perMonth}${L.sep} ${plan.features.join(L.listSep)}`);
  }
  push("", services.care.footnote, "");
  rule();

  // ---------- Why us ----------
  push(`## ${whyUs.title}`, "");
  for (const paragraph of whyUs.paragraphs) push(plain(paragraph), "");
  push(`### ${whyUs.testimonialsTitle}`, "");
  for (const t of whyUs.testimonials) {
    const attribution = t.author ? `  \n> — ${t.author}${t.role ? `, ${t.role}` : ""}` : "";
    push(`> ${ui.quoteOpen}${t.quote}${ui.quoteClose}${attribution}`, "");
  }
  rule();

  // ---------- Process ----------
  push(`## ${steps.title}`, "", steps.intro, "");
  for (const step of steps.steps) push(`### ${step.number}. ${step.title}`, "", step.body, "");
  rule();

  // ---------- FAQ ----------
  push(`## ${site.faq.title}`, "");
  for (const item of site.faq.items) push(`### ${item.question}`, "", item.answer, "");
  rule();

  // ---------- Contact ----------
  push(`## ${contact.title}`, "", contact.lead, "");
  for (const signal of contact.trustSignals) push(`- ${signal}`);
  push("", `- **Email**${L.sep} ${site.email}`, `- **WhatsApp**${L.sep} ${site.whatsapp.number}`, "");
  push(`### ${site.audit.form.title}`, "", site.audit.form.lead, "");
  push(`${L.requestAudit}${L.sep} ${section(`#${site.ids.contact}`)} (${L.alsoOn} ${abs(routes.contact[locale])})`, "");
  push(`### ${contact.generalTitle}`, "");
  push(`${L.generalForm}${L.sep} ${section(`#${site.ids.contact}`)}`, "");
  push(`### ${contact.booking.lead}`, "");
  push(`${L.bookCall}${L.sep} ${site.booking.url}`, "");
  rule();

  // ---------- Footer / meta ----------
  push(`## ${L.meta}`, "");
  push(`- **${L.name}**${L.sep} ${site.name}`);
  push(`- **${L.domain}**${L.sep} ${site.domain}`);
  push(`- **Email**${L.sep} ${site.email}`);
  push(`- **${L.address}**${L.sep} ${site.address}`);
  push(`- **${L.area}**${L.sep} ${L.areaValue}`);
  push(`- **${L.founder}**${L.sep} ${site.founder}`);
  push(`- **${L.html}**${L.sep} ${home}`);
  push(`- **${L.brief}**${L.sep} ${abs(routes.llms[locale])}`);
  push("");

  return lines.join("\n");
}

export function pageMdResponse(locale: Locale): Response {
  return new Response(renderPageMd(locale), {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      "X-Robots-Tag": "noindex",
    },
  });
}
