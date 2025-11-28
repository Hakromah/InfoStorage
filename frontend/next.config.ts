import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "harmonious-fireworks-bde4521ff5.media.strapiapp.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
