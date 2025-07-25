import withBundleAnalyzer from '@next/bundle-analyzer';
import { NextConfig } from 'next';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
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
  experimental: {
    optimizePackageImports: ['iconoir-react'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default bundleAnalyzer(nextConfig);
