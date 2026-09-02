export type Coast =
  | "florida-east"
  | "florida-west"
  | "gulf"
  | "southeast"
  | "mid-atlantic"
  | "northeast"
  | "pacific"
  | "hawaii";

export type Station = {
  id: string;
  name: string;
  shortName: string;
  state: string;
  coast: Coast;
  lat: number;
  lon: number;
  timezone: string;
  water: string;
};

export const STATIONS: Station[] = [
  {
    id: "8720218",
    name: "Mayport (Bar Pilots Dock)",
    shortName: "Mayport",
    state: "FL",
    coast: "florida-east",
    lat: 30.3983,
    lon: -81.4278,
    timezone: "America/New_York",
    water: "St. Johns River mouth",
  },
  {
    id: "8721604",
    name: "Ponce de Leon Inlet",
    shortName: "Ponce Inlet",
    state: "FL",
    coast: "florida-east",
    lat: 29.0633,
    lon: -80.9167,
    timezone: "America/New_York",
    water: "Inlet / Mosquito Lagoon",
  },
  {
    id: "8722670",
    name: "Lake Worth Pier",
    shortName: "Lake Worth",
    state: "FL",
    coast: "florida-east",
    lat: 26.6128,
    lon: -80.0342,
    timezone: "America/New_York",
    water: "Open Atlantic / inlet nearby",
  },
  {
    id: "8723214",
    name: "Virginia Key, Biscayne Bay",
    shortName: "Virginia Key",
    state: "FL",
    coast: "florida-east",
    lat: 25.7314,
    lon: -80.1618,
    timezone: "America/New_York",
    water: "Biscayne Bay",
  },
  {
    id: "8723970",
    name: "Vaca Key, Florida Bay",
    shortName: "Marathon",
    state: "FL",
    coast: "florida-east",
    lat: 24.7114,
    lon: -81.105,
    timezone: "America/New_York",
    water: "Florida Bay / bridges",
  },
  {
    id: "8724580",
    name: "Key West",
    shortName: "Key West",
    state: "FL",
    coast: "florida-east",
    lat: 24.5557,
    lon: -81.8079,
    timezone: "America/New_York",
    water: "Harbor / reef edge",
  },
  {
    id: "8725110",
    name: "Naples, Gulf of Mexico",
    shortName: "Naples",
    state: "FL",
    coast: "florida-west",
    lat: 26.1317,
    lon: -81.8075,
    timezone: "America/New_York",
    water: "Gulf beaches / passes",
  },
  {
    id: "8725520",
    name: "Fort Myers, Caloosahatchee",
    shortName: "Fort Myers",
    state: "FL",
    coast: "florida-west",
    lat: 26.6477,
    lon: -81.8712,
    timezone: "America/New_York",
    water: "River / estuary",
  },
  {
    id: "8726520",
    name: "St. Petersburg",
    shortName: "St. Petersburg",
    state: "FL",
    coast: "florida-west",
    lat: 27.7606,
    lon: -82.6269,
    timezone: "America/New_York",
    water: "Tampa Bay",
  },
  {
    id: "8727520",
    name: "Cedar Key",
    shortName: "Cedar Key",
    state: "FL",
    coast: "florida-west",
    lat: 29.1356,
    lon: -83.0317,
    timezone: "America/New_York",
    water: "Big Bend marsh",
  },
  {
    id: "8728690",
    name: "Apalachicola",
    shortName: "Apalachicola",
    state: "FL",
    coast: "florida-west",
    lat: 29.7267,
    lon: -84.9817,
    timezone: "America/New_York",
    water: "Bay / oyster bars",
  },
  {
    id: "8729108",
    name: "Panama City",
    shortName: "Panama City",
    state: "FL",
    coast: "florida-west",
    lat: 30.1522,
    lon: -85.6669,
    timezone: "America/Chicago",
    water: "St. Andrew Bay",
  },
  {
    id: "8729840",
    name: "Pensacola",
    shortName: "Pensacola",
    state: "FL",
    coast: "florida-west",
    lat: 30.4044,
    lon: -87.2117,
    timezone: "America/Chicago",
    water: "Pensacola Bay",
  },
  {
    id: "8735180",
    name: "Dauphin Island",
    shortName: "Dauphin Island",
    state: "AL",
    coast: "gulf",
    lat: 30.2503,
    lon: -88.075,
    timezone: "America/Chicago",
    water: "Mobile Bay mouth",
  },
  {
    id: "8747437",
    name: "Pascagoula NOAA Lab",
    shortName: "Pascagoula",
    state: "MS",
    coast: "gulf",
    lat: 30.3677,
    lon: -88.563,
    timezone: "America/Chicago",
    water: "Mississippi Sound",
  },
  {
    id: "8761724",
    name: "Grand Isle",
    shortName: "Grand Isle",
    state: "LA",
    coast: "gulf",
    lat: 29.2633,
    lon: -89.9567,
    timezone: "America/Chicago",
    water: "Caminada Pass",
  },
  {
    id: "8771450",
    name: "Galveston Pier 21",
    shortName: "Galveston",
    state: "TX",
    coast: "gulf",
    lat: 29.31,
    lon: -94.7933,
    timezone: "America/Chicago",
    water: "Galveston Bay / jetties",
  },
  {
    id: "8775870",
    name: "Corpus Christi",
    shortName: "Corpus Christi",
    state: "TX",
    coast: "gulf",
    lat: 27.5805,
    lon: -97.2166,
    timezone: "America/Chicago",
    water: "Corpus Christi Bay",
  },
  {
    id: "8779770",
    name: "Port Isabel",
    shortName: "Port Isabel",
    state: "TX",
    coast: "gulf",
    lat: 26.0612,
    lon: -97.2155,
    timezone: "America/Chicago",
    water: "Lower Laguna Madre",
  },
  {
    id: "8670870",
    name: "Fort Pulaski",
    shortName: "Savannah",
    state: "GA",
    coast: "southeast",
    lat: 32.0347,
    lon: -80.9017,
    timezone: "America/New_York",
    water: "Savannah River / marshes",
  },
  {
    id: "8665530",
    name: "Charleston",
    shortName: "Charleston",
    state: "SC",
    coast: "southeast",
    lat: 32.7817,
    lon: -79.925,
    timezone: "America/New_York",
    water: "Harbor / creeks",
  },
  {
    id: "8658163",
    name: "Wrightsville Beach",
    shortName: "Wrightsville",
    state: "NC",
    coast: "southeast",
    lat: 34.2133,
    lon: -77.7867,
    timezone: "America/New_York",
    water: "Masonboro Inlet",
  },
  {
    id: "8651370",
    name: "Duck",
    shortName: "Outer Banks",
    state: "NC",
    coast: "southeast",
    lat: 36.1833,
    lon: -75.7467,
    timezone: "America/New_York",
    water: "Open Atlantic / sound nearby",
  },
  {
    id: "8638610",
    name: "Sewells Point",
    shortName: "Norfolk",
    state: "VA",
    coast: "mid-atlantic",
    lat: 36.9467,
    lon: -76.33,
    timezone: "America/New_York",
    water: "Hampton Roads",
  },
  {
    id: "8574680",
    name: "Baltimore",
    shortName: "Baltimore",
    state: "MD",
    coast: "mid-atlantic",
    lat: 39.2667,
    lon: -76.5783,
    timezone: "America/New_York",
    water: "Upper Chesapeake",
  },
  {
    id: "8534720",
    name: "Atlantic City",
    shortName: "Atlantic City",
    state: "NJ",
    coast: "mid-atlantic",
    lat: 39.355,
    lon: -74.4183,
    timezone: "America/New_York",
    water: "Absecon Inlet",
  },
  {
    id: "8518750",
    name: "The Battery",
    shortName: "New York Harbor",
    state: "NY",
    coast: "northeast",
    lat: 40.7006,
    lon: -74.0142,
    timezone: "America/New_York",
    water: "Harbor / Hudson",
  },
  {
    id: "8443970",
    name: "Boston",
    shortName: "Boston",
    state: "MA",
    coast: "northeast",
    lat: 42.3539,
    lon: -71.0503,
    timezone: "America/New_York",
    water: "Boston Harbor",
  },
  {
    id: "8418150",
    name: "Portland",
    shortName: "Portland",
    state: "ME",
    coast: "northeast",
    lat: 43.6567,
    lon: -70.2467,
    timezone: "America/New_York",
    water: "Casco Bay",
  },
  {
    id: "9410230",
    name: "La Jolla",
    shortName: "La Jolla",
    state: "CA",
    coast: "pacific",
    lat: 32.8669,
    lon: -117.2571,
    timezone: "America/Los_Angeles",
    water: "Open Pacific",
  },
  {
    id: "9410660",
    name: "Los Angeles",
    shortName: "Los Angeles",
    state: "CA",
    coast: "pacific",
    lat: 33.7197,
    lon: -118.2728,
    timezone: "America/Los_Angeles",
    water: "San Pedro Bay",
  },
  {
    id: "9414290",
    name: "San Francisco",
    shortName: "San Francisco",
    state: "CA",
    coast: "pacific",
    lat: 37.8063,
    lon: -122.4659,
    timezone: "America/Los_Angeles",
    water: "Golden Gate / bay",
  },
  {
    id: "9447130",
    name: "Seattle",
    shortName: "Seattle",
    state: "WA",
    coast: "pacific",
    lat: 47.6026,
    lon: -122.3393,
    timezone: "America/Los_Angeles",
    water: "Elliott Bay / Puget Sound",
  },
  {
    id: "1612340",
    name: "Honolulu",
    shortName: "Honolulu",
    state: "HI",
    coast: "hawaii",
    lat: 21.3067,
    lon: -157.867,
    timezone: "Pacific/Honolulu",
    water: "South shore harbors",
  },
];

export const DEFAULT_STATION_ID = "8726520";

export const COAST_LABELS: Record<Coast, string> = {
  "florida-east": "Florida East",
  "florida-west": "Florida Gulf",
  gulf: "Central & Western Gulf",
  southeast: "Carolinas & Georgia",
  "mid-atlantic": "Mid-Atlantic",
  northeast: "Northeast",
  pacific: "Pacific",
  hawaii: "Hawaii",
};

export function getStation(id: string): Station | undefined {
  return STATIONS.find((station) => station.id === id);
}

export function stationsByCoast(): { coast: Coast; label: string; stations: Station[] }[] {
  const order: Coast[] = [
    "florida-east",
    "florida-west",
    "gulf",
    "southeast",
    "mid-atlantic",
    "northeast",
    "pacific",
    "hawaii",
  ];
  return order.map((coast) => ({
    coast,
    label: COAST_LABELS[coast],
    stations: STATIONS.filter((station) => station.coast === coast),
  }));
}

export function nearestStation(lat: number, lon: number): Station {
  let best = STATIONS[0];
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const station of STATIONS) {
    const distance = haversineMiles(lat, lon, station.lat, station.lon);
    if (distance < bestDistance) {
      best = station;
      bestDistance = distance;
    }
  }
  return best;
}

function haversineMiles(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 3958.8 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
