import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { getDictionary } from "@/content";
import type { Locale } from "@/i18n/locales";
import styles from "./ThanksPage.module.css";

// Where the forms land after a successful send. Each page view is one
// conversion in Vercel Analytics, so these pages are noindex, out of the
// sitemap, linked from nowhere else, and never a language-switch target:
//   contact leads   /merci        /en/thank-you
//   audit requests  /merci-audit  /en/thank-you-audit
//
// The contact page offers the call right away (the lead is in; booking now
// closes the loop without waiting for the reply). The audit page doesn't:
// its next step is the audit itself, not a call.
export default function ThanksPage({ locale, kind }: { locale: Locale; kind: "contact" | "audit" }) {
  const { site, ui } = getDictionary(locale);
  const copy = kind === "contact" ? site.thanks : site.auditThanks;

  return (
    <>
      <Header locale={locale} />
      <main id="main" className={styles.main}>
        <div className={`container ${styles.inner}`} role="status">
          {/* Accent disc with an ink tick that draws itself. pathLength="1"
              lets the stylesheet animate the stroke without measuring it. */}
          <svg className={styles.icon} viewBox="0 0 48 48" aria-hidden="true">
            <circle className={styles.disc} cx="24" cy="24" r="24" />
            <path
              className={styles.tick}
              d="M14 24.5l6.5 6.5L34 17.5"
              pathLength="1"
            />
          </svg>
          <h1 className={styles.title}>{copy.title}</h1>
          <p className={styles.body}>{copy.body}</p>
          <div className={styles.ctas}>
            {kind === "contact" && (
              <Button href={site.booking.url} variant="primary" external newTabNote={ui.newTab}>
                {site.thanks.bookingLabel}
              </Button>
            )}
            <Link href={copy.nextCta.href} className={styles.back}>
              {copy.nextCta.label}
            </Link>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
