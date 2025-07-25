import { MetadataRoute } from 'next';

import { getMoments } from '@/features/community';
import { getPlaceIdList } from '@/features/place/api';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dolpin.site';

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/moments`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/onboarding`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  try {
    const momentsData = await getMoments({
      limit: 50,
      cursor: null,
      type: 'all',
    });

    const momentPages: MetadataRoute.Sitemap = momentsData.items.map(
      (moment) => ({
        url: `${baseUrl}/moments/${moment.id}`,
        lastModified: new Date(moment.createdAt),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }),
    );

    const { ids } = await getPlaceIdList();

    const placePages: MetadataRoute.Sitemap = ids.map((id) => ({
      url: `${baseUrl}/places/${id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    console.log(
      `사이트맵 생성 완료: ${momentPages.length}개 기록, ${placePages.length}개 장소`,
    );

    return [...staticPages, ...momentPages, ...placePages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}
