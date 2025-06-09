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

export type PlaceListType = PlaceItemType[];

export type PlaceItemType = Pick<
  Place,
  'id' | 'name' | 'thumbnail' | 'keywords'
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
  price: number | null;
}

export const dummyPlaceItemData: PlaceListType = [
  {
    id: 1548136332,
    name: 'CU 판교스페이스점',
    thumbnail: 'https://cdn.dev.dolpin.site/place/1548136332.jpg',
    keywords: ['편맥 추천', '야외 공간', '경기지역화폐'],
  },
  {
    id: 1797985320,
    name: 'GS25 판교스페이스점',
    thumbnail: 'https://cdn.dev.dolpin.site/place/1797985320.jpg',
    keywords: ['깔끔한 내부', '경기지역화폐'],
  },
  {
    id: 1489570574,
    name: 'GS25 판교H스퀘어점',
    thumbnail: 'https://cdn.dev.dolpin.site/place/1489570574.jpg',
    keywords: ['깔끔함', '경기지역화폐', '친절함'],
  },
  {
    id: 19155729,
    name: 'GS25 판교삼환점',
    thumbnail: 'https://cdn.dev.dolpin.site/place/19155729.jpg',
    keywords: ['포스트박스'],
  },
];
