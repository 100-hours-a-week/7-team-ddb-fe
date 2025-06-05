export type MomentListType = MomentItemType[];

export interface MomentItemType {
  id: string;
  title: string;
  thumbnail: string | null;
  imagesCount: number;
  content: string;
  isPublic: boolean;
  createdAt: string;
  viewCount: number;
  commentCount: number;
  author: Author;
}

export interface Author {
  id: string;
  nickname: string;
  profileImage: string | null;
}

export const dummyMomentListData: MomentListType = [
  {
    id: '1',
    title: '첫 번째 기록',
    thumbnail: null,
    imagesCount: 3,
    content: '오늘은 정말 멋진 하루였어요!',
    isPublic: true,
    createdAt: '2025-06-01T10:00:00Z',
    viewCount: 124,
    commentCount: 8,
    author: {
      id: 'user_1',
      nickname: '감성러버',
      profileImage: '',
    },
  },
  {
    id: '2',
    title: '비 오는 날의 산책',
    thumbnail:
      'https://cdn.pixabay.com/photo/2024/02/26/19/39/monochrome-image-8598798_1280.jpg',
    imagesCount: 1,
    content: '우산 없이 걷는 것도 나쁘지 않더라구요.',
    isPublic: false,
    createdAt: '2025-06-03T14:23:00Z',
    viewCount: 37,
    commentCount: 2,
    author: {
      id: 'user_2',
      nickname: '일상기록러',
      profileImage: null,
    },
  },
  {
    id: '3',
    title: '카페 탐방',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyPkxMuo6NOHcNx-aO-wOo3eyVnB2oTq-ZwA&s',
    imagesCount: 5,
    content: '새로 생긴 카페, 분위기랑 커피 둘 다 최고!',
    isPublic: true,
    createdAt: '2025-06-05T01:15:00Z',
    viewCount: 290,
    commentCount: 15,
    author: {
      id: 'user_3',
      nickname: '커피홀릭',
      profileImage:
        'https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg',
    },
  },
];
