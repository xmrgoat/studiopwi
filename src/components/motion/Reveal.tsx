"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import styles from "./Reveal.module.css";

// One IntersectionObserver for the whole page, created lazily and shared by
// every Reveal instance.
//
// This replaces the per-section GSAP ScrollTrigger setup the previous design
// used. The redesign has no script-driven pinning, scrubbing or parallax —
// every section just needs to enter once — and the earlier mobile-LCP work found
// the constraint to be main-thread saturation while many GSAP sections
// hydrated at once, not asset weight. A single observer and a CSS animation
// cost a few hundred bytes instead of the GSAP bundle.
//
// Entering the viewport sets a data-inview attribute rather than a module
// class, so each section's own stylesheet can choreograph its children (checks
// popping, lines drawing) off the same moment, keyed on [data-inview].
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-inview", "");
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
  );
  return observer;
}

type Props = {
  children: ReactNode;
  /** Stagger index — each step delays the entrance by one --stagger beat. */
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
    // no observer, no animation, no layout shift.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  // The order goes out as a custom property, not a computed delay: the
  // stylesheet turns it into --reveal-delay, which a section can re-time per
  // breakpoint (Notre démarche paces its steps slower on desktop) and which
  // children inherit to time their own entrances after the block's.
  return (
    <Tag
      ref={ref}
      className={className ? `${styles.reveal} ${className}` : styles.reveal}
      style={{ "--reveal-order": order } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
