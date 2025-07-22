import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dolpin.site';

  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      },
      {
        userAgent: '*',
        allow: [
          '/$',
          '/moments$',
          '/moments/',
          '/search',
          '/places/',
          '/onboarding$',
        ],
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
          '/mypage',
          '/auth/',
          '/oauth/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
