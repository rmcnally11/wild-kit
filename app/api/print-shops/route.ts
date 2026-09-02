import { NextResponse } from "next/server";

import { isZip, shopsNearZip } from "@/lib/shops";

export async function GET(request: Request) {
  const zip = new URL(request.url).searchParams.get("zip") || "";
  if (!isZip(zip)) {
    return NextResponse.json({ error: "Zip should be five digits." }, { status: 400 });
  }

  try {
    const result = await shopsNearZip(zip);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not find shops.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
