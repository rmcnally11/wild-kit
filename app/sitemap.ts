import type { MetadataRoute } from "next";

const SITE = "https://www.getwildkit.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/parents`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/saturday`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/kits/lemonade`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];
}
