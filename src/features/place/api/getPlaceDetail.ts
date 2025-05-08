import { fetchApi } from '@/shared/lib/fetchApi';

interface Location {
  type: 'Point';
  coordinates: [number, number];
}

interface OpeningHoursSchedule {
  day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
  hours?: string;
  note?: string;
}

interface OpeningHours {
  status: string;
  schedules: OpeningHoursSchedule[];
}

interface MenuItem {
  name: string;
  price: number;
}

interface PlaceDetail {
  id: string;
  name: string;
  thumbnail: string;
  address: string;
  location: Location;
  keywords: string[];
  description: string;
  opening_hours: OpeningHours;
  phone: string;
  menu: MenuItem[];
}

export async function getPlaceDetail(placeId: string): Promise<PlaceDetail> {
  try {
    const response = await fetchApi<PlaceDetail>(`/api/v1/places/${placeId}`);
    return response;
  } catch (error) {
    console.error('장소 상세 정보 조회 실패:', error);
    throw error;
  }
}
