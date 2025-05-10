import { PlaceDetail } from '../types';

import { fetchApi } from '@/shared/lib/fetchApi';

export async function getPlaceDetail(placeId: string): Promise<PlaceDetail> {
  try {
    const response = await fetchApi<PlaceDetail>(`/api/v1/places/${placeId}`);
    return response;
  } catch (error) {
    console.error('장소 상세 정보 조회 실패:', error);
    throw error;
  }
}
