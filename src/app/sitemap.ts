import { MetadataRoute } from 'next';

import { getMoments } from '@/features/community';
import { getCategories, searchPlaces } from '@/features/place/api';
import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
} from '@/features/place/constants';

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

    const categoriesData = await getCategories();
    const popularCategories = categoriesData.categories;

    const placePromises = popularCategories.map(async (category) => {
      try {
        const placesData = await searchPlaces({
          query: '',
          lat: DEFAULT_LATITUDE.toString(),
          lng: DEFAULT_LONGITUDE.toString(),
          category: category,
        });

        return placesData.places.map((place) => ({
          url: `${baseUrl}/places/${place.id}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        }));
      } catch (categoryError) {
        console.error(`카테고리 '${category}' 검색 실패:`, categoryError);
        return [];
      }
    });

    const placeResults = await Promise.all(placePromises);
    const flatPlacePages = placeResults.flat();

    const uniquePlacePages = flatPlacePages.filter(
      (page, index, self) =>
        index === self.findIndex((p) => p.url === page.url),
    );

    console.log(
      `사이트맵 생성 완료: ${momentPages.length}개 기록, ${uniquePlacePages.length}개 장소`,
    );

    return [...staticPages, ...momentPages, ...uniquePlacePages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}
