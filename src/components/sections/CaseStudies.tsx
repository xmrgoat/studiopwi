import Image from "next/image";
import { cases } from "@/content/cases";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import styles from "./CaseStudies.module.css";

// Server component — the section is static. cases.items is a list even though
// only one study exists today; the layout scales to more without change.
//
// The four blocks below are flat grid children rather than a copy column
// wrapping three of them: the mobile frame interleaves them (title, image,
// body, CTA), which a wrapper could only reproduce via display:contents — and
// that removes the box the reveal transition needs.
export default function CaseStudies() {
  return (
    <section className={`section ${styles.section}`} id="etude-de-cas">
      {cases.items.map((item) => (
        <Reveal as="article" key={item.slug} className={`grid ${styles.grid}`}>
          <h2 className={styles.headline}>
            <span className={styles.eyebrow}>{item.eyebrow} </span>
            <span className={styles.client}>{item.client}</span>
          </h2>

          <div className={styles.media}>
            {item.inProduction && item.statusLabel && (
              <p className={styles.status}>
                {/* Plain filled circle in the design — CSS, not an asset. */}
                <span className={styles.statusDot} aria-hidden="true" />
                {item.statusLabel}
              </p>
            )}

            <div className={styles.frame}>
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 630px"
                className={styles.shot}
              />
            </div>

            {item.siteUrl && item.siteLabel && (
              <a
                className={styles.siteLink}
                href={item.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.siteLabel}
                <span className={styles.srOnly}> (nouvel onglet)</span>
              </a>
            )}
          </div>

          <div className={styles.body}>
            <p className={styles.label}>{item.problemLabel}</p>
            <p className={styles.paragraph}>{item.problem}</p>
            <p className={styles.label}>{item.solutionLabel}</p>
            <p className={styles.paragraph}>{item.solution}</p>
          </div>

          <div className={styles.ctas}>
            <Button href={item.cta.href} variant="primary">
              {item.cta.label}
            </Button>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
