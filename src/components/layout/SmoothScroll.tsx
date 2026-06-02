"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { registerGsapPlugins, gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    registerGsapPlugins();

    // Smooth scroll is a desktop-pointer nicety. On touch / small screens the
    // Lenis virtual scroll + perpetual gsap.ticker RAF loop is pure main-thread
    // tax (it dominates TBT on throttled mobile and delays first paint) while
    // native momentum scrolling is what users actually expect there. So Lenis
    // only runs for fine-pointer desktops; everyone else gets native scroll.
    const enableLenis =
      !prefersReducedMotion() &&
      window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;

    // Anchor smooth-scroll works with or without Lenis. The header is sticky
    // (~72px), so offset the target either way.
    const HEADER_OFFSET = 72;
    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el as HTMLElement, { offset: -HEADER_OFFSET });
      } else {
        const top =
          (el as HTMLElement).getBoundingClientRect().top +
          window.scrollY -
          HEADER_OFFSET;
        window.scrollTo({
          top,
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
      }
    };
    document.addEventListener("click", onAnchorClick);

    if (!enableLenis) {
      return () => document.removeEventListener("click", onAnchorClick);
    }

    let lenis: Lenis | null = null;
    let raf: ((time: number) => void) | null = null;

    // Defer Lenis startup until the browser is idle so it never competes with
    // hydration during the first-paint window.
    const start = () => {
      lenis = new Lenis({
        duration: 0.8,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
      });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      raf = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(500, 33);
    };

    const ric =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(start, { timeout: 2000 })
        : window.setTimeout(start, 1);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(ric as number);
      } else {
        clearTimeout(ric as number);
      }
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null;
}
