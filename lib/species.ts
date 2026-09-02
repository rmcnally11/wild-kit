import type { Coast } from "@/lib/stations";
import type { TideStage } from "@/lib/types";

export type LightPeriod = "dawn" | "day" | "dusk" | "night";

export type Species = {
  slug: string;
  name: string;
  latin: string;
  alsoCalled: string;
  summary: string;
  coasts: Coast[];
  months: number[];
  stageWeight: Record<TideStage, number>;
  lightWeight: Record<LightPeriod, number>;
  likesCurrent: boolean;
  likesSpringTides: boolean;
  windToleranceMph: number;
  color: string;
  tactics: Record<TideStage, string>;
  rig: string;
  water: string;
  eat: string;
};

export const SPECIES: Species[] = [
  {
    slug: "redfish",
    name: "Redfish",
    latin: "Sciaenops ocellatus",
    alsoCalled: "Red drum, spot-tail",
    summary:
      "Tailing fish on the flood, ambush on the ebb. Reds use moving water to push bait onto flats and then pin it against shorelines on the fall.",
    coasts: ["florida-east", "florida-west", "gulf", "southeast", "mid-atlantic"],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    stageWeight: { flood: 1, "high-slack": 0.55, ebb: 0.92, "low-slack": 0.48 },
    lightWeight: { dawn: 1, dusk: 0.96, day: 0.62, night: 0.4 },
    likesCurrent: true,
    likesSpringTides: true,
    windToleranceMph: 18,
    color: "#c45c26",
    tactics: {
      flood: "Push onto grass and oyster with the rising water. Look for tails in 8–16 inches.",
      "high-slack": "Fish the last of the flood against mangrove points and dock shade. Slow down.",
      ebb: "Set up where bait drains off the flat — creek mouths, cuts, and bar edges.",
      "low-slack": "Work deeper holes and channel edges. Reds stack where the last water sits.",
    },
    rig: "1/8 oz jig + paddle, or gold spoon. 20 lb fluoro leader, 3/0 circle if bait.",
    water: "Flats, oyster, mangrove edges, docks",
    eat: "Shrimp, crab, mullet, pinfish",
  },
  {
    slug: "snook",
    name: "Snook",
    latin: "Centropomus undecimalis",
    alsoCalled: "Linesider",
    summary:
      "A current fish that hunts outgoing water at passes, docks, and mangrove drains. Low light is not a bonus — it is the whole game in clear water.",
    coasts: ["florida-east", "florida-west"],
    months: [3, 4, 5, 6, 7, 8, 9, 10, 11],
    stageWeight: { flood: 0.7, "high-slack": 0.45, ebb: 1, "low-slack": 0.58 },
    lightWeight: { dawn: 1, dusk: 1, day: 0.42, night: 0.88 },
    likesCurrent: true,
    likesSpringTides: true,
    windToleranceMph: 16,
    color: "#7cb342",
    tactics: {
      flood: "Incoming around inlets and up onto mangrove points. Walk-the-dog along the shade line.",
      "high-slack": "Skip plastics under docks. Snook hold tight when the push dies.",
      ebb: "The money tide. Stand at the drain and feed the outgoing seam with a jerkbait or live bait.",
      "low-slack": "Deep dock pilings and pass holes. Bigger fish often wait out the bottom of the tide.",
    },
    rig: "30 lb fluoro, 4–6 in jerkbait or live pilchard. Weedless hook around mangroves.",
    water: "Passes, docks, mangroves, spillways",
    eat: "Pilchards, mullet, shrimp, ladyfish",
  },
  {
    slug: "trout",
    name: "Speckled Trout",
    latin: "Cynoscion nebulosus",
    alsoCalled: "Spotted seatrout",
    summary:
      "Grass-flat hunters that turn on as the flood starts covering the blades. They want bait pushed to them, not a raging current.",
    coasts: ["florida-east", "florida-west", "gulf", "southeast", "mid-atlantic"],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    stageWeight: { flood: 1, "high-slack": 0.72, ebb: 0.64, "low-slack": 0.5 },
    lightWeight: { dawn: 1, dusk: 0.9, day: 0.58, night: 0.55 },
    likesCurrent: false,
    likesSpringTides: false,
    windToleranceMph: 15,
    color: "#c9b037",
    tactics: {
      flood: "Start on the outside grass edge and walk in with the water. Soft plastics over the blades.",
      "high-slack": "Potholes and sandy pockets. Topwater if the surface is quiet.",
      ebb: "Fall back to the first drop and the mouths of guts. Trout slide off with the water.",
      "low-slack": "Deep grass edges and channel ledges. Downsize and slow the retrieve.",
    },
    rig: "1/4 oz popping cork + shrimp, or 1/8 oz jig. 15 lb fluoro.",
    water: "Grass flats, potholes, guts",
    eat: "Shrimp, pinfish, croaker, mullet",
  },
  {
    slug: "tarpon",
    name: "Tarpon",
    latin: "Megalops atlanticus",
    alsoCalled: "Silver king",
    summary:
      "Pass and beach fish that time their moves to tide and moon. New and full moons at the passes in warm months are the classic window.",
    coasts: ["florida-east", "florida-west", "gulf", "southeast"],
    months: [4, 5, 6, 7, 8, 9],
    stageWeight: { flood: 0.78, "high-slack": 0.5, ebb: 1, "low-slack": 0.55 },
    lightWeight: { dawn: 1, dusk: 0.92, day: 0.6, night: 0.7 },
    likesCurrent: true,
    likesSpringTides: true,
    windToleranceMph: 20,
    color: "#b7c4ce",
    tactics: {
      flood: "Beaches and bay edges as bait pushes in. Watch for rolls on the incoming stain line.",
      "high-slack": "Bridge shadow lines and basin edges. Live bait on a circle hook, patience.",
      ebb: "Passes. The outgoing tide dumps bait and laid-up tarpon into a conveyor.",
      "low-slack": "Deep holes on the inside of the pass. Fish often stage here before the next push.",
    },
    rig: "40–60 lb fluoro, 6/0 circle, live crab or threadfin. 8 wt fly for laid-up fish.",
    water: "Passes, beaches, basins, bridges",
    eat: "Crab, mullet, threadfin, pinfish",
  },
  {
    slug: "flounder",
    name: "Flounder",
    latin: "Paralichthys lethostigma",
    alsoCalled: "Doormat, fluke (north)",
    summary:
      "Ambush fish that sit on the falling tide where bait is forced off a flat or down a channel edge. Soft current, hard structure.",
    coasts: [
      "florida-east",
      "florida-west",
      "gulf",
      "southeast",
      "mid-atlantic",
      "northeast",
    ],
    months: [3, 4, 5, 6, 7, 8, 9, 10, 11],
    stageWeight: { flood: 0.62, "high-slack": 0.48, ebb: 1, "low-slack": 0.7 },
    lightWeight: { dawn: 0.85, dusk: 0.9, day: 0.7, night: 0.78 },
    likesCurrent: true,
    likesSpringTides: false,
    windToleranceMph: 22,
    color: "#8d6e4c",
    tactics: {
      flood: "Work the up-current side of jetties and inlets as bait starts moving.",
      "high-slack": "Still water is slow. Bounce a bucktail through likely sand-to-mud transitions.",
      ebb: "The bite. Drag a Gulp or live mud minnow along the first drop off a draining flat.",
      "low-slack": "Keep fishing the hole. Flounder often stay put until the water starts back in.",
    },
    rig: "Carolina rig, 1/4–1/2 oz, Gulp shrimp or live finger mullet. 20 lb leader.",
    water: "Channel edges, inlets, dock washouts",
    eat: "Mud minnows, mullet, shrimp, killifish",
  },
  {
    slug: "striper",
    name: "Striped Bass",
    latin: "Morone saxatilis",
    alsoCalled: "Rockfish, linesider",
    summary:
      "Current specialists. Stripers feed in moving water around rips, bridges, and boulder fields, with a hard preference for low light and bigger tidal swings.",
    coasts: ["mid-atlantic", "northeast", "pacific"],
    months: [4, 5, 6, 7, 8, 9, 10, 11],
    stageWeight: { flood: 0.95, "high-slack": 0.4, ebb: 1, "low-slack": 0.38 },
    lightWeight: { dawn: 1, dusk: 1, day: 0.5, night: 0.92 },
    likesCurrent: true,
    likesSpringTides: true,
    windToleranceMph: 25,
    color: "#6b8f9e",
    tactics: {
      flood: "Fish the incoming rip at inlets and around structure that makes a seam.",
      "high-slack": "Dead water. Move, or slow a live bait in a known hole.",
      ebb: "Classic. Outgoing at the mouth, around rocks, and under lights after dark.",
      "low-slack": "Wait for the first of the flood unless you know a deep winter hole.",
    },
    rig: "3 oz bunker spoon, or live eel. 40 lb leader around rocks.",
    water: "Rips, bridges, boulder shorelines, ramps",
    eat: "Bunker, herring, eels, sand eels",
  },
  {
    slug: "sheepshead",
    name: "Sheepshead",
    latin: "Archosargus probatocephalus",
    alsoCalled: "Convict fish",
    summary:
      "Structure grazers. They want barnacle-covered pilings and a tide that is moving just enough to keep them feeding without blowing the bait off the piling.",
    coasts: ["florida-east", "florida-west", "gulf", "southeast", "mid-atlantic"],
    months: [1, 2, 3, 4, 11, 12],
    stageWeight: { flood: 0.88, "high-slack": 0.7, ebb: 0.9, "low-slack": 0.55 },
    lightWeight: { dawn: 0.75, dusk: 0.7, day: 0.95, night: 0.3 },
    likesCurrent: false,
    likesSpringTides: false,
    windToleranceMph: 20,
    color: "#d9d2c5",
    tactics: {
      flood: "Start fishing mid-piling and follow them up as water covers more structure.",
      "high-slack": "Still fishable. Downsize the weight and keep the fiddler on the wood.",
      ebb: "They drop with the water. Stay tight to the piling; bites get lighter.",
      "low-slack": "Deep bridge fenders and rock piles that still hold water.",
    },
    rig: "Jighead or knocker, #1 hook, fiddler crab. 20 lb fluoro, light drag.",
    water: "Bridges, docks, jetties, rocks",
    eat: "Fiddler crabs, oysters, barnacles, shrimp",
  },
  {
    slug: "mangrove",
    name: "Mangrove Snapper",
    latin: "Lutjanus griseus",
    alsoCalled: "Mango, gray snapper",
    summary:
      "Dock and reef snipers. Moving water turns them on; they get lockjaw in dead slack and in water that is too dirty from a hard onshore blow.",
    coasts: ["florida-east", "florida-west", "gulf"],
    months: [4, 5, 6, 7, 8, 9, 10],
    stageWeight: { flood: 0.92, "high-slack": 0.5, ebb: 0.95, "low-slack": 0.45 },
    lightWeight: { dawn: 0.88, dusk: 0.95, day: 0.7, night: 0.8 },
    likesCurrent: true,
    likesSpringTides: true,
    windToleranceMph: 16,
    color: "#5c6b4a",
    tactics: {
      flood: "Live shrimp or cut sardine on the up-current side of the dock.",
      "high-slack": "Tough. Downsize leader and wait, or move to a tighter spot.",
      ebb: "Best dock bite for many nights. Free-line into the shadow.",
      "low-slack": "Deep channel docks and rock piles.",
    },
    rig: "1/0 circle, 20–30 lb fluoro, live shrimp. No hardware they can see.",
    water: "Docks, mangroves, nearshore wrecks",
    eat: "Shrimp, sardines, pinfish, crabs",
  },
];

export const DEFAULT_SPECIES_SLUG = "redfish";

export function getSpecies(slug: string): Species | undefined {
  return SPECIES.find((species) => species.slug === slug);
}

export function speciesForCoast(coast: Coast): Species[] {
  return SPECIES.filter((species) => species.coasts.includes(coast));
}
