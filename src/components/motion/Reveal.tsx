"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, registerGsapPlugins, prefersReducedMotion } from "@/lib/motion";

type Props = {
  children: ReactNode;
  /** Children selector to stagger. Defaults to direct children. */
  stagger?: number;
  delay?: number;
  y?: number;
  duration?: number;
  start?: string;
  className?: string;
};

/**
 * Generic scroll reveal — fades+lifts direct children once at start trigger.
 * Honors prefers-reduced-motion.
 */
export default function Reveal({
  children,
  stagger = 0.08,
  delay = 0,
  y = 40,
  duration = 0.9,
  start = "top 80%",
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    registerGsapPlugins();

    if (prefersReducedMotion()) return;

    const targets = el.children;
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y,
        opacity: 0,
        duration,
        delay,
        stagger,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [stagger, delay, y, duration, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
