'use client';

import { getComments } from '../../api';
import { useInfiniteScroll } from '../../hooks';
import { CommentItemType, CommentListType } from '../../types/comments';

import { CommentItem } from './CommentItem';

import { FullScreenMessage, LoadingSpinner } from '@/shared/components';

interface CommentListProps {
  momentId: number;
  initialComments: CommentListType;
  onDelete: (id: number) => void;
}

export function CommentList({
  momentId,
  initialComments,
  onDelete,
}: CommentListProps) {
  const { items, isLoading, hasError, targetRef } =
    useInfiniteScroll<CommentItemType>({
      initialData: initialComments,
      fetchMore: async ({ limit, cursor }) => {
        const newData = await getComments({
          limit,
          cursor,
          momentId,
        });
        return newData;
      },
    });

  if (items.length === 0) {
    return (
      <div className="text-muted-foreground flex h-32 items-center justify-center">
        아직 댓글이 없습니다.
      </div>
    );
  }

  return (
    <div className="divide-y">
      {items.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onDelete={onDelete} />
      ))}
      <div ref={targetRef} />
      {isLoading && <LoadingSpinner className="h-24" />}
      {hasError && <FullScreenMessage message="데이터 로드에 실패했습니다." />}
    </div>
  );
}
