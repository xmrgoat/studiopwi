import styles from "./GrainOverlay.module.css";

/**
 * Fixed SVG noise overlay. Adds film-like texture, prevents the bg
 * from feeling sterile. Pointer-events: none so it never blocks UX.
 */
export default function GrainOverlay() {
  return (
    <div className={styles.grain} aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
      >
        <filter id="studio-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.35 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#studio-noise)" />
      </svg>
    </div>
  );
}
