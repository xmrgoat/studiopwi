"use client";

import { useId, type ElementType } from "react";
import type { JSX } from "react";
import styles from "./SplitWords.module.css";

type Props = {
  text: string;
  /** Class applied to each word wrapper (for GSAP targeting). */
  wordClassName?: string;
  /** Tag to render. Defaults to span. */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

/**
 * Free, license-clean alternative to GSAP SplitText for words.
 * Each word is wrapped in a span with `overflow: hidden` so a child
 * `transform: translateY(100%)` can be animated via gsap.from.
 *
 * Usage in animation:
 *   gsap.from(el.querySelectorAll('.word > span'), { yPercent: 100, stagger: 0.06 })
 */
export default function SplitWords({
  text,
  wordClassName = "word",
  as: Tag = "span",
  className,
}: Props) {
  const id = useId();
  const words = text.split(/(\s+)/);
  const Comp = Tag as ElementType;

  return (
    <Comp className={className} aria-label={text}>
      {words.map((token, i) => {
        if (/^\s+$/.test(token)) return <span key={`${id}-s-${i}`}>{token}</span>;
        return (
          <span
            key={`${id}-w-${i}`}
            className={`${wordClassName} ${styles.wordWrap}`}
            aria-hidden="true"
          >
            <span className={styles.wordInner}>
              {token}
            </span>
          </span>
        );
      })}
    </Comp>
  );
}
