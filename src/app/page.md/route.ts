import { pageMdResponse } from "@/lib/ai/pageMd";

// /page.md — Markdown mirror of the French homepage (lib/ai/pageMd), noindex.
export const dynamic = "force-static";

export function GET() {
  return pageMdResponse("fr");
}
