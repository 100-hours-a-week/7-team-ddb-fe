export interface CategoriesResponse {
  categories: string[];
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
  status: string;
  schedules: {
    day: string;
    hours: string | null;
    note: string | null;
  }[];
}
export interface Menu {
  name: string;
  price: number;
}

export const mockPlaceDetail: PlaceDetail = {
  id: 1,
  name: '해목 논현점',
  address: '서울 강남구 선릉로 145길 14',
  thumbnail:
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1000&auto=format&fit=crop',
  location: {
    coordinates: [126.9804, 37.5231],
    type: 'Point',
  },
  keywords: ['포장', '주차', '밀실'],
  description:
    '다양한 맛과 특별한 장어의 만남. 다양한 맛과 특별한 장어의 만남. 다양한 맛과 특별한 장어의 만남. 다양한 맛과 특별한 장어의 만남.',
  phone: '0507-0505-0607',
  menu: [
    {
      name: '장어구이',
      price: 25000,
    },
    {
      name: '소주',
      price: 5000,
    },
    {
      name: '맥주',
      price: 5000,
    },
    {
      name: '장어찜',
      price: 35000,
    },
    {
      name: '미꾸라지탕',
      price: 15000,
    },
  ],
  opening_hours: {
    status: '영업 중',
    schedules: [
      {
        day: 'mon',
        hours: '08:00~17:00',
        note: null,
      },
      {
        day: 'tue',
        hours: '08:00~17:00',
        note: null,
      },
      {
        day: 'wed',
        hours: '08:00~17:00',
        note: null,
      },
      {
        day: 'thu',
        hours: '08:00~17:00',
        note: null,
      },
      {
        day: 'fri',
        hours: '08:00~17:00',
        note: null,
      },
      {
        day: 'sat',
        hours: null,
        note: '정기휴무 (매주 토요일)',
      },
      {
        day: 'sun',
        hours: null,
        note: '정기휴무 (매주 일요일)',
      },
    ],
  },
};
