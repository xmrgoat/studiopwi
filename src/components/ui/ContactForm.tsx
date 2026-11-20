"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/i18n/locales";
import Button from "./Button";
import styles from "./ContactForm.module.css";

type Status = "idle" | "submitting" | "error";

type Tier = "showcase" | "growth" | "partnership";

type Field = { label: string; placeholder: string };

// Only the strings this form renders, passed in by the server-side Contact
// section, so neither language's whole dictionary ships in the bundle.
export type ContactFormCopy = {
  name: Field;
  email: Field;
  message: Field;
  submit: string;
  reassurance: string;
  /** "{plan}" becomes the offer's name. */
  offerPrefill: string;
  error: string;
  sending: string;
  contactEmail: string;
  /** The offers a service card can pass in (id → name in this language). */
  tiers: readonly { id: Tier; title: string }[];
  /** Where a successful send lands: /merci or /en/thank-you. */
  thanksHref: string;
};

type Props = {
  locale: Locale;
  copy: ContactFormCopy;
  tier?: Tier;
  source?: "hero" | "services" | "final-cta" | "direct" | "contact";
};

export default function ContactForm({ locale, copy: f, tier: initialTier, source = "direct" }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [tier, setTier] = useState<Tier | undefined>(initialTier);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // A service card's button carries its tier (data-offer, see Button). On
  // that click — before the page has scrolled to the form — note the tier for
  // the lead email and prefill the message with the offer's name, unless the
  // visitor has already written something of their own.
  useEffect(() => {
    let prefill = "";
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-offer]");
      const id = el?.dataset.offer;
      const offer = f.tiers.find((t) => t.id === id);
      if (!offer) return;
      setTier(offer.id);
      const box = messageRef.current;
      if (box && (box.value === "" || box.value === prefill)) {
        prefill = `${f.offerPrefill} ${offer.title}.\n\n`;
        box.value = prefill;
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [f.offerPrefill, f.tiers]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      tier,
      source,
      locale,
      website: String(formData.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
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
        const firstFieldError = fieldErrors
          ? Object.values(fieldErrors).flat()[0]
          : null;
        throw new Error(firstFieldError ?? body?.error ?? f.error);
      }
      // A page, not an in-place panel: each view of /merci (or, in English,
      // /en/thank-you) is a lead in Vercel Analytics. The skeleton stays up
      // until the route swaps in.
      router.push(f.thanksHref);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error && err.message ? err.message : f.error);
    }
  }

  if (status === "submitting") {
    return (
      <div className={styles.skeleton} aria-busy="true" aria-label={f.sending}>
        <div className={styles.skeletonField} />
        <div className={styles.skeletonField} />
        <div className={`${styles.skeletonField} ${styles.skeletonTextarea}`} />
        <div className={styles.skeletonBtn} />
      </div>
    );
  }

  // Kept to the minimum a reply needs: nom, email, message. The Figma's
  // téléphone field went once WhatsApp became the quick route; it stays
  // optional in the API schema (with the old "société" and "site web actuel"),
  // so nothing breaks for callers that still send it.
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

      <label className={styles.field}>
        <span className={styles.label}>{f.message.label}</span>
        <textarea
          ref={messageRef}
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={5}
          placeholder={f.message.placeholder}
        />
      </label>

      {/* Honeypot — hidden from humans, traps bots. */}
      <label className={styles.honeypot} aria-hidden="true">
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

      {/* With no database behind the form, a failed send means the enquiry is
          gone — so the error always offers the mail address as a way through
          rather than just reporting failure. */}
      {error && (
        <p className={styles.error} role="alert">
          {error}{" "}
          <a className={styles.errorLink} href={`mailto:${f.contactEmail}`}>
            {f.contactEmail}
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
