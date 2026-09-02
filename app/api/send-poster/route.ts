import { NextResponse } from "next/server";
import { Resend } from "resend";

import { isEmail, printMailBody } from "@/lib/email";
import { isZip, shopsNearZip } from "@/lib/shops";
import { SHEETS, type SheetId } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    zip?: string;
    standName?: string;
    kidName?: string;
    filename?: string;
    image?: string;
    sheet?: SheetId;
  };

  const email = (body.email || "").trim();
  const zip = (body.zip || "").trim();
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Need a parent email." }, { status: 400 });
  }
  if (!isZip(zip)) {
    return NextResponse.json({ error: "Need a five-digit zip." }, { status: 400 });
  }

  let shops: { name: string; address: string }[] = [];
  let city = "";
  let state = "";
  try {
    const found = await shopsNearZip(zip);
    shops = found.shops;
    city = found.city;
    state = found.state;
  } catch {
    shops = [];
  }

  const standName = (body.standName || "Lemonade stand").trim();
  const sheet: SheetId = body.sheet && body.sheet in SHEETS ? body.sheet : "tabloid";
  const text = printMailBody({
    standName,
    kidName: (body.kidName || "").trim(),
    city,
    state,
    shops,
    sheet,
  });

  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!key || !from) {
    return NextResponse.json({
      sent: false,
      fallback: true,
      city,
      state,
      shops,
      subject: `${standName} poster for the printer`,
      text,
    });
  }

  if (!body.image) {
    return NextResponse.json({ error: "Missing the poster picture." }, { status: 400 });
  }

  const resend = new Resend(key);
  const { data, error } = await resend.emails.send(
    {
      from,
      to: [email],
      subject: `${standName} poster for the printer`,
      text,
      html: `<p>${text.replace(/\n/g, "<br/>")}</p>`,
      attachments: [
        {
          filename: body.filename || "stand-poster.png",
          content: body.image.replace(/^data:image\/png;base64,/, ""),
        },
      ],
    },
    { idempotencyKey: `poster-print/${email}/${Date.now()}`.slice(0, 256) },
  );

  if (error) {
    return NextResponse.json(
      { error: error.message, fallback: true, city, state, shops, subject: `${standName} poster for the printer`, text },
      { status: 502 },
    );
  }

  return NextResponse.json({ sent: true, id: data?.id, city, state, shops });
}
