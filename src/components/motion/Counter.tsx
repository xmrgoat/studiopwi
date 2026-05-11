"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsapPlugins, prefersReducedMotion } from "@/lib/motion";

type Props = {
  value: number;
  duration?: number;
  delay?: number;
  /** If true, animates on scroll. If false, animates on mount. */
  onScroll?: boolean;
  className?: string;
  suffix?: string;
};

/**
 * Correct counter (fixes the §5.1 / §5.5 bug where
 * `gsap.from({ textContent: 0 })` on `<strong>0</strong>` animates 0→0).
 * Renders the target value, then animates from 0→target via fromTo.
 */
export default function Counter({
  value,
  duration = 1.4,
  delay = 0,
  onScroll = false,
  className,
  suffix,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    registerGsapPlugins();

    if (prefersReducedMotion()) {
      el.textContent = String(value);
      return;
    }

    const proxy = { n: 0 };
    el.textContent = "0";

    const tween = gsap.to(proxy, {
      n: value,
      duration,
      delay,
      ease: "power2.out",
      snap: { n: 1 },
      onUpdate: () => {
        el.textContent = String(Math.round(proxy.n));
      },
      ...(onScroll && {
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      }),
    });

    return () => {
      tween.kill();
    };
  }, [value, duration, delay, onScroll]);

  return (
    <span className={className}>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}
