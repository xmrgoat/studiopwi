import Link from "next/link";
import { site } from "@/content/site";
import NewsletterForm from "@/components/ui/NewsletterForm";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.col}>
          <p className={styles.tagline}>{site.tagline}</p>
          <address className={styles.address}>{site.address}</address>
        </div>

        <div className={styles.col}>
          <p className="mono">Navigate</p>
          <ul className={styles.list}>
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <NewsletterForm source="footer" />
          <ul className={styles.socials}>
            {site.footer.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`container ${styles.legalRow}`}>
        <p className="mono">
          © {year} {site.name}
          {site.footer.legal.map((l) => (
            <span key={l.href}>
              {" · "}
              <Link href={l.href}>{l.label}</Link>
            </span>
          ))}
        </p>
        <p className="mono">{site.footer.signature}</p>
      </div>

      <div aria-hidden="true" className={styles.wordmark}>
        {site.name}
      </div>
    </footer>
  );
}
