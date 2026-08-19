"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";
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

  // Close drawer when viewport widens past the burger breakpoint (1024px).
  // Must stay in sync with the .nav / .drawer / .burger media queries in
  // Header.module.css — both transition at 1024px.
  useEffect(() => {
    if (!mobileOpen) return;
    const close = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, [mobileOpen]);

  // Escape closes the drawer — it traps scroll and covers the page, so it needs
  // the same dismissal affordance as any modal surface.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close drawer on any anchor click inside it (event delegation)
  function onDrawerClick(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest("a")) setMobileOpen(false);
  }

  return (
    <header ref={ref} className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label={`${site.name} — accueil`}>
          <span className={styles.wordmark}>{site.name}</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Three bars, per the Figma "ri:menu-fill" burger. They are geometry
            the design specifies outright, not an icon glyph, so they are spans
            rather than an exported asset. */}
        <button
          type="button"
          className={styles.burger}
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-drawer"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <span
            className={`${styles.burgerBox} ${mobileOpen ? styles.burgerOpen : ""}`}
            aria-hidden="true"
          >
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </span>
        </button>
      </div>

      {/* Mobile drawer — slides down from header on small viewports.
          Closed state is visibility:hidden in CSS, which also removes the links
          from the tab order; aria-hidden alone would leave them focusable. */}
      <div
        id="mobile-drawer"
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
      </div>
    </header>
  );
}
