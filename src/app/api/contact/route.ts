import { NextResponse, type NextRequest } from "next/server";
import { contactSchema } from "@/lib/validation";
import { db } from "@/lib/db";
import { sendLeadNotification } from "@/lib/email";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers);
  const limit = rateLimit({
    key: `contact:${ip}`,
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

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const lead = await db.lead.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company ?? null,
      message: parsed.data.message,
      tier: parsed.data.tier ?? null,
      source: parsed.data.source,
      locale: parsed.data.locale,
      userAgent: req.headers.get("user-agent") ?? null,
      ip,
    },
  });

  const emailResult = await sendLeadNotification({
    name: parsed.data.name,
    email: parsed.data.email,
    company: parsed.data.company,
    message: parsed.data.message,
    tier: parsed.data.tier,
    source: parsed.data.source,
  });

  if (emailResult.error) {
    console.error("Resend error", emailResult.error);
  }

  return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
}
