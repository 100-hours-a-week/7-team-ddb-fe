import { OpenHoursStatus } from '../types';

import { fetchApi } from '@/shared/lib/fetchApi';

interface GetPlaceBusinessStatusParams {
  placeId: string;
}

export async function getPlaceBusinessStatus({
  placeId,
}: GetPlaceBusinessStatusParams): Promise<OpenHoursStatus> {
  try {
    const response = await fetchApi<OpenHoursStatus>(
      `/api/v1/places/${placeId}/business_status`,
    );
    return response;
  } catch (error) {
    console.error('장소 영업 상태 조회 실패:', error);
    return {
      status: '영업 정보 없음',
    };
  }
}
