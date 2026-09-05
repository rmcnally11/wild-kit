import { NextResponse } from "next/server";
import { Resend } from "resend";

import { isEmail } from "@/lib/email";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string };
  const email = (body.email || "").trim().toLowerCase();

  if (!isEmail(email)) {
    return NextResponse.json({ error: "Need a grown-up email." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const studio = process.env.WAITLIST_TO || "parents@getwildkit.com";

  if (!key || !from) {
    return NextResponse.json({
      ok: false,
      fallback: true,
      error: "Inbox isn't wired yet.",
    });
  }

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from,
    to: [studio],
    replyTo: email,
    subject: "Store list: grown-up wants the listing",
    text: `${email} wants the listing when Lemonade Stand by Wild Kit is on the App Store.\nGrown-up email only. No kid inbox.`,
  });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 502 });
  }

  try {
    await resend.emails.send({
      from,
      to: [email],
      subject: "Wild Kit — we'll send the listing",
      text: "You're on the list. We'll send one email when Lemonade Stand by Wild Kit is on the App Store. That's it. Grown-up email only. No kid inbox.",
    });
  } catch {
    // Studio already has the address.
  }

  return NextResponse.json({ ok: true });
}
