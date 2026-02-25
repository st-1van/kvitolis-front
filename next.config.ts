import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Для Strapi Cloud
      {
        protocol: 'https',
        hostname: 'admin.kvitolis.com.ua',
        port: '',
        pathname: '/**',
      },
      // Для локального Strapi
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
    // domains: ['prepared-sparkle-329c72da86.media.strapiapp.com', 'localhost'],
  },
};

export default nextConfig;
