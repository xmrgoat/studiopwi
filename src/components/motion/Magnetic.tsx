"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

type Props = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

/**
 * Magnetic hover. Uses gsap.quickTo for cheap per-frame updates.
 * Disabled on touch devices and under prefers-reduced-motion.
 */
export default function Magnetic({ children, strength = 0.15, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      xTo(x * strength);
      yTo(y * strength);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "inline-block", willChange: "transform" }}
    >
      {children}
    </span>
  );
}
