// import { fetchApi } from '@/shared/lib/fetchApi';

import { Place } from '../types';

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
    /*
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
    */

    return {
      total: 5,
      places: [
        {
          id: 1,
          name: '늘솜당 베이커리',
          thumbnail: 'https://picsum.photos/seed/bakery1/200/200',
          distance: '150',
          moment_count: '5',
          keywords: ['베이커리', '커피', '디저트'],
          location: {
            type: 'Point',
            coordinates: [127.1075, 37.4008],
          },
        },
        {
          id: 2,
          name: '판교 중앙공원',
          thumbnail: 'https://picsum.photos/seed/park2/200/200',
          distance: '300',
          moment_count: '12',
          keywords: ['공원', '산책', '나들이'],
          location: {
            type: 'Point',
            coordinates: [127.1052, 37.3995],
          },
        },
        {
          id: 3,
          name: '스타벅스 판교H스퀘어점',
          thumbnail: 'https://picsum.photos/seed/starbucks3/200/200',
          distance: '80',
          moment_count: '25',
          keywords: ['카페', '커피', '와이파이'],
          location: {
            type: 'Point',
            coordinates: [127.1061, 37.4015],
          },
        },
        {
          id: 4,
          name: 'CGV 판교',
          thumbnail: 'https://picsum.photos/seed/movie4/200/200',
          distance: '500',
          moment_count: '8',
          keywords: ['영화관', '팝콘', '데이트'],
          location: {
            type: 'Point',
            coordinates: [127.1088, 37.3982],
          },
        },
        {
          id: 5,
          name: '서현역 맛집거리',
          thumbnail: 'https://picsum.photos/seed/food5/200/200',
          distance: '250',
          moment_count: '30',
          keywords: ['음식점', '한식', '양식', '모임'],
          location: {
            type: 'Point',
            coordinates: [127.1045, 37.4021],
          },
        },
      ],
    };
  } catch (error) {
    console.error('장소 검색 실패:', error);
    // TODO: 프로덕션에서는 사용자에게 친화적인 에러 처리 또는 로깅 서비스 연동 고려
    throw error; // 에러를 다시 throw하여 호출부에서 처리할 수 있도록 함
  }
}
