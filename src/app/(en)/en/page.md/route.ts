import { pageMdResponse } from "@/lib/ai/pageMd";

// /en/page.md — Markdown mirror of the English homepage (lib/ai/pageMd), noindex.
export const dynamic = "force-static";

export function GET() {
  return pageMdResponse("en");
}
