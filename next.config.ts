import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exclude src directory from Next.js processing
  // The src folder contains the old CRA code that will be removed after migration
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

  // Image configuration for optimization
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
