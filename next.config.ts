import type { NextConfig } from 'next';

const ENV = process.env.ENV_LABEL;
const cdnHost = ENV === 'prod' ? 'cdn.dolpin.site' : 'cdn.dev.dolpin.site';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_KAKAO_MAP_API_KEY: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY,
    NEXT_PUBLIC_CDN_HOST: cdnHost,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: cdnHost,
        pathname: '/**',
        port: '',
      },
    ],
  },
};

export default nextConfig;
