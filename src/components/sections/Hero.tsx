import { site } from "@/content/site";
import Button from "@/components/ui/Button";
import styles from "./Hero.module.css";

// Server component, zero client JS. The redesign adds a full-bleed background
// photo behind a translucent content card. The photo is a plain CSS
// background-image gated behind the desktop media query in Hero.module.css —
// not a next/image, and deliberately not marked priority: a <link
// rel="preload"> fires regardless of display:none, so an <Image priority>
// here would force mobile to fetch a photo it never shows, which is exactly
// what the earlier mobile-LCP work in this repo eliminated hero media for.
export default function Hero() {
  const { headline, lead, primaryCta } = site.hero;

  return (
    <section
      className={`${styles.hero} hero-section`}
      id="top"
      aria-labelledby="hero-headline"
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.card}>
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
      </div>
    </section>
  );
}
