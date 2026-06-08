"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import Button from "@/components/ui/Button";
import ItalicAccent from "@/components/ui/ItalicAccent";
import SplitWords from "@/components/motion/SplitWords";
import styles from "./Hero.module.css";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // The hero entrance is pure CSS (see Hero.module.css), so above-the-fold
  // needs no JavaScript and GSAP stays off the mobile critical path. GSAP is
  // imported lazily here only for the desktop parallax — which is gated to wide
  // viewports + no-reduced-motion, so it never loads on phones at all.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (
      window.innerWidth < 769 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    void import("@/lib/motion").then(
      ({ gsap, ScrollTrigger, registerGsapPlugins }) => {
        if (cancelled) return;
        registerGsapPlugins();
        ctx = gsap.context(() => {
          gsap.to(`.${styles.inner}`, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 1 },
          });
          gsap.fromTo(
            `.${styles.media} video`,
            { scale: 1 },
            {
              scale: 1.08,
              ease: "none",
              scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 1 },
            },
          );
        }, root);
        ScrollTrigger.refresh();
      },
    );

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && window.innerWidth >= 768) {
      video.play().catch(() => {
        // Autoplay blocked — poster stays visible.
      });
    }
  }, []);

  const { headline, video, primaryCta } = site.hero;

  return (
    <section
      ref={rootRef}
      className={`${styles.hero} hero-section`}
      id="top"
      aria-labelledby="hero-headline"
    >
      <div className={styles.media} aria-hidden="true">
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          muted
          loop
          playsInline
          preload="none"
          width={1920}
          height={1080}
        />
      </div>
      <div className={styles.scrim} aria-hidden="true" />

<div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <h1 id="hero-headline" className={styles.headline}>
            <SplitWords text={headline.before} />{" "}
            <span className={`word ${styles.accentWord}`}>
              <span className={styles.accentInner}>
                <ItalicAccent>{headline.accent}</ItalicAccent>
              </span>
            </span>{" "}
            <SplitWords text={headline.after} />
          </h1>
          <p className={`lead ${styles.lead}`}>{site.hero.lead}</p>
          <div className={`ctas ${styles.ctas}`}>
            <Button href={primaryCta.href} variant="primary">
              {primaryCta.label}
            </Button>

          </div>
        </div>
      </div>

    </section>
  );
}
