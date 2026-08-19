"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import styles from "./Reveal.module.css";

// One IntersectionObserver for the whole page, created lazily and shared by
// every Reveal instance.
//
// This replaces the per-section GSAP ScrollTrigger setup the previous design
// used. The redesign has no pinning, scrubbing or parallax left — every
// section just needs to fade up once — and the earlier mobile-LCP work found
// the constraint to be main-thread saturation while many GSAP sections
// hydrated at once, not asset weight. A single observer and a CSS transition
// cost a few hundred bytes instead of the GSAP bundle.
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add(styles.visible ?? "is-visible");
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
  );
  return observer;
}

type Props = {
  children: ReactNode;
  /** Stagger index — each step delays the transition by 80ms. */
  order?: number;
  as?: ElementType;
  className?: string;
};

export default function Reveal({
  children,
  order = 0,
  as: Tag = "div",
  className,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Under reduced motion the element is already at its final state in CSS —
    // no observer, no transition, no layout shift.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <Tag
      ref={ref}
      className={className ? `${styles.reveal} ${className}` : styles.reveal}
      style={order ? { transitionDelay: `${order * 80}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
