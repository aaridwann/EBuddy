import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //=== Todo should disable ===//
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
