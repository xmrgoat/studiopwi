import type { CSSProperties } from "react";
import { services, chf } from "@/content/services";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import styles from "./Services.module.css";

// Server component. The three tiers are a list — screen readers announce the
// count, which is useful context when comparing offers.
//
// Each feature row carries its index as --i, which the stylesheet uses to
// tick the checks in one after another once the card is in view.
const indexed = (i: number) => ({ "--i": i }) as CSSProperties;
export default function Services() {
  return (
    <section className={`section ${styles.section}`} id="services">
      <Reveal className={`grid ${styles.header}`}>
        <h2 className={styles.headline}>{services.headline}</h2>
        <p className={styles.intro}>{services.intro}</p>
      </Reveal>

      <ul className={`grid ${styles.cards}`}>
        {services.tiers.map((tier, i) => (
          <Reveal
            as="li"
            key={tier.id}
            order={i}
            className={tier.featured ? `${styles.card} ${styles.featured}` : styles.card}
          >
            {tier.featured && (
              <span className={styles.badge}>{services.featuredBadge}</span>
            )}

            <h3 className={styles.title}>{tier.title}</h3>
            <p className={styles.duration}>{tier.duration}</p>
            <p className={styles.price}>{chf(tier.price)}</p>
            <p className={styles.payment}>{tier.payment}</p>
            <p className={styles.description}>{tier.description}</p>

            <ul className={styles.features}>
              {tier.features.map((feature, j) => (
                <li key={feature} className={styles.feature} style={indexed(j)}>
                  {/* The exported check, drawn as a mask so it can take the
                      card's text colour — ink on the plain cards, accent on
                      the inverted one — from one asset. */}
                  <span className={styles.check} aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className={styles.cta}>
              <Button
                href={tier.cta.href}
                variant={tier.featured ? "primary" : "outline"}
                fullWidth
              >
                {tier.cta.label}
              </Button>
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal className={`grid ${styles.footnoteRow}`}>
        <p className={styles.footnote}>{services.reassurance}</p>
      </Reveal>

      {/* Monthly care plans — lighter than the tier cards: no CTA, no badge.
          h3 under the section's h2, plan names h4, so no level is skipped. */}
      <Reveal className={`grid ${styles.careHeader}`}>
        <h3 className={styles.careHeadline}>{services.care.headline}</h3>
        <p className={styles.careIntro}>{services.care.intro}</p>
      </Reveal>

      <ul className={`grid ${styles.careCards}`}>
        {services.care.plans.map((plan, i) => (
          <Reveal as="li" key={plan.id} order={i} className={styles.careCard}>
            <h4 className={styles.careTitle}>{plan.title}</h4>
            <p className={styles.carePrice}>
              {chf(plan.price)}
              <span className={styles.carePeriod}> / mois</span>
            </p>
            <ul className={styles.features}>
              {plan.features.map((feature, j) => (
                <li key={feature} className={styles.feature} style={indexed(j)}>
                  <span className={styles.check} aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>

      <Reveal className={`grid ${styles.footnoteRow}`}>
        <p className={styles.footnote}>{services.care.footnote}</p>
      </Reveal>
    </section>
  );
}
