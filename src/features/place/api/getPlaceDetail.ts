import { PlaceDetail } from '../types';

import { fetchApi } from '@/shared/lib/fetchApi';

interface GetPlaceDetailParams {
  placeId: string;
}

export async function getPlaceDetail({
  placeId,
}: GetPlaceDetailParams): Promise<PlaceDetail> {
  try {
    const response = await fetchApi<PlaceDetail>(`/api/v1/places/${placeId}`, {
      next: { revalidate: 86400 },
    });

    return response;
  } catch (error) {
    console.error('장소 상세 정보 조회 실패:', error);
    throw error;
  }
}
