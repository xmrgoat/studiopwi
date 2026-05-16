import { site } from "@/content/site";
import { services, type Service } from "@/content/services";
import { cases } from "@/content/cases";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://studiopwi.com";

export const dynamic = "force-static";

function joinHeadline(h: { before: string; accent: string; after: string }) {
  return [h.before, h.accent, h.after]
    .map((s) => s.trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ");
}

export function GET() {
  const hero = site.hero;
  const problem = site.problem;
  const whyUs = site.whyUs;
  const contact = site.contact;
  const faq = site.faq;
  const banner = site.ctaBanner;
  const caseItem = cases.items[0];

  const lines: string[] = [];

  // ---------- Header ----------
  lines.push(`# ${site.name} — Sites web pour paysagistes suisses`);
  lines.push("");
  lines.push(
    `> ${site.tagline} Studio web spécialisé pour paysagistes suisses. Sites orientés conversion, demandes de devis qualifiées, garantie 90 jours. Basés à Neuchâtel.`,
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
  lines.push(`## ${hero.eyebrow}`);
  lines.push("");
  lines.push(`### ${joinHeadline(hero.headline)}`);
  lines.push("");
  lines.push(hero.lead);
  lines.push("");
  lines.push(
    `- **Action principale** : ${hero.primaryCta.label} — ${SITE_URL}/${hero.primaryCta.href}`,
  );
  lines.push(
    `- **Action secondaire** : ${hero.secondaryCta.label} — ${SITE_URL}/${hero.secondaryCta.href}`,
  );
  lines.push("");
  lines.push("**Repères clés :**");
  lines.push("");
  for (const m of hero.metrics as ReadonlyArray<{ value: number; label: string; suffix?: string }>) {
    lines.push(`- ${m.value}${m.suffix ?? ""} ${m.label}`);
  }
  lines.push("");
  lines.push("---");
  lines.push("");

  // ---------- Problem ----------
  lines.push(`## Le problème : ${joinHeadline(problem.headline)}`);
  lines.push("");
  lines.push(problem.lead);
  lines.push("");
  for (const p of problem.points) {
    lines.push(`### ${p.number} — ${p.title}`);
    lines.push("");
    lines.push(p.body);
    lines.push("");
  }
  lines.push("---");
  lines.push("");

  // ---------- Services ----------
  lines.push(`## Services — ${joinHeadline(services.headline)}`);
  lines.push("");
  lines.push(services.intro);
  lines.push("");
  for (const tier of services.tiers as readonly Service[]) {
    const featured = tier.featured ? " *(offre la plus populaire)*" : "";
    lines.push(`### ${tier.tag} — ${tier.title}${featured}`);
    lines.push("");
    lines.push(`- **Prix** : ${tier.price}`);
    lines.push(`- **Durée** : ${tier.duration}`);
    if (tier.payment) lines.push(`- **Paiement** : ${tier.payment}`);
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

  // ---------- Case study ----------
  if (caseItem) {
    lines.push(`## Réalisation : ${caseItem.client}`);
    lines.push("");
    lines.push(
      `**Lieu** : ${caseItem.location} · **Année** : ${caseItem.year} · **Type** : ${caseItem.tag}`,
    );
    lines.push("");
    lines.push(`**Défi** : ${caseItem.challenge}`);
    lines.push("");
    lines.push(`**Solution** : ${caseItem.solution}`);
    lines.push("");
    lines.push(
      `**Résultat** : +${caseItem.resultNumber}${caseItem.resultUnit} ${caseItem.resultLabel}`,
    );
    lines.push("");
    lines.push(
      `> « ${caseItem.quote} »  \n> — ${caseItem.attribution.name}, ${caseItem.attribution.role}`,
    );
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  // ---------- Why us ----------
  lines.push(`## Pourquoi nous — ${joinHeadline(whyUs.claim)}`);
  lines.push("");
  for (const b of whyUs.badges) lines.push(`- ${b}`);
  lines.push("");
  lines.push("### Notre processus");
  lines.push("");
  for (const step of whyUs.process) {
    lines.push(`#### ${step.number}. ${step.title} *(${step.duration})*`);
    lines.push("");
    lines.push(step.body);
    lines.push("");
  }
  lines.push(`### ${whyUs.guarantee.label}`);
  lines.push("");
  lines.push(`**${whyUs.guarantee.title}**`);
  lines.push("");
  lines.push(whyUs.guarantee.body);
  lines.push("");
  lines.push("---");
  lines.push("");

  // ---------- Contact ----------
  lines.push(`## ${joinHeadline(contact.headline)}`);
  lines.push("");
  lines.push(contact.lead);
  lines.push("");
  for (const info of contact.info) {
    lines.push(`- **${info.label}** : ${info.value}`);
  }
  lines.push("");
  lines.push(`Formulaire de contact : ${SITE_URL}/#contact`);
  lines.push("");
  lines.push("---");
  lines.push("");

  // ---------- FAQ ----------
  lines.push(`## Questions fréquentes`);
  lines.push("");
  for (const q of faq.items) {
    lines.push(`### ${q.question}`);
    lines.push("");
    lines.push(q.answer);
    lines.push("");
  }
  lines.push("---");
  lines.push("");

  // ---------- Final CTA ----------
  lines.push(`## ${joinHeadline(banner.headline)}`);
  lines.push("");
  lines.push(banner.lead);
  lines.push("");
  lines.push(`${banner.cta.label} — ${SITE_URL}/${banner.cta.href}`);
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
  lines.push(`- **Fondateur** : ${whyUs.finalCta.founder.name}, ${whyUs.finalCta.founder.role}`);
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
