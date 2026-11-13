import type { CSSProperties } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import Reveal from "@/components/motion/Reveal";
import AuditForm from "@/components/ui/AuditForm";
import styles from "./Audit.module.css";

// The free audit (November 2026), the hero's and header's promise. Left: the
// two things the visitor receives, each shown — an anonymised extract of a
// real audit, then the studio's own work as the standard of the draft.
// Right: the request form, which stays in view on desktop while the left
// column is read.
//
// Server component; only AuditForm ships JavaScript. Criterion bars carry
// their score as --score and their index as --i for the entrance.
const bar = (score: number, max: number, i: number) =>
  ({ "--score": score / max, "--i": i }) as CSSProperties;

export default function Audit() {
  const { audit } = site;
  const [report, draft] = audit.deliverables;
  const ex = audit.example;

  return (
    <section className={`section ${styles.section}`} id="audit" aria-labelledby="audit-title">
      <Reveal className={`grid ${styles.header}`}>
        <p className={styles.eyebrow}>{audit.eyebrow}</p>
        <h2 id="audit-title" className={styles.headline}>
          {audit.title}
        </h2>
        <p className={styles.intro}>{audit.intro}</p>
      </Reveal>

      <div className={`grid ${styles.body}`}>
        <ol className={styles.deliverables}>
          <Reveal as="li" order={0} className={styles.deliverable}>
            <p className={styles.delay}>{report.delay}</p>
            <h3 className={styles.title}>{report.title}</h3>
            <p className={styles.text}>{report.body}</p>

            <figure className={styles.report}>
              <figcaption className={styles.reportHead}>
                <span className={styles.reportLabel}>
                  {ex.label}
                  <span className={styles.reportClient}>{ex.client}</span>
                </span>
                <span className={styles.score}>
                  <span className={styles.scoreLabel}>{ex.scoreLabel}</span>
                  <span className={styles.scoreValue}>
                    {ex.score}
                    <span className={styles.scoreMax}>/{ex.scoreMax}</span>
                  </span>
                </span>
              </figcaption>

              <dl className={styles.findings}>
                {ex.findings.map((f) => (
                  <div key={f.label} className={styles.finding}>
                    <dt className={styles.findingLabel}>{f.label}</dt>
                    <dd className={styles.findingText}>{f.text}</dd>
                  </div>
                ))}
              </dl>

              <ul className={styles.criteria}>
                {ex.criteria.map((c, i) => (
                  <li key={c.label} className={styles.criterion} style={bar(c.score, ex.scoreMax, i)}>
                    <span className={styles.criterionLabel}>{c.label}</span>
                    <span className={styles.track} aria-hidden="true">
                      <span className={styles.fill} />
                    </span>
                    <span className={styles.criterionScore}>
                      {c.score}
                      <span className={styles.srOnly}> sur {ex.scoreMax}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </figure>
          </Reveal>

          <Reveal as="li" order={1} className={styles.deliverable}>
            <p className={styles.delay}>{draft.delay}</p>
            <h3 className={styles.title}>{draft.title}</h3>
            <p className={styles.text}>{draft.body}</p>

            <figure className={styles.draft}>
              <div className={styles.frame}>
                <Image
                  src={audit.draft.src}
                  alt={audit.draft.alt}
                  width={audit.draft.width}
                  height={audit.draft.height}
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className={styles.shot}
                />
              </div>
              <figcaption className={styles.caption}>{audit.draft.caption}</figcaption>
            </figure>
          </Reveal>
        </ol>

        <Reveal order={2} className={styles.aside}>
          <div className={styles.formCard}>
            <h3 className={styles.formTitle}>{audit.form.title}</h3>
            <p className={styles.scarcity}>
              <span className={styles.dot} aria-hidden="true" />
              {audit.scarcity}
            </p>
            <AuditForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
