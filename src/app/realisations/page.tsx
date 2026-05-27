import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cases } from "@/content/cases";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Études de cas de Studio PWI — sites web conçus pour des paysagistes en Suisse romande. Découvrez nos projets et les résultats obtenus.",
  alternates: { canonical: "/realisations" },
};

export default function RealisationsPage() {
  return (
    <>
      <Header />
      <main id="main" className={styles.main}>
        <div className={`container ${styles.wrapper}`}>
          <Link href="/#realisations" className={styles.back}>
            ← Retour à l&apos;accueil
          </Link>
          <header className={styles.header}>
            <p className={`mono ${styles.eyebrow}`}>RÉALISATIONS</p>
            <h1 className={styles.title}>
              Nos projets pour des{" "}
              <em className="accent">paysagistes suisses.</em>
            </h1>
            <p className={styles.lead}>
              Chaque projet est construit autour d&apos;un objectif : transformer
              les visiteurs en demandes de devis qualifiées.
            </p>
          </header>

          <div className={styles.grid}>
            {cases.items.map((c) => (
              <Link
                key={c.slug}
                href={`/realisations/${c.slug}`}
                className={styles.card}
              >
                <div className={styles.cardImage}>
                  <Image
                    src={c.image.src}
                    alt={c.image.alt}
                    width={900}
                    height={600}
                    sizes="(min-width: 1024px) 45vw, 95vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className={styles.cardBody}>
                  <p className={`mono ${styles.cardTag}`}>{c.tag}</p>
                  <h2 className={styles.cardTitle}>{c.client}</h2>
                  <p className={`mono ${styles.cardMeta}`}>
                    {c.location} &middot; {c.year}
                  </p>
                  <p className={styles.cardChallenge}>{c.challenge}</p>
                  <span className={styles.cardCta}>Voir l&apos;étude de cas →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
