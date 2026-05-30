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
import styles from "./Contact.module.css";

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(`.${styles.left} > *`, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });

      gsap.from(`.${styles.right}`, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: root, start: "top 70%", once: true },
      });
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  const { contact } = site;

  return (
    <section ref={rootRef} id="contact" className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.left}>
            <SectionMarker number={contact.marker.number} label={contact.marker.label} />
            <h2 className={styles.headline}>
              {contact.headline.before}{" "}
              <ItalicAccent>{contact.headline.accent}</ItalicAccent>
            </h2>
            {contact.lead.split("\n").map((line, i) => (
              <p key={i} className={styles.lead}>{line}</p>
            ))}

            <div className={styles.ctaStack}>
              <Button href={contact.secondary.href} variant="primary" magnetic>
                {contact.secondary.label}
              </Button>
            </div>
          </div>

          <div className={styles.right}>
            <ContactForm source="contact" />
          </div>
        </div>
      </div>
    </section>
  );
}
