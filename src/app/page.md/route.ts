import { site } from "@/content/site";
import { services, type Service } from "@/content/services";
import { cases, type CaseStudy } from "@/content/cases";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://studiopwi.com";

export const dynamic = "force-static";

// Strips the **bold** markers the content files carry for on-page emphasis —
// Markdown would render them, but they add nothing to a machine-readable brief.
function plain(text: string) {
  return text.replace(/\*\*/g, "");
}

export function GET() {
  const { hero, whyUs, process: steps, contact } = site;
  const caseItem = cases.items[0] as CaseStudy | undefined;

  const lines: string[] = [];

  // ---------- Header ----------
  lines.push(`# ${site.name} — Sites web pour paysagistes suisses`);
  lines.push("");
  lines.push(
    `> ${site.tagline}. Studio web spécialisé pour paysagistes suisses. Sites orientés conversion, demandes de devis qualifiées, support post-lancement inclus. Basés à Neuchâtel.`,
  );
  lines.push("");
  lines.push(`**Site canonique** : ${SITE_URL}`);
  lines.push(`**Langue** : français (fr-CH)`);
  lines.push(`**Email** : ${site.email}`);
  lines.push(`**Adresse** : ${site.address}`);
  lines.push("");
  lines.push("---");
  lines.push("");

  // ---------- Hero ----------
  lines.push(`## ${hero.headline}`);
  lines.push("");
  lines.push(hero.lead);
  lines.push("");
  lines.push(
    `- **Action principale** : ${hero.primaryCta.label} — ${SITE_URL}/${hero.primaryCta.href}`,
  );
  lines.push("");
  lines.push("---");
  lines.push("");

  // ---------- Case study ----------
  if (caseItem) {
    lines.push(`## Réalisation : ${caseItem.client}`);
    lines.push("");
    if (caseItem.siteUrl) {
      lines.push(`**Site** : ${caseItem.siteUrl}`);
      lines.push("");
    }
    lines.push(`**${caseItem.problemLabel}** ${caseItem.problem}`);
    lines.push("");
    lines.push(`**${caseItem.solutionLabel}** ${caseItem.solution}`);
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  // ---------- Services ----------
  lines.push(`## Services — ${services.headline}`);
  lines.push("");
  lines.push(services.intro);
  lines.push("");
  for (const tier of services.tiers as readonly Service[]) {
    const featured = tier.featured ? ` *(${services.featuredBadge})*` : "";
    lines.push(`### ${tier.title}${featured}`);
    lines.push("");
    lines.push(`- **Durée** : ${tier.duration}`);
    lines.push("");
    lines.push(tier.description);
    lines.push("");
    lines.push("**Inclut :**");
    lines.push("");
    for (const f of tier.features) lines.push(`- ${f}`);
    lines.push("");
    lines.push(`Plus d'infos : ${SITE_URL}/#services`);
    lines.push("");
  }
  lines.push(`> ${services.reassurance}`);
  lines.push("");
  lines.push("---");
  lines.push("");

  // ---------- Why us ----------
  lines.push(`## ${whyUs.title}`);
  lines.push("");
  for (const paragraph of whyUs.paragraphs) {
    lines.push(plain(paragraph));
    lines.push("");
  }
  lines.push(`### ${whyUs.testimonialsTitle}`);
  lines.push("");
  for (const t of whyUs.testimonials) {
    const attribution = t.author
      ? `  \n> — ${t.author}${t.role ? `, ${t.role}` : ""}`
      : "";
    lines.push(`> « ${t.quote} »${attribution}`);
    lines.push("");
  }
  lines.push("---");
  lines.push("");

  // ---------- Process ----------
  lines.push(`## ${steps.title}`);
  lines.push("");
  lines.push(steps.intro);
  lines.push("");
  for (const step of steps.steps) {
    lines.push(`### ${step.number}. ${step.title}`);
    lines.push("");
    lines.push(step.body);
    lines.push("");
  }
  lines.push("---");
  lines.push("");

  // ---------- Contact ----------
  lines.push(`## ${contact.title}`);
  lines.push("");
  lines.push(contact.lead);
  lines.push("");
  for (const signal of contact.trustSignals) lines.push(`- ${signal}`);
  lines.push("");
  lines.push(`- **Email** : ${site.email}`);
  lines.push("");
  lines.push(`Formulaire de contact : ${SITE_URL}/#contact`);
  lines.push("");
  lines.push("---");
  lines.push("");

  // ---------- Footer / meta ----------
  lines.push("## Métadonnées");
  lines.push("");
  lines.push(`- **Nom** : ${site.name}`);
  lines.push(`- **Domaine** : ${site.domain}`);
  lines.push(`- **Email** : ${site.email}`);
  lines.push(`- **Adresse** : ${site.address}`);
  lines.push(`- **Zone d'intervention** : Suisse (CH)`);
  lines.push(`- **Fondateur** : Studio PWI, Neuchâtel`);
  lines.push(`- **Site web (HTML)** : ${SITE_URL}`);
  lines.push(`- **Brief pour IA** : ${SITE_URL}/llms.txt`);
  lines.push("");

  const body = lines.join("\n");

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      "X-Robots-Tag": "noindex",
    },
  });
}
