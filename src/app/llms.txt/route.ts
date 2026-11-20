import { llmsResponse } from "@/lib/ai/llms";

// /llms.txt — the French site's brief for AI answer engines (lib/ai/llms).
export const dynamic = "force-static";

export function GET() {
  return llmsResponse("fr");
}
