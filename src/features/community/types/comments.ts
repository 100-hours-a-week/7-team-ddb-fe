import { InfiniteList } from '@/shared/types';

export type CommentListType = InfiniteList<CommentItemType>;

export interface CommentItemType {
  id: number;
  user: CommentUser;
  content: string;
  createdAt: string;
  isOwner: boolean;
  parentCommentId: number | null;
}

export interface CommentUser {
  id: number;
  nickname: string;
  profileImage: string | null;
}
