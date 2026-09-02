import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async redirects() {
    return [
      { source: "/menu", destination: "/stand/menu", permanent: false },
      { source: "/mix", destination: "/stand/mix", permanent: false },
      { source: "/look", destination: "/stand/look", permanent: false },
      { source: "/tell", destination: "/stand/tell", permanent: false },
      { source: "/parent", destination: "/stand/parent", permanent: false },
      { source: "/poster", destination: "/stand/poster", permanent: false },
      { source: "/customer", destination: "/stand/customer", permanent: false },
    ];
  },
};

export default nextConfig;
