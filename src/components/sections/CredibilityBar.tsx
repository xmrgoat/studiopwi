"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import styles from "./CredibilityBar.module.css";

export default function CredibilityBar() {
  const trackRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    if (prefersReducedMotion()) return;

    const tween = gsap.to(el, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });

    el.addEventListener("mouseenter", () => tween.pause());
    el.addEventListener("mouseleave", () => tween.resume());

    return () => {
      tween.kill();
    };
  }, []);

  const doubled = [...site.credibility.logos, ...site.credibility.logos];

  return (
    <section className={styles.section} id="trust" aria-label={site.credibility.label}>
      <p className={`mono ${styles.label}`}>{site.credibility.label}</p>
      <div className={styles.marquee}>
        <ul ref={trackRef} className={styles.track}>
          {doubled.map((logo, i) => (
            <li key={`${logo.name}-${i}`} className={styles.logo}>
              {/* Replace with <Image /> when real SVG/PNG logos are added */}
              <span className={styles.logoText}>{logo.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
