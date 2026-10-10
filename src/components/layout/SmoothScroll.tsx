"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/motion";

// No header offset in here: html carries scroll-padding-top (base.css), which
// scrollIntoView and Lenis's element targets both honour. An offset applied in
// script as well would double it — and would still lose to the router, whose
// own hash scroll lands after this component's effects.

// getElementById rather than querySelector(hash): a fragment is not a valid
// CSS selector in general ("#1-intro" throws), and it comes from the URL.
function targetOf(hash: string): HTMLElement | null {
  if (hash.length < 2) return null;
  return document.getElementById(decodeURIComponent(hash.slice(1)));
}

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // A URL carrying a fragment — a shared /#contact link, a Google "jump to"
    // result, or the /#services links the legal pages' nav points at — must
    // land on its section. This reset used to run unconditionally, so it
    // threw every deep link back to the top of the page.
    const el = targetOf(window.location.hash);
    if (el) {
      // Native even when Lenis runs: after a client-side navigation Lenis
      // still holds the previous page's scroll position and resolves element
      // targets against it, landing short. It re-syncs from the native scroll
      // event this fires.
      el.scrollIntoView();
      return;
    }
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    // Smooth scroll is a desktop-pointer nicety. On touch / small screens the
    // Lenis virtual scroll + perpetual RAF loop is pure main-thread
    // tax (it dominates TBT on throttled mobile and delays first paint) while
    // native momentum scrolling is what users actually expect there. So Lenis
    // only runs for fine-pointer desktops; everyone else gets native scroll.
    const enableLenis =
      !prefersReducedMotion() &&
      window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;

    // Anchor smooth-scroll works with or without Lenis.
    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const el = targetOf(anchor.getAttribute("href") ?? "");
      if (!el) return;
      e.preventDefault();
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el);
      } else {
        el.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
      }
    };
    document.addEventListener("click", onAnchorClick);

    if (!enableLenis) {
      return () => document.removeEventListener("click", onAnchorClick);
    }

    let lenis: Lenis | null = null;
    let rafId = 0;

    // Defer Lenis startup until the browser is idle so it never competes with
    // hydration during the first-paint window.
    const start = () => {
      lenis = new Lenis({
        duration: 0.8,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      // Plain rAF loop. This used to run off gsap.ticker and push
      // ScrollTrigger.update on every Lenis scroll event, but the redesign
      // removed every ScrollTrigger on the site — so that was importing the
      // whole of GSAP to drive one requestAnimationFrame callback.
      const tick = (time: number) => {
        lenis?.raf(time);
        rafId = window.requestAnimationFrame(tick);
      };
      rafId = window.requestAnimationFrame(tick);
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
      if (rafId) window.cancelAnimationFrame(rafId);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null;
}
