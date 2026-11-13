import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { site } from "@/content/site";
// The same page as /merci, without the booking button: the next step here is
// the audit itself, not a call.
import styles from "../merci/page.module.css";

// The audit form navigates here after a successful send, so each page view
// is one audit request in Vercel Analytics, counted apart from /merci.
// Out of the index and the sitemap, and linked from nowhere else.
export const metadata: Metadata = {
  title: site.auditThanks.title,
  robots: { index: false, follow: false },
};

export default function AuditThanksPage() {
  const { title, body, nextCta } = site.auditThanks;

  return (
    <>
      <Header />
      <main id="main" className={styles.main}>
        <div className={`container ${styles.inner}`} role="status">
          <svg className={styles.icon} viewBox="0 0 48 48" aria-hidden="true">
            <circle className={styles.disc} cx="24" cy="24" r="24" />
            <path
              className={styles.tick}
              d="M14 24.5l6.5 6.5L34 17.5"
              pathLength="1"
            />
          </svg>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.body}>{body}</p>
          <div className={styles.ctas}>
            <Link href={nextCta.href} className={styles.back}>
              {nextCta.label}
            </Link>
          </div>
        </div>
      </main>
      <Footer anchorBase="/" />
    </>
  );
}
