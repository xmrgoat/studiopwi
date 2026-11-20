"use client";

// Motion helpers. The site has no animation library (GSAP was uninstalled in
// November 2026): no pinning, scrubbing or parallax, section reveals run off a
// shared IntersectionObserver (components/motion/Reveal), and Lenis is driven
// by a native rAF loop. What remains is the reduced-motion plumbing.

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
