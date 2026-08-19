import Link from "next/link";
import { site } from "@/content/site";
import styles from "./Footer.module.css";

export default function Footer() {
  const { footer, name } = site;
  // Rendered at build time. Better than the Figma's literal "2025", which was
  // already a year out of date when this was built.
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.columns}>
          <div className={styles.brand}>
            <p className={styles.wordmark}>{name}</p>
            <p className={styles.tagline}>{footer.tagline}</p>
            <a className={styles.email} href={`mailto:${footer.email}`}>
              {footer.email}
            </a>
          </div>

          <nav className={styles.nav} aria-label="Pied de page">
            <ul className={styles.navList}>
              {footer.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.navLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.social}>
            <p className={styles.socialLabel}>{footer.socialLabel}</p>
            <ul className={styles.socialList}>
              {footer.social.map((item) => (
                <li key={item.href}>
                  <a
                    className={styles.socialLink}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label} (nouvel onglet)`}
                  >
                    <span
                      className={styles.socialIcon}
                      data-icon={item.label.toLowerCase()}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {year} {name}. Tous droits réservés.
          </p>
          <ul className={styles.legal}>
            {footer.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.legalLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
