import { getDictionary } from "@/content";
import { ogSize, renderOgImage } from "@/lib/og";

// /en/opengraph-image — the English card (lib/og draws both languages).
export const alt = getDictionary("en").site.seo.ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage("en");
}
