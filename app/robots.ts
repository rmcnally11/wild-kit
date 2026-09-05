import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/pay", "/setup"],
    },
    sitemap: "https://www.getwildkit.com/sitemap.xml",
  };
}
