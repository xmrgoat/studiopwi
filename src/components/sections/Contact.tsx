"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import ItalicAccent from "@/components/ui/ItalicAccent";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/ui/ContactForm";
import {
  gsap,
  ScrollTrigger,
  registerGsapPlugins,
  prefersReducedMotion,
} from "@/lib/motion";
import styles from "./Contact.module.css";

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(`.${styles.headline}`, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });
      gsap.from(`.${styles.lead}`, {
        y: 16,
        opacity: 0,
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: { trigger: root, start: "top 72%", once: true },
      });
      gsap.from(`.${styles.ctaRow}`, {
        y: 16,
        opacity: 0,
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: { trigger: root, start: "top 68%", once: true },
      });
      gsap.from(`.${styles.formWrap}`, {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: root, start: "top 65%", once: true },
      });
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  const { finalCta } = site.whyUs;

  return (
    <section ref={rootRef} className={`section ${styles.section}`} id="contact">
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.headline}>
          {finalCta.headline.before}{" "}
          <ItalicAccent>{finalCta.headline.accent}</ItalicAccent>
        </h2>
        <p className={styles.lead}>{finalCta.lead}</p>

        <div className={styles.ctaRow}>
          <Button href={finalCta.primary.href} variant="primary" magnetic>
            {finalCta.primary.label}
          </Button>
          <a className={styles.secondaryLink} href={finalCta.secondary.href}>
            {finalCta.secondary.label}
          </a>
        </div>

        <div className={styles.formWrap}>
          <ContactForm source="final-cta" />
        </div>
      </div>
    </section>
  );
}
