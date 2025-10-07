import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['prepared-sparkle-329c72da86.media.strapiapp.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prepared-sparkle-329c72da86.media.strapiapp.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
