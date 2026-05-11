"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import Button from "@/components/ui/Button";
import styles from "./Header.module.css";

export default function Header() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      el.classList.toggle(styles.scrolled ?? "is-scrolled", window.scrollY > 40);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header ref={ref} className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label={`${site.name} home`}>
          <span className={styles.mark} aria-hidden="true">◐</span>
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
            Start a project
          </Button>
        </div>
      </div>
    </header>
  );
}
