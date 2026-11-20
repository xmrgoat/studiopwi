import { renderOgImage } from "@/lib/og";

// /twitter-image — kept alive for cards cached before. Not a twitter-image.tsx file
// in a route group, which Next serves under a hashed name; a plain route
// handler keeps the URL fixed for the metadata, the JSON-LD and the cards
// social sites have already cached.
export const dynamic = "force-static";

export function GET() {
  return renderOgImage("fr");
}
