"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import SectionMarker from "@/components/ui/SectionMarker";
import ItalicAccent from "@/components/ui/ItalicAccent";
import { gsap, registerGsapPlugins, prefersReducedMotion } from "@/lib/motion";
import styles from "./Problem.module.css";

function ShovelIcon() {
  return (
    <svg
      className={styles.shovel}
      viewBox="0 0 200 240"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Shovel — rotated ~15° clockwise around shaft midpoint */}
      <g transform="rotate(15, 100, 115)">
        {/* D-grip handle */}
        <line x1="90" y1="14" x2="90" y2="40" />
        <line x1="110" y1="14" x2="110" y2="40" />
        <path d="M 90 14 Q 100 6 110 14" />
        <line x1="90" y1="40" x2="110" y2="40" />
        {/* Shaft */}
        <rect x="97" y="40" width="6" height="130" rx="3" className={styles.shovelBgFill} />
        {/* Ferrule */}
        <rect x="93" y="168" width="14" height="10" rx="2" className={styles.shovelBgFill} />
        {/* Spade blade */}
        <path
          d="M 93 178 L 83 192 Q 82 212 100 220 Q 118 212 117 192 L 107 178 Z"
          className={styles.shovelBgFill}
        />
      </g>
      {/* Soil mound fill — covers the buried blade */}
      <path
        d="M -5 245 L -5 166 Q 15 184 35 181 Q 55 169 72 173 Q 84 163 95 167 Q 107 159 120 165 Q 138 160 158 169 Q 175 173 195 185 L 205 193 L 205 245 Z"
        className={styles.shovelBgFill}
        stroke="none"
      />
      {/* Soil mound outline */}
      <path
        d="M 0 195 Q 15 184 35 181 Q 55 169 72 173 Q 84 163 95 167 Q 107 159 120 165 Q 138 160 158 169 Q 175 173 195 185 L 200 189"
        fill="none"
      />
      {/* Dirt crumble dots */}
      <circle cx="80" cy="174" r="2" fill="currentColor" stroke="none" />
      <circle cx="118" cy="168" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="100" cy="179" r="2" fill="currentColor" stroke="none" />
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
            <ShovelIcon />
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
