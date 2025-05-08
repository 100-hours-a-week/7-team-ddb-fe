import { fetchApi } from '@/shared/lib/fetchApi';

interface Location {
  type: 'Point';
  coordinates: [number, number]; // 경도, 위도 순서 (GeoJSON 표준)
}

export interface Place {
  id: number;
  name: string;
  thumbnail: string;
  distance: string; // API 응답이 문자열일 수 있음
  moment_count: string; // API 응답이 문자열일 수 있음
  keywords: string[];
  location: Location;
}

export interface SearchPlacesResponse {
  total: number;
  places: Place[];
}

export interface SearchPlacesParams {
  query: string;
  lat: string;
  lng: string;
  category?: string;
}

export async function searchPlaces(
  params: SearchPlacesParams,
): Promise<SearchPlacesResponse> {
  try {
    const queryParams = new URLSearchParams({
      query: params.query,
      lat: params.lat,
      lng: params.lng,
      ...(params.category && { category: params.category }),
    });

    const response = await fetchApi<SearchPlacesResponse>(
      `/api/v1/places/search?${queryParams.toString()}`,
    );

    return response;
  } catch (error) {
    console.error('장소 검색 실패:', error);
    // 프로덕션에서는 사용자에게 친화적인 에러 처리 또는 로깅 서비스 연동 고려
    throw error; // 에러를 다시 throw하여 호출부에서 처리할 수 있도록 함
  }
}
