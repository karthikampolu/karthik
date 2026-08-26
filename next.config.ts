import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      { source: "/blog", destination: "/digest", permanent: true },
      { source: "/blog/:slug*", destination: "/digest/:slug*", permanent: true },
    ];
  },
};

export default nextConfig;