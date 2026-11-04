export type SiteRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

/**
 * Old job paths. Fort, wash, and camp used to land on kit briefs.
 * Those briefs are not public, so they 404. These aliases go to the one
 * public brief instead of a missing page.
 */
export const SITE_REDIRECTS: SiteRedirect[] = [
  { source: "/stand", destination: "/kits/lemonade", permanent: false },
  { source: "/stand/:path*", destination: "/kits/lemonade", permanent: false },
  { source: "/bake", destination: "/kits/lemonade", permanent: false },
  { source: "/kits/bake", destination: "/kits/lemonade", permanent: false },
  { source: "/wash", destination: "/kits/lemonade", permanent: false },
  { source: "/fort", destination: "/kits/lemonade", permanent: false },
  { source: "/saturday", destination: "/kits/lemonade", permanent: false },
  { source: "/app", destination: "/apps", permanent: false },
  { source: "/setup", destination: "/parents", permanent: false },
  { source: "/menu", destination: "/kits/lemonade", permanent: false },
  { source: "/mix", destination: "/kits/lemonade", permanent: false },
  { source: "/look", destination: "/kits/lemonade", permanent: false },
  { source: "/tell", destination: "/kits/lemonade", permanent: false },
  { source: "/parent", destination: "/kits/lemonade", permanent: false },
  { source: "/poster", destination: "/kits/lemonade", permanent: false },
  { source: "/customer", destination: "/kits/lemonade", permanent: false },
  { source: "/camp", destination: "/kits/lemonade", permanent: false },
  { source: "/family", destination: "/kits/lemonade", permanent: false },
  { source: "/jobs", destination: "/kits/lemonade", permanent: false },
  { source: "/kits/stand", destination: "/kits/lemonade", permanent: false },
  { source: "/kits/camp", destination: "/kits/lemonade", permanent: false },
];
