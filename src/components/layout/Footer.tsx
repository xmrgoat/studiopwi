import Link from "next/link";
import { getDictionary } from "@/content";
import type { Locale } from "@/i18n/locales";
import { routes } from "@/i18n/routes";
import styles from "./Footer.module.css";

// The nav targets are homepage sections. Off the homepage, "#services" routes
// back to the homepage of the same language ("/#services", "/en#services")
// instead of pointing at nothing on the current page.
export default function Footer({ locale, onHome = false }: { locale: Locale; onHome?: boolean }) {
  const { site, ui } = getDictionary(locale);
  const { footer, name } = site;
  const anchorBase = onHome ? "" : routes.home[locale];
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
            {/* The number in plain text, as the Google Business Profile and
                the JSON-LD telephone state it. */}
            <a
              className={styles.email}
              href={site.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp {site.whatsapp.number}
              <span className="sr-only">{ui.newTab}</span>
            </a>
          </div>

          <nav className={styles.nav} aria-label={ui.footerNav}>
            <ul className={styles.navList}>
              {footer.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href.startsWith("#") ? anchorBase + item.href : item.href}
                    className={styles.navLink}
                  >
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
                    aria-label={`${item.label}${ui.newTab}`}
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
            © {year} {name}. {ui.rights}
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
