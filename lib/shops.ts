export type PrintShop = {
  name: string;
  address: string;
  maps: string;
};

export type ShopLookup = {
  city: string;
  state: string;
  shops: PrintShop[];
};

export function isZip(value: string) {
  return /^\d{5}$/.test(value.trim());
}

export async function shopsNearZip(zip: string): Promise<ShopLookup> {
  const clean = zip.trim();
  if (!isZip(clean)) {
    throw new Error("Zip should be five digits.");
  }

  const place = await lookupZip(clean);
  const shops = await findShops(place.lat, place.lon, place.city, place.state);
  return { city: place.city, state: place.state, shops };
}

async function lookupZip(zip: string) {
  const response = await fetch(`https://api.zippopotam.us/us/${zip}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 86400 },
  });
  if (!response.ok) throw new Error("Could not find that zip.");
  const data = (await response.json()) as {
    "place name"?: string;
    places?: Array<{
      "place name": string;
      "state abbreviation": string;
      latitude: string;
      longitude: string;
    }>;
  };
  const place = data.places?.[0];
  if (!place) throw new Error("Could not find that zip.");
  return {
    city: place["place name"],
    state: place["state abbreviation"],
    lat: Number(place.latitude),
    lon: Number(place.longitude),
  };
}

async function findShops(lat: number, lon: number, city: string, state: string) {
  try {
    const fromOsm = await searchNominatim(`${city} ${state} copy shop`);
    if (fromOsm.length) return fromOsm.slice(0, 4);
  } catch {
    // fall through to the generic list
  }

  const query = encodeURIComponent(`${city} ${state} print shop`);
  return [
    {
      name: "Staples or Office Depot",
      address: `${city}, ${state} — ask them to fill the sheet, no extra white border`,
      maps: `https://maps.google.com/?q=${query}+staples`,
    },
    {
      name: "The UPS Store",
      address: `${city}, ${state} — they print posters from a phone picture`,
      maps: `https://maps.google.com/?q=${query}+ups+store`,
    },
    {
      name: "Any copy shop or pharmacy",
      address: `Whoever does posters in ${city}`,
      maps: `https://maps.google.com/?q=${query}`,
    },
  ];
}

async function searchNominatim(query: string): Promise<PrintShop[]> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "5");
  url.searchParams.set("addressdetails", "1");

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "MyStand/0.1 (lemonade-stand-kit; print-shop-lookup)",
    },
    next: { revalidate: 3600 },
  });
  if (!response.ok) return [];

  const rows = (await response.json()) as Array<{
    display_name?: string;
    name?: string;
    lat?: string;
    lon?: string;
  }>;

  return rows
    .filter((row) => row.display_name)
    .map((row) => ({
      name: row.name || "Print shop",
      address: row.display_name || "",
      maps: `https://maps.google.com/?q=${encodeURIComponent(row.display_name || query)}`,
    }));
}
