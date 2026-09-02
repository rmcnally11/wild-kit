import { getForecast } from "@/lib/forecast";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const forecast = await getForecast({
    stationId: url.searchParams.get("station") ?? undefined,
    speciesSlug: url.searchParams.get("species") ?? undefined,
    days: Number(url.searchParams.get("days") ?? 10),
  });
  return NextResponse.json(forecast);
}
