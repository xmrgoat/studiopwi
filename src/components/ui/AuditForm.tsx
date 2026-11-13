"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/content/site";
import Button from "./Button";
// Same fields, skeleton and error treatment as the contact form.
import styles from "./ContactForm.module.css";

type Status = "idle" | "submitting" | "error";

const FALLBACK = "Votre demande n'a pas pu être envoyée. Écrivez-nous directement à";

// The free audit request: nom, email, site. On success it lands on
// /merci-audit, whose page views count audit requests in Vercel Analytics.
export default function AuditForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const f = site.audit.form;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const data = new FormData(e.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      site: String(data.get("site") ?? ""),
      locale: "fr" as const,
      website: String(data.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string;
          issues?: { fieldErrors?: Record<string, string[]> };
        } | null;
        const fieldErrors = body?.issues?.fieldErrors;
        const first = fieldErrors ? Object.values(fieldErrors).flat()[0] : null;
        throw new Error(first ?? body?.error ?? FALLBACK);
      }
      router.push("/merci-audit");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error && err.message ? err.message : FALLBACK);
    }
  }

  if (status === "submitting") {
    return (
      <div className={styles.skeleton} aria-busy="true" aria-label="Envoi en cours…">
        <div className={styles.skeletonField} />
        <div className={styles.skeletonField} />
        <div className={styles.skeletonField} />
        <div className={styles.skeletonBtn} />
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <label className={styles.field}>
        <span className={styles.label}>{f.name.label}</span>
        <input
          type="text"
          name="name"
          required
          minLength={2}
          maxLength={120}
          autoComplete="name"
          placeholder={f.name.placeholder}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>{f.email.label}</span>
        <input
          type="email"
          name="email"
          required
          maxLength={200}
          autoComplete="email"
          placeholder={f.email.placeholder}
        />
      </label>

      {/* type="text", not "url": "monsite.ch" without https:// is how people
          write it, and a company name stands in when there is no site. */}
      <label className={styles.field}>
        <span className={styles.label}>{f.site.label}</span>
        <input
          type="text"
          name="site"
          required
          minLength={3}
          maxLength={300}
          inputMode="url"
          autoComplete="url"
          placeholder={f.site.placeholder}
          aria-describedby="audit-site-hint"
        />
        <span id="audit-site-hint" className={styles.hint}>
          {f.site.hint}
        </span>
      </label>

      {/* Honeypot — hidden from humans, traps bots. */}
      <label className={styles.honeypot} aria-hidden="true">
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

      {error && (
        <p className={styles.error} role="alert">
          {error}{" "}
          <a className={styles.errorLink} href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
      )}

      <div className={styles.submit}>
        <Button type="submit" fullWidth>
          {f.submit}
        </Button>
        <p className={styles.reassurance}>{f.reassurance}</p>
      </div>
    </form>
  );
}
