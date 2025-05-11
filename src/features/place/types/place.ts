export interface CategoriesResponse {
  categories: string[];
}

interface Location {
  type: 'Point';
  coordinates: [number, number]; // 경도, 위도 순서 (GeoJSON 표준)
}

export interface Place {
  id: number;
  name: string;
  thumbnail: string;
  distance: string;
  moment_count: string;
  keywords: string[];
  location: Location;
}

export interface PlaceDetail {
  id: number;
  name: string;
  address: string;
  thumbnail: string;
  location: {
    coordinates: [number, number];
    type: string;
  };
  keywords: string[];
  description: string;
  phone: string;
  menu: Menu[];
  opening_hours: OpenHours;
}

export interface OpenHours {
  status:
    | '영업 중'
    | '영업 종료'
    | '브레이크 타임'
    | '휴무일'
    | '영업 정보 없음'
    | '영업 여부 확인 필요';
  schedules: {
    day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
    hours: string | null;
    break_time: string | null;
  }[];
}
export interface Menu {
  name: string;
  price: number;
}
