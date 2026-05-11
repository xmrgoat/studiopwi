"use client";

import { useState, type FormEvent } from "react";
import styles from "./NewsletterForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";

export default function NewsletterForm({ source = "footer" }: { source?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      email: String(formData.get("email") ?? ""),
      locale: "fr" as const,
      source,
      website: String(formData.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Request failed");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    }
  }

  if (status === "success") {
    return (
      <p className={styles.success} role="status" aria-live="polite">
        Vérifiez votre boîte mail pour confirmer.
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <label htmlFor="newsletter-email" className="mono">
        Newsletter
      </label>
      <div className={styles.inputRow}>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          maxLength={200}
          placeholder="your@email.com"
          autoComplete="email"
        />
        <button
          type="submit"
          aria-label="S'abonner"
          disabled={status === "submitting"}
        >
          →
        </button>
      </div>

      <label className={styles.honeypot} aria-hidden="true">
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
