import { NextResponse, type NextRequest } from "next/server";
import { randomBytes } from "node:crypto";
import { newsletterSchema } from "@/lib/validation";
import { db } from "@/lib/db";
import { sendNewsletterConfirmation } from "@/lib/email";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { env } from "@/lib/env";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers);
  const limit = rateLimit({
    key: `newsletter:${ip}`,
    limit: 10,
    windowMs: 60 * 60 * 1000,
  });

  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const email = parsed.data.email.toLowerCase();
  const confirmToken = randomBytes(24).toString("hex");

  await db.newsletterSubscriber.upsert({
    where: { email },
    create: {
      email,
      confirmToken,
      locale: parsed.data.locale,
      source: parsed.data.source ?? null,
    },
    update: {
      confirmToken,
      locale: parsed.data.locale,
    },
  });

  const confirmUrl = `${env.NEXT_PUBLIC_SITE_URL}/api/newsletter/confirm?token=${confirmToken}`;
  const emailResult = await sendNewsletterConfirmation({ to: email, confirmUrl });

  if (emailResult.error) {
    console.error("Resend error", emailResult.error);
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
