"use client";

import { useEffect } from "react";

// Desktop hover, decided by the pointer actually in use rather than by media
// queries. Two jobs:
//
// 1. `data-mouse` on <html> while the last pointer event came from a mouse or
//    trackpad. Every desktop hover style (ui/Button, the header CTA, the price
//    cards) is scoped to `:root[data-mouse]`. The media queries can't be
//    trusted for this: Brave answers false to `any-hover` / `any-pointer` even
//    with a trackpad, and a touchscreen laptop can report its screen as the
//    primary pointer. `pointerType` is what the hardware really sent. A tap on
//    a phone reports "touch", so phones never get a hover state; a hybrid
//    laptop flips back to touch styles the moment a finger is used, so no
//    hover sticks after a tap.
//
// 2. The magnetic lean: an element with `data-magnetic` gets --magnet-x/y, up
//    to --motion-magnet each way, which its stylesheet turns into a composited
//    `translate`, separate from the hover lift on `transform`. Off under
//    prefers-reduced-motion. One write per frame.
//
// Delegated listeners, a string compare per event until a mouse appears.
function listen(): () => void {
  const root = document.documentElement;
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let mouse = false;

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

  // Follows the pointer in use: mouse on, touch or pen off.
  const track = (e: PointerEvent) => {
    const isMouse = e.pointerType === "mouse";
    if (isMouse === mouse) return;
    mouse = isMouse;
    root.toggleAttribute("data-mouse", mouse);
    if (!mouse) release();
  };

  const grab = (target: Element | null) => {
    const next = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
    if (next === el) return;
    release();
    if (!next) return;
    el = next;
    rect = next.getBoundingClientRect();
    max =
      parseFloat(getComputedStyle(next).getPropertyValue("--motion-magnet")) || 0;
  };

  const onOver = (e: PointerEvent) => {
    track(e);
    if (mouse && !motion.matches) grab(e.target as Element | null);
  };

  const onMove = (e: PointerEvent) => {
    track(e);
    if (!mouse || motion.matches) return;
    // The first mouse move can land on a button with no pointerover since.
    if (!el) grab(e.target as Element | null);
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
  document.addEventListener("pointerdown", track, opts);
  document.addEventListener("pointerout", onOut, opts);
  window.addEventListener("scroll", onScroll, opts);
  window.addEventListener("resize", onScroll, opts);

  return () => {
    document.removeEventListener("pointerover", onOver);
    document.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerdown", track);
    document.removeEventListener("pointerout", onOut);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    release();
    root.removeAttribute("data-mouse");
  };
}

export default function Magnetic() {
  useEffect(listen, []);
  return null;
}
