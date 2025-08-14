import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
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
      {
        protocol: 'https',
        hostname: 'chocoprowrestling.com',
      },
      {
        protocol: 'https',
        hostname: 'oz-academy.com',
      },
                   {
               protocol: 'https',
               hostname: 'dsf-marigold.com',
             },
             {
               protocol: 'http',
               hostname: 'www.marvelcompany.co.jp',
             },
             {
               protocol: 'https',
               hostname: 'pure-j.jp',
             },
             {
               protocol: 'https',
               hostname: 'gokigenpro.com',
             },
             {
               protocol: 'https',
               hostname: 'prowrestlingjto.com',
             },
             {
               protocol: 'https',
               hostname: 'evolutionofficialfc.com',
             },
    ],
  },
  async rewrites() {
    const apiBaseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://func-jhoshi-news.azurewebsites.net'
      : 'http://localhost:7071';
      
    return [
      {
        source: '/api/:path*',
        destination: `${apiBaseUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
