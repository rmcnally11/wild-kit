import type { NextConfig } from "next";

import { SITE_REDIRECTS } from "./lib/redirects";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async redirects() {
    return SITE_REDIRECTS;
  },
};

export default nextConfig;
