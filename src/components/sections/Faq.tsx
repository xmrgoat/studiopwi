import type { CSSProperties } from "react";
import { site } from "@/content/site";
import Reveal from "@/components/motion/Reveal";
import styles from "./Faq.module.css";

// Server component, zero client JS. Each question is a native <details>:
// keyboard- and screen-reader-accessible as is, and every answer stays in the
// HTML for search and AI crawlers even while collapsed. FaqLd mirrors these
// items, so the structured data never claims a question the page lacks.
// Each row carries its index as --i so the rows enter one after another.
export default function Faq() {
  const { title, intro, items } = site.faq;

  return (
    <section className={`section ${styles.section}`} id="faq">
      <Reveal className={`grid ${styles.header}`}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.intro}>{intro}</p>
      </Reveal>

      <Reveal className={`grid ${styles.body}`}>
        <div className={styles.list}>
          {items.map((item, i) => (
            <details
              key={item.question}
              className={styles.item}
              style={{ "--i": i } as CSSProperties}
            >
              <summary className={styles.question}>
                <h3 className={styles.questionText}>{item.question}</h3>
                <span className={styles.icon} aria-hidden="true" />
              </summary>
              <p className={styles.answer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
