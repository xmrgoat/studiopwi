import { NextResponse, type NextRequest } from "next/server";
import { contactSchema } from "@/lib/validation";
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

  // Honeypot: answer 200 so the bot believes it succeeded, but do nothing.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const emailResult = await sendLeadNotification({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    company: parsed.data.company,
    message: parsed.data.message,
    tier: parsed.data.tier,
    source: parsed.data.source,
  });

  // With no database, this email IS the lead — there is no second copy to
  // recover from. A failure here must reach the visitor so they can get in
  // touch another way, rather than being told it worked while the enquiry is
  // lost. (This route used to return 201 regardless, which was defensible only
  // while every lead was also persisted.)
  if (emailResult.error) {
    console.error("Resend error — LEAD NOT DELIVERED", emailResult.error, {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      message: parsed.data.message,
    });
    return NextResponse.json(
      {
        ok: false,
        error:
          "Votre message n'a pas pu être envoyé. Écrivez-nous directement à contact@studiopwi.com.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: emailResult.data?.id ?? null }, { status: 201 });
}
