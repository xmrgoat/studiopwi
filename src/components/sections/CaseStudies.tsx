"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { cases } from "@/content/cases";
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
      // Image reveal — clip-path on the wrapper, no scale on inner.
      root.querySelectorAll<HTMLElement>(`.${styles.imageWrap}`).forEach((wrap) => {
        gsap.from(wrap, {
          clipPath: "inset(10% 10% 10% 10%)",
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: wrap, start: "top 85%", once: true },
        });
      });

      // Parallax on inner image — starts at top top to avoid clip conflict.
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
          {cases.items.map((c, i) => (
            <article key={c.slug} className={cn(styles.case, i % 2 === 1 && styles.reverse)}>
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
              <div className={styles.text}>
                <p className={`mono ${styles.tag}`}>{c.tag}</p>
                <h3 className={styles.title}>{c.client}</h3>
                <p className={`mono ${styles.meta}`}>
                  {c.location} · {c.year}
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

                <p className={styles.result}>
                  {c.resultUnit === "%" && "+"}
                  <Counter value={c.resultNumber} onScroll />
                  <ItalicAccent>{c.resultUnit}</ItalicAccent>
                  <span className={styles.resultLabel}> {c.resultLabel}</span>
                </p>

                <blockquote className={styles.quote}>
                  <span aria-hidden="true" className={styles.quoteMark}>“</span>
                  {c.quote}
                  <footer className={styles.attribution}>
                    — {c.attribution.name}, {c.attribution.role}
                  </footer>
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
