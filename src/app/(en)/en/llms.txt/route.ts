import { llmsResponse } from "@/lib/ai/llms";

// /en/llms.txt — the English site's brief for AI answer engines (lib/ai/llms).
export const dynamic = "force-static";

export function GET() {
  return llmsResponse("en");
}
