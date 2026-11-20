import { getDictionary } from "@/content";
import { ogSize, renderOgImage } from "@/lib/og";

// /opengraph-image — the French card (lib/og draws both languages).
export const alt = getDictionary("fr").site.seo.ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage("fr");
}
