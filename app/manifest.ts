import type { MetadataRoute } from "next";

import { DEVELOPER, MASTER } from "@/lib/brand";
import { HUES } from "@/lib/hues";

/** Splash paper. Same hex as --cream and --background in app/globals.css. */
const PAPER = "#FFF6E8";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: DEVELOPER,
    short_name: DEVELOPER,
    description: MASTER,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: PAPER,
    theme_color: HUES.lemonade.bg,
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
