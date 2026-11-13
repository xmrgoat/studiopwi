import { NextResponse, type NextRequest } from "next/server";
import { auditSchema } from "@/lib/validation";
import { sendAuditRequest } from "@/lib/email";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

// The free audit request. Same shape as /api/contact: rate limit → validate →
// honeypot → one email, which is the only copy of the request (no database).
export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers);
  const limit = rateLimit({
    key: `audit:${ip}`,
    limit: 5,
    windowMs: 60 * 60 * 1000,
  });

  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = auditSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  // Honeypot: answer 200 so the bot believes it succeeded, but do nothing.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const { name, email, site } = parsed.data;
  const emailResult = await sendAuditRequest({ name, email, site });

  // The email is the request. If it fails, the visitor must hear about it
  // and be offered the address, not be told it worked (see /api/contact).
  if (emailResult.error) {
    console.error("Resend error — AUDIT REQUEST NOT DELIVERED", emailResult.error, { name, email, site });
    return NextResponse.json(
      {
        ok: false,
        error:
          "Votre demande n'a pas pu être envoyée. Écrivez-nous directement à contact@studiopwi.com.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: emailResult.data?.id ?? null }, { status: 201 });
}
