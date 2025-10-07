import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // images: {
  //     domains: ['127.0.0.1'],
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_STRAPI_API_URL || 'localhost',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
