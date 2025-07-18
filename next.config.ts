import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_KAKAO_MAP_API_KEY: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dolpin.site',
        pathname: '/**',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dev.dolpin.site',
        pathname: '/**',
        port: '',
      },
    ],
  },
};

export default nextConfig;
