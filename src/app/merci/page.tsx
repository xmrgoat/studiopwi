import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { site } from "@/content/site";
import styles from "./page.module.css";

// The contact form navigates here after a successful send, so every page view
// of /merci in Vercel Analytics is one lead — the site's conversion count.
// Kept out of the index and the sitemap: a search visit would count as a lead.
export const metadata: Metadata = {
  title: site.thanks.title,
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  const { title, body, nextCta, backLabel } = site.thanks;

  return (
    <>
      <Header />
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
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.body}>{body}</p>
          <div className={styles.ctas}>
            <Button href={nextCta.href} variant="primary">
              {nextCta.label}
            </Button>
            <Link href="/" className={styles.back}>
              {backLabel}
            </Link>
          </div>
        </div>
      </main>
      <Footer anchorBase="/" />
    </>
  );
}
