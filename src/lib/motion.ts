"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsapPlugins() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function watchReducedMotion(cb: (reduce: boolean) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handler = (e: MediaQueryListEvent) => cb(e.matches);
  cb(mq.matches);
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}

export const eases = {
  expoOut: "expo.out",
  power3Out: "power3.out",
  smooth: "cubic-bezier(0.65, 0, 0.35, 1)",
} as const;

export const durations = {
  ui: 0.6,
  reveal: 0.9,
  hero: 1.4,
} as const;

export { gsap, ScrollTrigger };
