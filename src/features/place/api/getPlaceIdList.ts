import { fetchApi } from '@/shared/lib/fetchApi';

interface PlaceIdListResponse {
  ids: number[];
}

export async function getPlaceIdList(): Promise<PlaceIdListResponse> {
  try {
    const response = await fetchApi<PlaceIdListResponse>('/api/v1/places/ids');
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
