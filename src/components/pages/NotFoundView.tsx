import Link from "next/link";
import { getDictionary } from "@/content";
import type { Locale } from "@/i18n/locales";
import { routes } from "@/i18n/routes";

// The 404, in either language. `other` adds a line in the other language,
// for the global 404 (app/global-not-found.tsx), which can't know which
// language the visitor came for.
export default function NotFoundView({ locale, other }: { locale: Locale; other?: Locale }) {
  const { ui } = getDictionary(locale);
  const alt = other ? getDictionary(other).ui : null;
  return (
    <main
      id="main"
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: "var(--side-pad)",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "60ch" }}>
        <p className="mono" style={{ marginBottom: "var(--space-3)" }}>
          {ui.notFound.eyebrow}
        </p>
        <h1 style={{ marginBottom: "var(--space-4)" }}>
          {ui.notFound.before}
          <span className="accent">{ui.notFound.accent}</span>
        </h1>
        <Link href={routes.home[locale]} className="mono">
          {ui.backHome}
        </Link>
        {other && alt && (
          <p lang={other} style={{ marginTop: "var(--space-4)" }}>
            <Link href={routes.home[other]} className="mono" hrefLang={other}>
              {alt.backHome}
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}
