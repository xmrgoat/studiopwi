"use client";

import { useState, type FormEvent } from "react";
import Button from "./Button";
import styles from "./ContactForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  tier?: "showcase" | "growth" | "partnership";
  source?: "hero" | "services" | "final-cta" | "direct";
};

export default function ContactForm({ tier, source = "direct" }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? "") || undefined,
      message: String(formData.get("message") ?? ""),
      tier,
      source,
      locale: "fr" as const,
      website: String(formData.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
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

  if (status === "submitting") {
    return (
      <div className={styles.skeleton} aria-busy="true" aria-label="Envoi en cours…">
        <div className={styles.skeletonRow}>
          <div className={styles.skeletonField} />
          <div className={styles.skeletonField} />
        </div>
        <div className={styles.skeletonField} />
        <div className={`${styles.skeletonField} ${styles.skeletonTextarea}`} />
        <div className={styles.skeletonBtn} />
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className={styles.success} role="status" aria-live="polite">
        <p className={styles.successLabel}>Message reçu</p>
        <p className={styles.successText}>Merci. On revient vers vous sous 24h ouvrées.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Nom</span>
          <input
            type="text"
            name="name"
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
            placeholder="Jean Dupont"
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input
            type="email"
            name="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="jean@entreprise.ch"
          />
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Société (optionnel)</span>
        <input
          type="text"
          name="company"
          maxLength={120}
          autoComplete="organization"
          placeholder="Jardins Dupont Sàrl"
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={5}
          placeholder="Décrivez votre projet, votre activité, vos objectifs…"
        />
      </label>

      {/* Honeypot — hidden from humans, traps bots. */}
      <label className={styles.honeypot} aria-hidden="true">
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <div className={styles.submit}>
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Envoi…" : "Envoyer le message"}
        </Button>
      </div>
    </form>
  );
}
