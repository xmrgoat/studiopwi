import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cases, type CaseStudy } from "@/content/cases";
import styles from "./page.module.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://studiopwi.com";

export function generateStaticParams() {
  return cases.items.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = (cases.items as readonly CaseStudy[]).find((item) => item.slug === slug);
  if (!c) return {};
  const description = `${c.challenge} ${c.solution}`.slice(0, 155);
  return {
    title: c.client,
    description,
    alternates: { canonical: `/realisations/${c.slug}` },
    openGraph: {
      title: `${c.client} — Étude de cas · Studio PWI`,
      description,
      images: [{ url: c.image.src, alt: c.image.alt }],
    },
  };
}

function CaseStudySchema({ c }: { c: CaseStudy }) {
  const data = {
    "@context": "https://schema.org",
    "@type": ["WebPage", "CreativeWork"],
    "@id": `${SITE_URL}/realisations/${c.slug}`,
    name: `${c.client} — Étude de cas`,
    description: `${c.challenge} ${c.solution}`.slice(0, 155),
    url: `${SITE_URL}/realisations/${c.slug}`,
    inLanguage: "fr-CH",
    image: `${SITE_URL}${c.image.src}`,
    datePublished: `${c.year}-01-01`,
    author: { "@id": `${SITE_URL}/#organization` },
    about: { "@id": `${SITE_URL}/#business` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // Content is our own structured data — not user input. < is escaped above.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = (cases.items as readonly CaseStudy[]).find((item) => item.slug === slug);
  if (!c) notFound();

  return (
    <>
      <CaseStudySchema c={c} />
      <Header />
      <main id="main" className={styles.main}>
        <div className={`container ${styles.wrapper}`}>
          <Link href="/realisations" className={styles.back}>
            ← Retour en arrière
          </Link>

          <header className={styles.header}>
            <div className={styles.meta}>
              <span className={`mono ${styles.tag}`}>{c.tag}</span>
              <span className={`mono ${styles.metaDot}`} aria-hidden="true">·</span>
              <span className={`mono ${styles.metaText}`}>{c.location}</span>
              <span className={`mono ${styles.metaDot}`} aria-hidden="true">·</span>
              <span className={`mono ${styles.metaText}`}>{c.year}</span>
            </div>
            <h1 className={styles.title}>{c.client}</h1>
          </header>

          <div className={styles.heroImage}>
            <Image
              src={c.image.src}
              alt={c.image.alt}
              width={1280}
              height={800}
              sizes="(min-width: 1280px) 1200px, 95vw"
              priority
              style={{ width: "100%", height: "auto" }}
            />
          </div>

          <div className={styles.body}>
            <section className={styles.section}>
              <h2 className={styles.sectionLabel}>Challenge</h2>
              <p className={styles.sectionText}>{c.challenge}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionLabel}>Solution</h2>
              <p className={styles.sectionText}>{c.solution}</p>
            </section>

            {c.resultNumber != null && (
              <div className={styles.result}>
                <p className={styles.resultNumber}>
                  {c.resultUnit === "%" && "+"}
                  {c.resultNumber}
                  {c.resultUnit}
                </p>
                {c.resultLabel && (
                  <p className={styles.resultLabel}>{c.resultLabel}</p>
                )}
              </div>
            )}

            {c.quote && (
              <blockquote className={styles.quote}>
                <p className={styles.quoteText}>&ldquo;{c.quote}&rdquo;</p>
                <footer className={styles.attribution}>
                  &mdash; {c.attribution.name}
                  {c.attribution.role && `, ${c.attribution.role}`}
                </footer>
              </blockquote>
            )}

            <div className={styles.actions}>
              {c.siteUrl && (
                <a
                  href={c.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryAction}
                >
                  Voir le site en ligne →
                </a>
              )}
              <Link href="/#contact" className={styles.secondaryAction}>
                Démarrer un projet similaire
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
