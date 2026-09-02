export type HueId = "lemonade" | "raspberry" | "leaf" | "sky" | "coral";

export const HUES: Record<HueId, { bg: string; ink: string; name: string }> = {
  lemonade: { bg: "#F5C518", ink: "#1C1A19", name: "Lemonade" },
  raspberry: { bg: "#E85D75", ink: "#FFF6E8", name: "Raspberry" },
  leaf: { bg: "#3BAF6A", ink: "#FFF6E8", name: "Leaf" },
  sky: { bg: "#4EB3E8", ink: "#1C1A19", name: "Sky" },
  coral: { bg: "#FF7A59", ink: "#1C1A19", name: "Coral" },
};

export const KIT_HUE: Record<string, HueId> = {
  lemonade: "lemonade",
  bake: "raspberry",
  wash: "sky",
  fort: "leaf",
  birdhouse: "coral",
  garden: "leaf",
  paper: "sky",
  parade: "raspberry",
  map: "lemonade",
  garage: "coral",
  puppet: "raspberry",
  olympics: "lemonade",
};

export function hueOf(kitId: string) {
  return HUES[KIT_HUE[kitId] ?? "lemonade"];
}
