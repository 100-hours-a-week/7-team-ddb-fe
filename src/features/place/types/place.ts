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
  distance: number;
  moment_count: number;
  similarity_score: number;
  keywords: string[];
  location: Location;
  is_bookmarked: boolean;
}

export type PlaceListType = PlaceItemType[];

export type PlaceItemType = Pick<
  Place,
  'id' | 'name' | 'thumbnail' | 'keywords' | 'is_bookmarked'
>;

export interface PlaceDetail {
  id: number;
  name: string;
  address: string | null;
  thumbnail: string | null;
  location: {
    coordinates: [number, number];
    type: string;
  };
  keywords: string[];
  description: string;
  phone: string | null;
  menu?: Menu[];
  opening_hours: OpenHours;
}

export interface OpenHours {
  status: OpenHoursStatus;
  schedules: {
    day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
    hours: string | null;
    break_time: string | null;
  }[];
}

export interface OpenHoursStatus {
  status:
    | '영업중'
    | '영업 종료'
    | '브레이크 타임'
    | '휴무일'
    | '영업 정보 없음'
    | '영업 여부 확인 필요';
}
export interface Menu {
  name: string;
  price: number | null;
}
