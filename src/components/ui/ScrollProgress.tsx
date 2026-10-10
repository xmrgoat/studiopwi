"use client";

import { useEffect, useRef } from "react";
import styles from "./ScrollProgress.module.css";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    // Where CSS can tie an animation to the scroll position, the stylesheet
    // drives the bar on the compositor and this listener never attaches.
    if (CSS.supports("animation-timeline: scroll()")) return;

    // scrollHeight is a layout-flushing read — keep it out of the scroll
    // handler. Cache the scrollable total and only recompute on resize.
    let total = 0;
    const recalc = () => {
      total = document.documentElement.scrollHeight - window.innerHeight;
    };
    const update = () => {
      bar.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`;
    };

    recalc();
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", recalc, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", recalc);
    };
  }, []);

  return <div ref={barRef} className={styles.bar} aria-hidden="true" />;
}
