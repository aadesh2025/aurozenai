import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      { source: "/legal/terms", destination: "/legal/terms-of-use", permanent: true },
      { source: "/accessibility", destination: "/legal/accessibility", permanent: true },
      { source: "/products/botforge", destination: "/products/vicero", permanent: true },
    ];
  },
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
