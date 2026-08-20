import { site } from "@/content/site";
import Button from "@/components/ui/Button";
import styles from "./Hero.module.css";

// Server component, zero client JS. The redesign adds a full-bleed background
// photo behind the headline/lead/CTA on both breakpoints — a floating
// translucent card on desktop, a near-opaque page-ground wash over the whole
// frame on mobile (see the "mobile Hero" Figma frame). The photo is a plain
// CSS background-image in Hero.module.css, not a next/image, and not marked
// priority — the earlier mobile-LCP work in this repo traced the mobile
// bottleneck to main-thread/TBT saturation from JS hydration, not asset
// weight, so one ~60KB avif behind text is not the thing to guard against
// here; a render-blocking preload would be.
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
