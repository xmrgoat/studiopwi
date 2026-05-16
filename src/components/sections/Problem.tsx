"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import SectionMarker from "@/components/ui/SectionMarker";
import ItalicAccent from "@/components/ui/ItalicAccent";
import { gsap, registerGsapPlugins, prefersReducedMotion } from "@/lib/motion";
import styles from "./Problem.module.css";

function EdelweissIcon({ className }: { className?: string }) {
  const bractAngles = [0, 40, 80, 120, 160, 200, 240, 280, 320];
  const bract = "M 100,18 C 113,38 115,68 100,86 C 85,68 87,38 100,18";
  const floretAngles = [0, 60, 120, 180, 240, 300];
  const fr = 18;

  return (
    <svg
      viewBox="0 0 200 200"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {bractAngles.map((a) => (
        <g key={a} transform={`rotate(${a}, 100, 100)`}>
          <path d={bract} />
        </g>
      ))}
      <circle cx="100" cy="100" r="9" />
      {floretAngles.map((a) => {
        const rad = (a * Math.PI) / 180;
        const cx = +(100 + fr * Math.sin(rad)).toFixed(2);
        const cy = +(100 - fr * Math.cos(rad)).toFixed(2);
        return <circle key={a} cx={cx} cy={cy} r="6" />;
      })}
      <circle cx="100" cy="100" r="3" fill="var(--color-bg)" />
      {floretAngles.map((a) => {
        const rad = (a * Math.PI) / 180;
        const cx = +(100 + fr * Math.sin(rad)).toFixed(2);
        const cy = +(100 - fr * Math.cos(rad)).toFixed(2);
        return <circle key={`d${a}`} cx={cx} cy={cy} r="1.8" fill="var(--color-bg)" />;
      })}
    </svg>
  );
}

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
            <EdelweissIcon className={styles.edelweiss} />
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
