import { site } from "@/content/site";
import Button from "@/components/ui/Button";
import styles from "./Hero.module.css";

// Server component. The redesigned hero is text on a flat ground — no video,
// no scroll-linked media, nothing to animate imperatively — so it ships zero
// client JS and GSAP never touches the above-the-fold critical path. The
// entrance is pure CSS and self-disables under prefers-reduced-motion.
export default function Hero() {
  const { headline, lead, primaryCta } = site.hero;

  return (
    <section
      className={`${styles.hero} hero-section`}
      id="top"
      aria-labelledby="hero-headline"
    >
      <div className={`container ${styles.inner}`}>
        <h1 id="hero-headline" className={styles.headline}>
          {headline}
        </h1>
        <p className={styles.lead}>{lead}</p>
        <div className={styles.ctas}>
          <Button href={primaryCta.href} variant="primary">
            {primaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
