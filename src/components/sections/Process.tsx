import { site } from "@/content/site";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import styles from "./Process.module.css";

// Server component. New section in the redesign — the old build carried these
// three steps nested inside WhyUs; the Figma gives them their own frame.
//
// Rendered as an ordered list: the steps are a sequence, and <ol> is what
// communicates that to assistive tech. The numerals in the design are the list
// positions, so they are decorative here rather than content.
export default function Process() {
  const { title, intro, steps, cta } = site.process;

  return (
    <section className={`section ${styles.section}`} id="demarche">
      <Reveal className={`grid ${styles.header}`}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.intro}>{intro}</p>
      </Reveal>

      <ol className={`grid ${styles.steps}`}>
        {steps.map((step, i) => (
          <Reveal as="li" key={step.number} order={i} className={styles.step}>
            <span className={styles.numeral} aria-hidden="true">
              {step.number}
            </span>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepBody}>{step.body}</p>
          </Reveal>
        ))}
      </ol>

      <Reveal className={`grid ${styles.ctaRow}`}>
        <div className={styles.cta}>
          <Button href={cta.href} variant="primary">
            {cta.label}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
