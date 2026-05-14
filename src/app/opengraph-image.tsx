import { ImageResponse } from "next/og";

export const alt = "Studio PWI — Studio web pour paysagistes suisses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #1d3a32 0%, #396c5e 60%, #5a8b78 100%)",
          color: "#efefef",
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
            fontSize: 28,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 10,
              height: 10,
              background: "#a8d5ba",
              borderRadius: "50%",
            }}
          />
          (CH) — Studio web pour paysagistes
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 1000,
              display: "flex",
              flexWrap: "wrap",
              gap: "0 24px",
            }}
          >
            <span>Sites web pour</span>
            <span
              style={{
                color: "#a8d5ba",
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              paysagistes suisses
            </span>
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              opacity: 0.9,
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Studio spécialisé. Conversion, devis qualifiés, garantie 90 jours.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 26,
            letterSpacing: "0.04em",
          }}
        >
          <span style={{ fontWeight: 600 }}>Studio PWI</span>
          <span style={{ opacity: 0.7 }}>studiopwi.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
