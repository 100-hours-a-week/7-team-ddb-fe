import { Place } from '../types';

import { fetchApi } from '@/shared/lib/fetchApi';

export interface SearchPlacesResponse {
  total: number;
  places: Place[];
}

export interface SearchPlacesParams {
  lat: string;
  lng: string;
  query: string | null;
  category: string | null;
}

export async function searchPlaces(
  params: SearchPlacesParams,
): Promise<SearchPlacesResponse> {
  try {
    const queryParams = new URLSearchParams({
      lat: params.lat,
      lng: params.lng,
      ...(params.query && { query: params.query }),
      ...(params.category && { category: params.category }),
    });

    const response = await fetchApi<SearchPlacesResponse>(
      `/api/v1/places/search?${queryParams.toString()}`,
    );

    return response;
  } catch (error) {
    console.error('장소 검색 실패:', error);

    throw error;
  }
}
