"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import Button from "@/components/ui/Button";
import styles from "./Header.module.css";

export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;

    // Sentinel: 80px tall, negative margin collapses it so it takes no layout space.
    // When scrolled 80px, sentinel leaves viewport → header gains .scrolled.
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText =
      "height:80px;margin-bottom:-80px;pointer-events:none;visibility:hidden;";
    document.body.insertBefore(sentinel, document.body.firstChild);

    const observer = new IntersectionObserver((entries) => {
      const e = entries[0];
      if (!e) return;
      header.classList.toggle(styles.scrolled ?? "scrolled", !e.isIntersecting);
    });
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  // Close drawer when viewport widens past mobile breakpoint
  useEffect(() => {
    if (!mobileOpen) return;
    const close = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, [mobileOpen]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close drawer on any anchor click inside it (event delegation)
  function onDrawerClick(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest("a")) setMobileOpen(false);
  }

  return (
    <header ref={ref} className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label={`${site.name} home`}>
          <span className={styles.wordmark}>{site.name}</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.cta}>
          <Button href="#contact" variant="primary">
            Démarrer un projet
          </Button>
        </div>

        <button
          type="button"
          className={styles.burger}
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <span className={`${styles.burgerLine} ${mobileOpen ? styles.burgerOpen : ""}`} />
        </button>
      </div>

      {/* Mobile drawer — slides down from header on small viewports */}
      <div
        className={`${styles.drawer} ${mobileOpen ? styles.drawerOpen : ""}`}
        aria-hidden={!mobileOpen}
        onClick={onDrawerClick}
      >
        <nav className={styles.drawerNav} aria-label="Mobile primary">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className={styles.drawerLink}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.drawerCta}>
          <Button href="#contact" variant="primary">
            Démarrer un projet
          </Button>
        </div>
      </div>
    </header>
  );
}
