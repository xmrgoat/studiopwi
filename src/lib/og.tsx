import { ImageResponse } from "next/og";
import { getDictionary } from "@/content";
import type { Locale } from "@/i18n/locales";

// The generated Open Graph card, in either language: app/(fr)/opengraph-image
// serves /opengraph-image, app/(en)/en/opengraph-image serves
// /en/opengraph-image. Redesign palette: flat #efefef ground, #396c5e ink,
// #2cff05 accent — the same 60/30/10 system as the page itself.
export const ogSize = { width: 1200, height: 630 };

export function renderOgImage(locale: Locale) {
  const { site } = getDictionary(locale);
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
          padding: "72px 96px",
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
          {site.seo.ogKicker}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              maxWidth: 980,
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 400,
              maxWidth: 880,
              lineHeight: 1.4,
              opacity: 0.85,
            }}
          >
            {site.seo.ogLine}
          </div>
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
    { ...ogSize },
  );
}
