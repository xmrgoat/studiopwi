import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Redesign palette: flat #efefef ground, #396c5e ink, #2cff05 accent — the same
// 60/30/10 system as the page itself. The previous version was a dark gradient
// card with an italic accent phrase, both conventions the redesign retired.
export const alt = `${site.name} — Studio web pour paysagistes suisses`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#efefef",
          color: "#396c5e",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              display: "block",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#2cff05",
            }}
          />
          Suisse — Studio web pour paysagistes
        </div>

        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
            maxWidth: 1000,
          }}
        >
          {site.hero.headline}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          <span>{site.name}</span>
          <span style={{ opacity: 0.7 }}>{site.domain}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
