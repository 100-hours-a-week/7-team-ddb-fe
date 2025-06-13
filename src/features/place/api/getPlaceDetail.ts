import { PlaceDetail } from '../types';

import { fetchApi } from '@/shared/lib/fetchApi';

interface GetPlaceDetailParams {
  placeId: string;
  cookie?: string;
}

export async function getPlaceDetail({
  placeId,
  cookie,
}: GetPlaceDetailParams): Promise<PlaceDetail> {
  try {
    const response = await fetchApi<PlaceDetail>(`/api/v1/places/${placeId}`, {
      headers: cookie ? { Cookie: cookie } : undefined,
    });
    return response;
  } catch (error) {
    console.error('장소 상세 정보 조회 실패:', error);
    throw error;
  }
}
