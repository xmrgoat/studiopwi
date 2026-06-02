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
            <img
              src="/images/interogation-mark-v3.webp"
              alt=""
              aria-hidden="true"
              className={styles.decorationImg}
              width="200"
              height="280"
            />
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
                      <span className={styles.dot} />
                      <svg
                        className={styles.flower}
                        viewBox="0 0 20 20"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <ellipse cx="10" cy="4.2" rx="1.9" ry="2.7" transform="rotate(0 10 10)" />
                        <ellipse cx="10" cy="4.2" rx="1.9" ry="2.7" transform="rotate(60 10 10)" />
                        <ellipse cx="10" cy="4.2" rx="1.9" ry="2.7" transform="rotate(120 10 10)" />
                        <ellipse cx="10" cy="4.2" rx="1.9" ry="2.7" transform="rotate(180 10 10)" />
                        <ellipse cx="10" cy="4.2" rx="1.9" ry="2.7" transform="rotate(240 10 10)" />
                        <ellipse cx="10" cy="4.2" rx="1.9" ry="2.7" transform="rotate(300 10 10)" />
                        <circle cx="10" cy="10" r="2.3" />
                      </svg>
                    </span>
                  </button>
                  <div className={`${styles.answerWrap} ${isOpen ? styles.answerWrapOpen : ""}`}>
                    <div className={styles.answerInner}>
                      <p id={panelId} className={styles.answer}>
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
