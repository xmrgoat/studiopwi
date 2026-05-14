"use client";

import { useEffect, useRef } from "react";
import styles from "./SectionMarker.module.css";

type Props = {
  number?: string;
  label: string;
};

export default function SectionMarker({ label }: Props) {
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && styles.dotVisible) {
          dot.classList.add(styles.dotVisible);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(dot);
    return () => observer.disconnect();
  }, []);

  return (
    <p className={styles.marker} aria-hidden="true">
      <span ref={dotRef} className={styles.dot} />
      <span className={styles.label}>{label}</span>
    </p>
  );
}
