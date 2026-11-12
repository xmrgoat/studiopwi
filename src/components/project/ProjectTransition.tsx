"use client";

import { useState } from "react";
import { documentState } from "@/lib/navigation";
import styles from "./ProjectTransition.module.css";

// The panel that plays when a visitor clicks through to a project from
// elsewhere on the site. On a fresh load — a visitor landing from search, a
// shared link, a reload — the document hasn't hydrated yet when this renders,
// so nothing is drawn: the page (and its LCP) is never held behind a splash.
// The motion itself is pure CSS (ProjectTransition.module.css).
export default function ProjectTransition({ name }: { name: string }) {
  const [play] = useState(() => documentState.hydrated);
  if (!play) return null;
  return (
    <div className={styles.overlay} aria-hidden="true">
      <span className={styles.name}>{name}</span>
    </div>
  );
}
