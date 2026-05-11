"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import SectionMarker from "@/components/ui/SectionMarker";
import ItalicAccent from "@/components/ui/ItalicAccent";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/ui/ContactForm";
import {
  gsap,
  ScrollTrigger,
  registerGsapPlugins,
  prefersReducedMotion,
} from "@/lib/motion";
import styles from "./WhyUs.module.css";

export default function WhyUs() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: `.${styles.inner}`,
          start: "top 120",
          end: "bottom bottom",
          pin: `.${styles.sticky}`,
          pinSpacing: false,
        });
      });

      gsap.from(`.${styles.badge}`, {
        x: -16,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: `.${styles.sticky}`, start: "top 70%", once: true },
      });

      gsap.from(`.${styles.step}`, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: { trigger: `.${styles.process}`, start: "top 75%", once: true },
      });

      gsap.from(`.${styles.guarantee}`, {
        scale: 0.96,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: `.${styles.guarantee}`, start: "top 80%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const { whyUs } = site;

  return (
    <section ref={rootRef} className={`section section--dark ${styles.section}`} id="why">
      <div className={`container ${styles.inner}`}>
        <aside className={styles.sticky}>
          <SectionMarker number={whyUs.marker.number} label={whyUs.marker.label} />
          <h2 className={styles.claim}>
            {whyUs.claim.before}{" "}
            <ItalicAccent>{whyUs.claim.accent}</ItalicAccent>{" "}
            {whyUs.claim.after}
          </h2>
          <ul className={styles.badges}>
            {whyUs.badges.map((b) => (
              <li key={b} className={styles.badge}>
                <span className={styles.dot} aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </aside>

        <div className={styles.flow}>
          <div className={styles.process}>
            <h3 className={`mono ${styles.processTitle}`}>How it works</h3>
            <ol className={styles.steps}>
              {whyUs.process.map((s) => (
                <li key={s.number} className={styles.step}>
                  <span className={styles.stepNum} aria-hidden="true">{s.number}</span>
                  <div>
                    <p className={`mono ${styles.stepHead}`}>
                      {s.title} — <span>{s.duration}</span>
                    </p>
                    <p className={styles.stepBody}>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.guarantee}>
            <p className={`mono ${styles.guaranteeLabel}`}>{whyUs.guarantee.label}</p>
            <h3 className={styles.guaranteeTitle}>{whyUs.guarantee.title}</h3>
            <p className={styles.guaranteeBody}>{whyUs.guarantee.body}</p>
          </div>

          <div className={styles.finalCta} id="contact">
            <h3 className={styles.finalHeadline}>
              {whyUs.finalCta.headline.before}{" "}
              <ItalicAccent>{whyUs.finalCta.headline.accent}</ItalicAccent>
            </h3>
            <p className={styles.finalLead}>{whyUs.finalCta.lead}</p>

            <div className={styles.ctaRow}>
              <Button href={whyUs.finalCta.primary.href} variant="primary" magnetic>
                {whyUs.finalCta.primary.label}
              </Button>
              <a className={styles.secondaryLink} href={whyUs.finalCta.secondary.href}>
                {whyUs.finalCta.secondary.label}
              </a>
            </div>

            <div className={styles.formWrap}>
              <ContactForm source="final-cta" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
