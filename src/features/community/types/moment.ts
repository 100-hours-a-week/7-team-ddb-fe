import { InfiniteList } from '@/shared/types';

export type MomentListType = InfiniteList<MomentItemType>;

export type MomentType = 'all' | 'my' | 'user';
export interface MomentItemType {
  id: number;
  title: string;
  thumbnail: string | null;
  imagesCount: number;
  content: string;
  isPublic: boolean;
  createdAt: string;
  viewCount: number;
  commentCount: number;
  author: Author | null;
}

export interface Author {
  id: number;
  nickname: string;
  profileImage: string | null;
}

export interface MomentDetail {
  id: number;
  title: string;
  images: string[];
  content: string;
  isOwner: boolean;
  isPublic: boolean;
  createdAt: string;
  viewCount: number;
  commentCount: number;
  author: Author;
  place: Place | null;
}

export interface Place {
  id: number;
  name: string;
}
