"use client";

import { useEffect } from "react";

// Desktop CTAs lean towards the cursor. Every element with `data-magnetic`
// (ui/Button and the header "Appel gratuit") gets --magnet-x / --magnet-y,
// up to --motion-magnet each way, and its stylesheet turns them into a
// `translate` — composited, and separate from the hover lift on `transform`.
//
// One set of delegated listeners for the whole page, attached only when there
// is a mouse or trackpad and motion is welcome: on phones and tablets nothing
// is listening at all. Pointer moves are batched to one write per frame.
//
// `any-` rather than the primary-pointer queries: a touchscreen laptop can
// report its screen as the primary pointer ("hover: none") while its trackpad
// is what moves the cursor. Phones have no fine pointer of any kind.
const QUERY =
  "(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)";

function listen(): () => void {
  let el: HTMLElement | null = null;
  // Measured on entry, before the lean or the lift has moved the button, and
  // again after a scroll; never per frame, so the lean can't chase itself.
  let rect: DOMRect | null = null;
  let max = 0;
  let x = 0;
  let y = 0;
  let frame = 0;

  const release = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    el?.style.removeProperty("--magnet-x");
    el?.style.removeProperty("--magnet-y");
    el = null;
    rect = null;
  };

  const apply = () => {
    frame = 0;
    if (!el) return;
    rect ??= el.getBoundingClientRect();
    // -1…1 from the centre to the edge, in each axis.
    const dx = (x - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (y - rect.top - rect.height / 2) / (rect.height / 2);
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    el.style.setProperty("--magnet-x", `${(clamp(dx) * max).toFixed(2)}px`);
    el.style.setProperty("--magnet-y", `${(clamp(dy) * max).toFixed(2)}px`);
  };

  const onOver = (e: PointerEvent) => {
    const target = (e.target as Element | null)?.closest<HTMLElement>(
      "[data-magnetic]",
    );
    if (target === el) return;
    release();
    if (!target) return;
    el = target;
    rect = target.getBoundingClientRect();
    max =
      parseFloat(getComputedStyle(target).getPropertyValue("--motion-magnet")) || 0;
  };

  const onMove = (e: PointerEvent) => {
    if (!el) return;
    x = e.clientX;
    y = e.clientY;
    if (!frame) frame = requestAnimationFrame(apply);
  };

  const onOut = (e: PointerEvent) => {
    if (el && !el.contains(e.relatedTarget as Node | null)) release();
  };

  // The button moved under the cursor: measure again on the next move.
  const onScroll = () => {
    rect = null;
  };

  const opts = { passive: true } as const;
  document.addEventListener("pointerover", onOver, opts);
  document.addEventListener("pointermove", onMove, opts);
  document.addEventListener("pointerout", onOut, opts);
  window.addEventListener("scroll", onScroll, opts);
  window.addEventListener("resize", onScroll, opts);

  return () => {
    document.removeEventListener("pointerover", onOver);
    document.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerout", onOut);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    release();
  };
}

export default function Magnetic() {
  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    let stop: (() => void) | null = null;
    // Follows the query live: a mouse plugged into a tablet, or reduced
    // motion switched on mid-visit.
    const sync = () => {
      stop?.();
      stop = mq.matches ? listen() : null;
    };
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      stop?.();
    };
  }, []);

  return null;
}
