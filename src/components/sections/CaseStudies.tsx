"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { cases, type CaseStudy } from "@/content/cases";
import SectionMarker from "@/components/ui/SectionMarker";
import ItalicAccent from "@/components/ui/ItalicAccent";
import Counter from "@/components/motion/Counter";
import { gsap, registerGsapPlugins, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";
import styles from "./CaseStudies.module.css";

export default function CaseStudies() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>(`.${styles.imageWrap}`).forEach((wrap) => {
        gsap.from(wrap, {
          clipPath: "inset(10% 10% 10% 10%)",
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: wrap, start: "top 85%", once: true },
        });
      });

      root.querySelectorAll<HTMLElement>(`.${styles.imageWrap} img`).forEach((img) => {
        gsap.to(img, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className={`section ${styles.section}`} id="work">
      <div className="container">
        <header className={styles.header}>
          <SectionMarker number={cases.marker.number} label={cases.marker.label} />
          <h2 className={styles.headline}>
            {cases.headline.before} <ItalicAccent>{cases.headline.accent}</ItalicAccent>
          </h2>
        </header>

        <div className={styles.list}>
          {(cases.items as readonly CaseStudy[]).map((c, i) => (
            <article key={c.slug} className={cn(styles.case, i % 2 === 1 && styles.reverse)}>
              {c.siteUrl ? (
                <a
                  href={c.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.imageLink}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <div className={styles.imageWrap}>
                    <Image
                      src={c.image.src}
                      alt={c.image.alt}
                      width={1280}
                      height={900}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      loading="lazy"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                </a>
              ) : (
                <div className={styles.imageWrap}>
                  <Image
                    src={c.image.src}
                    alt={c.image.alt}
                    width={1280}
                    height={900}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    loading="lazy"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              )}

              <div className={styles.text}>
                <div className={styles.tagRow}>
                  <p className={`mono ${styles.tag}`}>{c.tag}</p>
                  {c.inProduction && (
                    <span className={styles.liveBadge}>
                      <span className={styles.liveDot} aria-hidden="true" />
                      En production
                    </span>
                  )}
                </div>
                <h3 className={styles.title}>{c.client}</h3>
                <p className={`mono ${styles.meta}`}>
                  {c.location} &middot; {c.year}
                </p>

                <dl className={styles.facts}>
                  <div>
                    <dt className="mono">Challenge</dt>
                    <dd>{c.challenge}</dd>
                  </div>
                  <div>
                    <dt className="mono">Solution</dt>
                    <dd>{c.solution}</dd>
                  </div>
                </dl>

                {c.resultNumber != null && (
                  <p className={styles.result}>
                    {c.resultUnit === "%" && "+"}
                    <Counter value={c.resultNumber} onScroll />
                    <ItalicAccent>{c.resultUnit}</ItalicAccent>
                    <span className={styles.resultLabel}> {c.resultLabel}</span>
                  </p>
                )}

                {c.quote && (
                  <blockquote className={styles.quote}>
                    {c.quote}
                    <footer className={styles.attribution}>
                      &mdash; {c.attribution.name}, {c.attribution.role}
                    </footer>
                  </blockquote>
                )}

                <div className={styles.caseLinks}>
                  <Link href={`/realisations/${c.slug}`} className={styles.siteLink}>
                    <span className={styles.siteLinkLabel}>Voir l&apos;étude de cas</span>
                    <svg
                      className={styles.siteLinkArrow}
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M1 10L10 1M10 1H3M10 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  {c.siteUrl && (
                    <a
                      href={c.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.siteLink} ${styles.siteLinkExternal}`}
                    >
                      <span className={styles.siteLinkLabel}>Voir le projet en ligne</span>
                      <svg
                        className={styles.siteLinkArrow}
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path d="M1 10L10 1M10 1H3M10 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
