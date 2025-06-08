export type CommentListType = CommentItemType[];

export interface CommentItemType {
  id: string;
  user: CommentUser;
  content: string;
  createdAt: string;
  isOwner: boolean;
}

export interface CommentUser {
  id: string;
  nickname: string;
  profileImage: string | null;
}

export const dummyCommentList: CommentListType = [
  {
    id: 'comment_1',
    user: {
      id: 'user_1',
      nickname: '맛집탐험가',
      profileImage:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    },
    content: '와! 정말 맛있어 보이네요. 다음에 가볼게요!',
    createdAt: '2024-03-15T15:30:00Z',
    isOwner: false,
  },
  {
    id: 'comment_2',
    user: {
      id: 'user_2',
      nickname: '음식사진가',
      profileImage:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    content: '트러플 파스타가 정말 유명한 곳이죠. 저도 자주 가는 곳이에요!',
    createdAt: '2024-03-15T16:45:00Z',
    isOwner: false,
  },
  {
    id: 'comment_3',
    user: {
      id: 'user_789',
      nickname: '맛집탐험가',
      profileImage:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    },
    content: '네! 정말 추천드려요. 특히 와인 페어링이 일품이에요.',
    createdAt: '2024-03-15T17:20:00Z',
    isOwner: true,
  },
  {
    id: 'comment_4',
    user: {
      id: 'user_3',
      nickname: '미식가',
      profileImage: null,
    },
    content: '분위기도 좋아 보이네요. 예약이 필요한가요?',
    createdAt: '2024-03-15T18:10:00Z',
    isOwner: false,
  },
];
