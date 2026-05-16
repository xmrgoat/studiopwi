"use client";

import { useEffect, useRef } from "react";
import { services, type Service } from "@/content/services";
import SectionMarker from "@/components/ui/SectionMarker";
import ItalicAccent from "@/components/ui/ItalicAccent";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { gsap, registerGsapPlugins, prefersReducedMotion } from "@/lib/motion";
import styles from "./Services.module.css";

export default function Services() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: `.${styles.grid}`, start: "top 80%", once: true },
      });

      tl.from(`.${styles.card}`, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "expo.out",
      }).from(`.${styles.vine}`, {
        opacity: 0,
        y: 60,
        duration: 1.6,
        ease: "expo.out",
      }, "-=0.6");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className={`section ${styles.section}`} id="services">
      <div className="container">
        <header className={styles.header}>
          <div>
            <SectionMarker number={services.marker.number} label={services.marker.label} />
            <h2 className={styles.headline}>
              {services.headline.before}{" "}
              <ItalicAccent>{services.headline.accent}</ItalicAccent>{" "}
              {services.headline.after}
            </h2>
          </div>
          <p className={styles.intro}>{services.intro}</p>
        </header>

        <div className={styles.gridWrapper}>
          <img
            src="/images/vine.svg?v=3"
            alt=""
            aria-hidden="true"
            className={styles.vine}
          />
          <ul className={styles.grid}>
          {(services.tiers as readonly Service[]).map((tier, idx) => (
            <li
              key={tier.id}
              className={cn(styles.card, tier.featured && styles.featured)}
            >
              <span className={styles.cardIndex} aria-hidden="true">
                0{idx + 1}
              </span>
              <p className={`mono ${styles.tag}`}>{tier.tag}</p>
              <h3 className={styles.title}>{tier.title}</h3>
              <p className={styles.price}>{tier.price}</p>
              <p className={`mono ${styles.duration}`}>{tier.duration}</p>
              <p className={styles.description}>{tier.description}</p>
              <ul className={styles.features}>
                {tier.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className={styles.cta}>
                <Button href={tier.cta.href} variant={tier.featured ? "primary" : "ghost"} magnetic>
                  {tier.cta.label}
                </Button>
              </div>
            </li>
          ))}
          </ul>
        </div>

        <p className={`mono ${styles.reassurance}`}>{services.reassurance}</p>
      </div>
    </section>
  );
}
