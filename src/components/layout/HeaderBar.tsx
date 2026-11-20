"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { markHydrated } from "@/lib/navigation";
import styles from "./Header.module.css";

export type ProjectLink = { href: string; client: string; teaser: string };

// A nav entry is a link, or the "Réalisations" entry that opens the project
// list. Typed here rather than inferred, so the component compiles whatever
// the copy holds.
type NavItem = { label: string; href?: string; menu?: string };

// Everything the bar shows, in the page's language, from the server-side
// Header: the dictionaries never ship in this bundle.
export type HeaderCopy = {
  name: string;
  nav: readonly NavItem[];
  headerCta: { label: string; href: string };
  phone: string | null;
  whatsapp: { url: string; label: string };
  ui: {
    newTab: string;
    homeLabel: string;
    primaryNav: string;
    mobileNav: string;
    openMenu: string;
    closeMenu: string;
    callLabel: string;
  };
  /** This language's homepage and contact page ("/", "/contact" or "/en", "/en/contact"). */
  home: string;
  contact: string;
  /** The link to the same page in the other language. */
  switcher: {
    short: string;
    label: string;
    lang: string;
    /** Pathname -> its translation (i18n/routes switchMap). */
    map: Record<string, string>;
    /** Where to go from a page with no translation: the other homepage. */
    fallback: string;
  };
};

const MENU_ID = "projects-menu";

// The project list arrives as props from the server-side Header, so the
// project-page copy in cases.ts never ships in this bundle.
export default function HeaderBar({
  projects,
  copy,
}: {
  projects: readonly ProjectLink[];
  copy: HeaderCopy;
}) {
  const ref = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { nav, ui, switcher } = copy;

  // The nav targets are homepage sections. Off the homepage a bare "#services"
  // points at nothing on the current page, so route back to the homepage of
  // the same language ("/#services", "/en#services") — except "#contact",
  // which has a page of its own: /contact is lighter than the whole homepage,
  // and on /contact itself the form is already there.
  const pathname = usePathname();
  const onHome = pathname === copy.home;
  const resolve = (href: string) => {
    if (onHome || !href.startsWith("#")) return href;
    return href === "#contact" ? copy.contact : `${copy.home}${href}`;
  };
  // A plain <a>, not a Link: each language has its own root layout, so the
  // switch is a full page load either way.
  const switchHref = switcher.map[pathname] ?? switcher.fallback;
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
        <Link href={copy.home} className={styles.logo} aria-label={`${copy.name} — ${ui.homeLabel}`}>
          <span className={styles.wordmark}>{copy.name}</span>
        </Link>

        <nav className={styles.nav} aria-label={ui.primaryNav}>
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

        {/* The action cluster: the language switch (desktop; phones find it
            in the drawer), click-to-call (phones only, once a number is set
            in facts.ts), the header CTA (every breakpoint), the burger. */}
        <div className={styles.actions}>
          <a href={switchHref} className={styles.lang} hrefLang={switcher.lang} lang={switcher.lang}>
            {switcher.short}
            <span className="sr-only"> — {switcher.label}</span>
          </a>

          {copy.phone && (
            <a
              href={`tel:${copy.phone.replace(/[^\d+]/g, "")}`}
              className={styles.phone}
              aria-label={`${ui.callLabel} ${copy.phone}`}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.phoneIcon}>
                <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
              </svg>
            </a>
          )}

          <Link
            href={resolve(copy.headerCta.href)}
            className={styles.cta}
            data-magnetic=""
          >
            {copy.headerCta.label}
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
            aria-label={mobileOpen ? ui.closeMenu : ui.openMenu}
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
        <nav className={styles.drawerNav} aria-label={ui.mobileNav}>
          {nav.map((item, i) =>
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
          href={copy.whatsapp.url}
          className={styles.drawerWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.whatsappIcon} aria-hidden="true" />
          {copy.whatsapp.label}
          <span className="sr-only">{ui.newTab}</span>
        </a>

        {/* The language switch, on phones: the bar has no room for it at
            360-390px. Written in the other language, as in the bar. */}
        <a href={switchHref} className={styles.drawerLang} hrefLang={switcher.lang} lang={switcher.lang}>
          {switcher.label}
        </a>
      </div>
    </header>
  );
}
