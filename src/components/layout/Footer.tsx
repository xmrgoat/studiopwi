import Link from "next/link";
import { site } from "@/content/site";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.accent} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        {/* Left — brand block */}
        <div className={styles.brand}>
          <span className={styles.logo}>{site.name}</span>
          <div className={styles.rule} aria-hidden="true" />
          <p className={styles.tagline}>{site.tagline}</p>
          <a
            href={`mailto:${site.footer.email}`}
            className={styles.emailLink}
          >
            {site.footer.email}
            <span className={styles.arrow} aria-hidden="true">↗</span>
          </a>
        </div>

        {/* Right — nav */}
        <nav className={styles.nav} aria-label="Footer navigation">
          <p className={styles.navLabel}>Navigation</p>
          <ul className={styles.navList}>
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.navLink}>
                  <span className={styles.navArrow} aria-hidden="true">—</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom legal bar */}
      <div className={`container ${styles.legalRow}`}>
        <p className={styles.legal}>
          © {year} {site.name}
          {site.footer.legal.map((l) => (
            <span key={l.href}>
              {" · "}
              <Link href={l.href}>{l.label}</Link>
            </span>
          ))}
        </p>
        <p className={styles.signature}>{site.footer.signature}</p>
      </div>

      {/* Ghost wordmark */}
      <div aria-hidden="true" className={styles.wordmark}>
        PWI
      </div>
    </footer>
  );
}
