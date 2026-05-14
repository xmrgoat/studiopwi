"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import Button from "@/components/ui/Button";
import ItalicAccent from "@/components/ui/ItalicAccent";
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
        gsap.set([".eyebrow", ".lead", ".ctas > *", ".scroll-cue"], {
          opacity: 1,
        });
        gsap.set(".word > span", { y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".word > span", { opacity: 0, y: 18, duration: 0.7, stagger: 0.03 }, 0)
        .from(".eyebrow", { opacity: 0, y: 6, duration: 0.5 }, 0)
        .from(".lead", { opacity: 0, y: 10, duration: 0.6 }, 0.2)
        .from(".ctas > *", { opacity: 0, y: 6, duration: 0.5, stagger: 0.07 }, 0.3);

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

  const { headline, video, primaryCta, secondaryCta } = site.hero;

  return (
    <section
      ref={rootRef}
      className={styles.hero}
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
          preload="metadata"
          width={1920}
          height={1080}
        />
      </div>
      <div className={styles.scrim} aria-hidden="true" />

<div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <p className={`eyebrow mono ${styles.eyebrow}`}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            {site.hero.eyebrow}
          </p>
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
            <Button href={primaryCta.href} variant="primary" magnetic>
              {primaryCta.label}
            </Button>
            <Button href={secondaryCta.href} variant="ghost">
              {secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>

    </section>
  );
}
