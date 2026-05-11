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
          404 / NOT FOUND
        </p>
        <h1 style={{ marginBottom: "var(--space-4)" }}>
          This page has <span className="accent">grown elsewhere.</span>
        </h1>
        <Link href="/" className="mono">
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
