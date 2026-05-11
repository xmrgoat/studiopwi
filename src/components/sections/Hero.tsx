"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import Button from "@/components/ui/Button";
import ItalicAccent from "@/components/ui/ItalicAccent";
import Counter from "@/components/motion/Counter";
import SplitWords from "@/components/motion/SplitWords";
import {
  gsap,
  ScrollTrigger,
  registerGsapPlugins,
  prefersReducedMotion,
} from "@/lib/motion";
import styles from "./Hero.module.css";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    registerGsapPlugins();

    const root = rootRef.current;
    if (!root) return;

    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".eyebrow", ".lead", ".ctas > *", ".scroll-cue", `.${styles.coord}`], {
          opacity: 1,
        });
        gsap.set(".word > span", { y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(`.${styles.coord}`, { opacity: 0, duration: 1.2 })
        .from(".eyebrow", { opacity: 0, y: 8, duration: 0.7 }, "-=0.9")
        .from(
          ".word > span",
          { yPercent: 100, duration: 1, stagger: 0.05 },
          "-=0.4",
        )
        .from(".lead", { opacity: 0, y: 16, duration: 0.7 }, "-=0.5")
        .from(
          ".ctas > *",
          { opacity: 0, y: 8, duration: 0.5, stagger: 0.08 },
          "-=0.4",
        )
        .from(".scroll-cue", { opacity: 0, duration: 0.5 }, "-=0.2");

      const mm = gsap.matchMedia();
      mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.to(`.${styles.inner}`, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.fromTo(
          `.${styles.media} video`,
          { scale: 1 },
          {
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!prefersReducedMotion()) {
      video.play().catch(() => {
        // Autoplay blocked — poster stays visible.
      });
    }
  }, []);

  const { headline, metrics, video, primaryCta, secondaryCta } = site.hero;

  return (
    <section ref={rootRef} className={styles.hero} id="top">
      <div className={styles.media} aria-hidden="true">
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          muted
          loop
          playsInline
          preload="metadata"
          width={1920}
          height={1080}
        />
      </div>
      <div className={styles.scrim} aria-hidden="true" />

      <span className={styles.coord} aria-hidden="true">
        47.0°N · 6.9°E · CH
      </span>

      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <p className={`eyebrow mono ${styles.eyebrow}`}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            {site.hero.eyebrow}
          </p>
          <h1 className={styles.headline}>
            <SplitWords text={headline.before} />{" "}
            <span className="word" style={{ display: "inline-block", overflow: "hidden" }}>
              <span style={{ display: "inline-block" }}>
                <ItalicAccent>{headline.accent}</ItalicAccent>
              </span>
            </span>{" "}
            <SplitWords text={headline.after} />
          </h1>
          <p className={`lead ${styles.lead}`}>{site.hero.lead}</p>
          <div className={`ctas ${styles.ctas}`}>
            <Button href={primaryCta.href} variant="primary" magnetic>
              {primaryCta.label}
            </Button>
            <Button href={secondaryCta.href} variant="ghost">
              {secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>

      <ul className={`${styles.metrics} container`} aria-label="Studio metrics">
        {metrics.map((m) => (
          <li key={m.label}>
            <strong>
              <Counter value={m.value} suffix={"suffix" in m ? m.suffix : undefined} />
            </strong>
            <span className="mono">{m.label}</span>
          </li>
        ))}
      </ul>

      <a href="#trust" className={`scroll-cue ${styles.scrollCue}`} aria-label="Scroll to next section">
        <span className="mono">Scroll</span>
        <span className={styles.scrollLine} aria-hidden="true" />
      </a>
    </section>
  );
}
