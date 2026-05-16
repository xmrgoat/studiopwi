"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import SectionMarker from "@/components/ui/SectionMarker";
import ItalicAccent from "@/components/ui/ItalicAccent";
import { gsap, registerGsapPlugins, prefersReducedMotion } from "@/lib/motion";
import styles from "./Problem.module.css";


export default function Problem() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(`.${styles.card}`, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: `.${styles.grid}`, start: "top 80%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const { problem } = site;

  return (
    <section ref={rootRef} className={`section ${styles.section}`}>
      <div className="container">
        <header className={styles.header}>
          <div>
            <SectionMarker number={problem.marker.number} label={problem.marker.label} />
            <h2 className={styles.headline}>
              {problem.headline.before}{" "}
              <ItalicAccent>{problem.headline.accent}</ItalicAccent>
            </h2>
          </div>
          <div className={styles.leadCol}>
            <img
              src="/images/dirt-pile.svg"
              alt=""
              aria-hidden="true"
              className={styles.shovel}
            />
            <p className={styles.lead}>{problem.lead}</p>
          </div>
        </header>

        <ul className={styles.grid}>
          {problem.points.map((p) => (
            <li key={p.number} className={styles.card}>
              <span className={styles.number}>
                <ItalicAccent>{p.number}</ItalicAccent>
              </span>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardBody}>{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
