import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "./LegalPage.module.css";

interface Props {
  eyebrow: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}

export default function LegalPage({ eyebrow, title, updated, children }: Props) {
  return (
    <>
      <Header />
      <main id="main" className={styles.main}>
        <div className={`container ${styles.wrapper}`}>
          <Link href="/" className={styles.back}>
            ← Retour à l&apos;accueil
          </Link>
          <header className={styles.header}>
            <p className={`mono ${styles.eyebrow}`}>{eyebrow}</p>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.updated}>Mise à jour : {updated}</p>
          </header>
          <div className={styles.body}>{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
