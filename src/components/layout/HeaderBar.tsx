"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { markHydrated } from "@/lib/navigation";
import styles from "./Header.module.css";

export type ProjectLink = { href: string; client: string; teaser: string };

// A nav entry is a link, or the "Réalisations" entry that opens the project
// list. Typed here rather than inferred, so the component compiles whatever
// site.nav holds.
type NavItem = { label: string; href?: string; menu?: "projects" };

const MENU_ID = "projects-menu";

// The project list arrives as props from the server-side Header, so the
// project-page copy in cases.ts never ships in this bundle.
export default function HeaderBar({ projects }: { projects: readonly ProjectLink[] }) {
  const ref = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const nav: readonly NavItem[] = site.nav;
  // Same entries, in the phone drawer's own order (site.drawerOrder).
  const drawerNav = site.drawerOrder
    .map((label) => nav.find((item) => item.label === label))
    .filter((item): item is NavItem => item !== undefined);

  // The nav targets are homepage sections. Off the homepage a bare "#services"
  // points at nothing on the current page, so route back to "/#services" —
  // except "#contact", which has a page of its own: /contact is lighter than
  // the whole homepage, and on /contact itself the form is already there.
  const pathname = usePathname();
  const onHome = pathname === "/";
  const resolve = (href: string) => {
    if (onHome || !href.startsWith("#")) return href;
    return href === "#contact" ? "/contact" : `/${href}`;
  };
  const current = (href: string) => (href === pathname ? ("page" as const) : undefined);
  const onProject = projects.some((p) => p.href === pathname);
  const delay = (i: number) => ({ "--i": i }) as CSSProperties;

  // Runs once the whole page has rendered: from here on, a newly mounted
  // component arrived by navigation (see lib/navigation).
  useEffect(markHydrated, []);

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

  // A new page closes whatever was open on the last one.
  useEffect(() => {
    setMenuOpen(false);
    setMobileOpen(false);
  }, [pathname]);

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

  // The projects panel closes on Escape (focus back on its button) and on any
  // press outside it.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      menuButton.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!menuButton.current?.parentElement?.contains(e.target as Node)) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close drawer on any anchor click inside it (event delegation). Same-page
  // links don't change the pathname, so the effect above can't catch them.
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
          {nav.map((item, i) =>
            item.menu === "projects" ? (
              <div
                key={item.label}
                className={styles.menu}
                // Tabbing out of the panel closes it.
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMenuOpen(false);
                }}
              >
                <button
                  ref={menuButton}
                  type="button"
                  className={`${styles.navLink} ${styles.menuButton}`}
                  style={delay(i)}
                  aria-expanded={menuOpen}
                  aria-controls={MENU_ID}
                  data-active={onProject || undefined}
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  {item.label}
                  <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.chevron}>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div
                  id={MENU_ID}
                  className={`${styles.panel} ${menuOpen ? styles.panelOpen : ""}`}
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest("a")) setMenuOpen(false);
                  }}
                >
                  <ul className={styles.panelList}>
                    {projects.map((p) => (
                      <li key={p.href}>
                        <Link href={p.href} className={styles.panelLink} aria-current={current(p.href)}>
                          <span className={styles.panelClient}>{p.client}</span>
                          <span className={styles.panelTeaser}>{p.teaser}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : item.href ? (
              <Link
                key={item.href}
                href={resolve(item.href)}
                className={styles.navLink}
                style={delay(i)}
                aria-current={current(item.href)}
              >
                {item.label}
              </Link>
            ) : null,
          )}
        </nav>

        {/* The action cluster: click-to-call (phones only, once a number is
            set in site.ts), the header CTA (every breakpoint), the burger. */}
        <div className={styles.actions}>
          {site.phone && (
            <a
              href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
              className={styles.phone}
              aria-label={`Appeler le ${site.phone}`}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.phoneIcon}>
                <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
              </svg>
            </a>
          )}

          <Link href={resolve(site.headerCta.href)} className={styles.cta}>
            {site.headerCta.label}
          </Link>

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
          {drawerNav.map((item, i) =>
            item.menu === "projects" ? (
              <div key={item.label} className={styles.drawerGroup} style={delay(i)}>
                <span className={styles.drawerGroupLabel} id="drawer-projects">
                  {item.label}
                </span>
                <ul className={styles.drawerSubList} aria-labelledby="drawer-projects">
                  {projects.map((p) => (
                    <li key={p.href}>
                      <Link href={p.href} className={styles.drawerSubLink} aria-current={current(p.href)}>
                        <span className={styles.panelClient}>{p.client}</span>
                        <span className={styles.panelTeaser}>{p.teaser}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : item.href ? (
              <Link
                key={item.href}
                href={resolve(item.href)}
                className={styles.drawerLink}
                style={delay(i)}
                aria-current={current(item.href)}
              >
                {item.label}
              </Link>
            ) : null,
          )}
        </nav>

        {/* WhatsApp lives in the drawer rather than the bar: at 360–390px the
            bar has ~10–16px to spare, not the 52px an icon button needs. */}
        <a
          href={site.whatsapp.url}
          className={styles.drawerWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.whatsappIcon} aria-hidden="true" />
          {site.whatsapp.label}
          <span className="sr-only"> (nouvel onglet)</span>
        </a>
      </div>
    </header>
  );
}
