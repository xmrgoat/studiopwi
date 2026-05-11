import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ ok: false, error: "Missing token" }, { status: 400 });
  }

  const sub = await db.newsletterSubscriber.findUnique({
    where: { confirmToken: token },
  });

  if (!sub) {
    return NextResponse.json({ ok: false, error: "Invalid token" }, { status: 404 });
  }

  await db.newsletterSubscriber.update({
    where: { id: sub.id },
    data: { confirmed: true, confirmToken: null },
  });

  return NextResponse.redirect(new URL("/newsletter/confirmed", req.url));
}
