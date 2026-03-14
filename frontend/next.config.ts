import type { NextConfig } from "next";

// Server-side: Docker-internal URL for rewrites and image optimization
const internalBackendUrl =
  process.env.BACKEND_URL || "http://localhost:5000";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: "..",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "backend",
      },
    ],
  },
  rewrites: async () => [
    { source: "/api/:path*", destination: `${internalBackendUrl}/:path*` },
    {
      source: "/uploads/:path*",
      destination: `${internalBackendUrl}/uploads/:path*`,
    },
  ],
};

export default nextConfig;
