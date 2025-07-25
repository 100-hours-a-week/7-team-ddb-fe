import { CategoriesResponse } from '../types';

import { fetchApi } from '@/shared/lib/fetchApi';

export async function getCategories(): Promise<CategoriesResponse> {
  try {
    const response = await fetchApi<CategoriesResponse>(
      '/api/v1/places/categories',
    );
    return response;
  } catch (error) {
    console.error(error);
    return {
      categories: [
        '음식점',
        '카페',
        '숙박',
        '편의점',
        '영화관',
        '문화시설',
        '식품판매',
      ],
    };
  }
}
