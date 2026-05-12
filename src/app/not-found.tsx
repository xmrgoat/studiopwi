import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: "var(--side-pad)",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "60ch" }}>
        <p className="mono" style={{ marginBottom: "var(--space-3)" }}>
          404 / PAGE INTROUVABLE
        </p>
        <h1 style={{ marginBottom: "var(--space-4)" }}>
          Cette page a <span className="accent">poussé ailleurs.</span>
        </h1>
        <Link href="/" className="mono">
          ← Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}
