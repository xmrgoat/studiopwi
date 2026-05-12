"use client";

import { useState } from "react";
import { site } from "@/content/site";
import SectionMarker from "@/components/ui/SectionMarker";
import ItalicAccent from "@/components/ui/ItalicAccent";
import styles from "./FAQ.module.css";

export default function FAQ() {
  const { faq } = site;
  const [open, setOpen] = useState<number | null>(null);

  function toggle(i: number) {
    setOpen((prev) => (prev === i ? null : i));
  }

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.layout}>
          <header className={styles.header}>
            <SectionMarker number={faq.marker.number} label={faq.marker.label} />
            <h2 className={styles.headline}>
              {faq.headline.before}{" "}
              <ItalicAccent>{faq.headline.accent}</ItalicAccent>
            </h2>
            <p className={styles.subline}>
              Tout ce que vous voulez savoir avant de démarrer.
            </p>
          </header>

          <ul className={styles.list}>
            {faq.items.map((item, i) => {
              const panelId = `faq-panel-${i}`;
              const isOpen = open === i;
              return (
                <li key={item.question} className={styles.item}>
                  <button
                    type="button"
                    className={styles.question}
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen ? "true" : "false"}
                    aria-controls={panelId}
                  >
                    <span className={styles.num}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.questionText}>{item.question}</span>
                    <span
                      className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <p id={panelId} className={styles.answer} role="region">
                      {item.answer}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
