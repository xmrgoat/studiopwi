import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getDictionary } from "@/content";
import type { Locale } from "@/i18n/locales";
import { routes } from "@/i18n/routes";
import styles from "./LegalPage.module.css";

interface Props {
  locale: Locale;
  eyebrow: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}

export default function LegalPage({ locale, eyebrow, title, updated, children }: Props) {
  const { ui } = getDictionary(locale);
  return (
    <>
      <Header locale={locale} />
      <main id="main" className={styles.main}>
        <div className={`container ${styles.wrapper}`}>
          <Link href={routes.home[locale]} className={styles.back}>
            {ui.backHome}
          </Link>
          <header className={styles.header}>
            <p className={`mono ${styles.eyebrow}`}>{eyebrow}</p>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.updated}>
              {ui.updated} {updated}
            </p>
          </header>
          <div className={styles.body}>{children}</div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
