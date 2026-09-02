import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async redirects() {
    return [
      { source: "/stand", destination: "/kits/lemonade", permanent: false },
      { source: "/stand/:path*", destination: "/kits/lemonade", permanent: false },
      { source: "/bake", destination: "/kits/bake", permanent: false },
      { source: "/wash", destination: "/kits/wash", permanent: false },
      { source: "/fort", destination: "/kits/fort", permanent: false },
      { source: "/app", destination: "/apps", permanent: false },
      { source: "/setup", destination: "/parents", permanent: false },
      { source: "/menu", destination: "/kits/lemonade", permanent: false },
      { source: "/mix", destination: "/kits/lemonade", permanent: false },
      { source: "/look", destination: "/kits/lemonade", permanent: false },
      { source: "/tell", destination: "/kits/lemonade", permanent: false },
      { source: "/parent", destination: "/kits/lemonade", permanent: false },
      { source: "/poster", destination: "/kits/lemonade", permanent: false },
      { source: "/customer", destination: "/kits/lemonade", permanent: false },
      { source: "/camp", destination: "/kits/fort", permanent: false },
      { source: "/family", destination: "/apps", permanent: false },
      { source: "/jobs", destination: "/apps", permanent: false },
      { source: "/kits/stand", destination: "/kits/lemonade", permanent: false },
      { source: "/kits/camp", destination: "/kits/fort", permanent: false },
    ];
  },
};

export default nextConfig;
