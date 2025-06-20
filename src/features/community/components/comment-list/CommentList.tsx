'use client';

import { RefObject } from 'react';

import { CommentItemType } from '../../types/comments';

import { CommentItem } from './CommentItem';

import { FullScreenMessage, LoadingSpinner } from '@/shared/components';

interface CommentListProps {
  items: CommentItemType[];
  isLoading: boolean;
  hasError: boolean;
  targetRef: RefObject<HTMLDivElement | null>;
  onDelete: (id: number) => void;
}

export function CommentList({
  items,
  isLoading,
  hasError,
  targetRef,
  onDelete,
}: CommentListProps) {
  if (items.length === 0) {
    return (
      <div className="text-muted-foreground flex h-32 items-center justify-center">
        아직 댓글이 없습니다.
      </div>
    );
  }

  const groupedComments = items.reduce(
    (acc, comment) => {
      if (!comment.parentCommentId) {
        acc.push({
          ...comment,
          replies: items.filter((item) => item.parentCommentId === comment.id),
        });
      }
      return acc;
    },
    [] as (CommentItemType & { replies: CommentItemType[] })[],
  );

  return (
    <div>
      {groupedComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onDelete={onDelete}
          replies={comment.replies}
        />
      ))}
      <div ref={targetRef} />
      {isLoading && <LoadingSpinner className="h-24" />}
      {hasError && <FullScreenMessage message="데이터 로드에 실패했습니다." />}
    </div>
  );
}
