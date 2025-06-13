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
    console.group(params);

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
    // TODO: 프로덕션에서는 사용자에게 친화적인 에러 처리 또는 로깅 서비스 연동 고려
    throw error;
  }
}
