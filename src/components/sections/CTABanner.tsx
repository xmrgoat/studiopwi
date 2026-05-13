import { site } from "@/content/site";
import ItalicAccent from "@/components/ui/ItalicAccent";
import Button from "@/components/ui/Button";
import styles from "./CTABanner.module.css";

export default function CTABanner() {
  const { ctaBanner } = site;

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.copy}>
            <h2 className={styles.headline}>
              {ctaBanner.headline.before}{" "}
              <ItalicAccent>{ctaBanner.headline.accent}</ItalicAccent>
            </h2>
            <p className={styles.lead}>{ctaBanner.lead}</p>
          </div>
          <Button href={ctaBanner.cta.href} variant="primary">
            {ctaBanner.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
