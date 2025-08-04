import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wwr-stardom.com',
      },
      {
        protocol: 'https',
        hostname: 'www.tjpw.jp',
      },
      {
        protocol: 'https',
        hostname: 'api.tjpw.jp',
      },
      {
        protocol: 'https',
        hostname: 'iceribbon.com',
      },
      {
        protocol: 'https',
        hostname: 'pro-w-wave.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:7071/api/:path*', // Azure Functions ローカル開発時
      },
    ];
  },
};

export default nextConfig;
