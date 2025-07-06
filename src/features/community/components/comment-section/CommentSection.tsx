'use client';

import { useEffect, useRef } from 'react';

import { getComments } from '../../api';
import {
  useAddComment,
  useDeleteComment,
  useInfiniteScroll,
} from '../../hooks';
import { useCommentStore } from '../../stores';
import { CommentItemType, CommentListType } from '../../types';
import { CommentInput } from '../comment-input/CommentInput';
import { CommentList } from '../comment-list/CommentList';

import { useToast } from '@/shared/hooks';
import { useConfirmDialogStore } from '@/shared/store';

interface CommentSectionProps {
  momentId: number;
  initialComments: CommentListType;
}

export function CommentSection({
  momentId,
  initialComments,
}: CommentSectionProps) {
  const queryKey = ['comments', momentId];

  const { showSuccessToast } = useToast();
  const { replyState, cancelReply } = useCommentStore();
  const { items, isLoading, hasError, targetRef, refetch } =
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
      queryKey,
    });

  const { mutate: addComment } = useAddComment(queryKey, momentId);
  const { mutate: deleteComment } = useDeleteComment(queryKey, momentId);

  const openDialog = useConfirmDialogStore((s) => s.openDialog);

  const prevItemsLength = useRef(items.length);

  useEffect(() => {
    if (items.length > prevItemsLength.current) {
      const scrollContainer = document.getElementById(
        'comment-scroll-container',
      );
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
    prevItemsLength.current = items.length;
  }, [items]);

  const handleSubmit = async (content: string) => {
    addComment({ content }, { onError: () => refetch() });
  };

  const handleReply = async (content: string) => {
    addComment(
      { content, parent_comment_id: replyState.parentCommentId ?? undefined },
      {
        onSuccess: () => cancelReply(),
        onError: () => refetch(),
      },
    );
  };

  const handleDelete = async (id: number) => {
    const ok = await openDialog({
      title: '댓글 삭제',
      description: '댓글을 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소',
      confirmButtonClassName: 'bg-destructive text-white',
    });

    if (!ok) return;

    deleteComment(id, {
      onSuccess: () => showSuccessToast('댓글이 삭제되었습니다.'),
      onError: () => refetch(),
    });
  };

  return (
    <div className="mt-5 pb-20">
      <CommentList
        items={items}
        isLoading={isLoading}
        hasError={hasError}
        targetRef={targetRef}
        onDelete={handleDelete}
      />
      <div className="mobile-width z-20">
        <CommentInput
          onSubmit={replyState.isReplying ? handleReply : handleSubmit}
        />
      </div>
    </div>
  );
}
