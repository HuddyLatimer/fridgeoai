import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Allow production builds to complete even with ESLint warnings/errors
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Allow production builds to complete even with TypeScript errors
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [],
    // Disable image optimization for Netlify compatibility
    unoptimized: true,
  },
};

export default nextConfig;
