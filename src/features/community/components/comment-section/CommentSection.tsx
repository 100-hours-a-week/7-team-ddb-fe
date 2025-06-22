'use client';

import { useEffect, useRef } from 'react';

import { getComments, deleteComment, postComment } from '../../api';
import { useInfiniteScroll } from '../../hooks';
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
  const { showSuccessToast } = useToast();
  const { replyState, cancelReply } = useCommentStore();
  const {
    items,
    isLoading,
    hasError,
    targetRef,
    refetch,
    removeItem,
    addItem,
  } = useInfiniteScroll<CommentItemType>({
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
    try {
      const newComment = await postComment({ momentId, content });
      addItem({
        id: newComment.id,
        user: {
          id: newComment.user.id,
          nickname: newComment.user.nickname,
          profileImage: newComment.user.profile_image,
        },
        content: newComment.content,
        createdAt: newComment.created_at,
        isOwner: newComment.is_owner,
        parentCommentId: null,
      });
    } catch (error) {
      console.error('Failed to post comment:', error);
      refetch();
    }
  };

  const handleReply = async (content: string) => {
    try {
      const newComment = await postComment({
        momentId,
        content,
        parent_comment_id: replyState.parentCommentId,
      });

      addItem({
        id: newComment.id,
        user: {
          id: newComment.user.id,
          nickname: newComment.user.nickname,
          profileImage: newComment.user.profile_image,
        },
        content: newComment.content,
        createdAt: newComment.created_at,
        isOwner: newComment.is_owner,
        parentCommentId: newComment.parent_comment_id,
      });

      cancelReply();
    } catch (error) {
      console.error('Failed to post comment:', error);
      refetch();
    }
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
    try {
      removeItem(id);
      await deleteComment(momentId, id);
      showSuccessToast('댓글이 삭제되었습니다.');
    } catch {
      refetch();
    }
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
