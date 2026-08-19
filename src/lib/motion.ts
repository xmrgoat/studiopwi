"use client";

// Motion helpers. GSAP is no longer imported anywhere on the site — the
// redesign has no pinning, scrubbing or parallax, section reveals run off a
// shared IntersectionObserver (components/motion/Reveal), and Lenis is driven
// by a native rAF loop. What remains is the reduced-motion plumbing.
//
// The `gsap` package is still in package.json but is now unreferenced; it can
// be uninstalled once you are sure no future section needs it.

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
