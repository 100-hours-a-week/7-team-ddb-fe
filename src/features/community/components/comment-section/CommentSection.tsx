'use client';

import { useState } from 'react';

import { CommentListType, dummyCommentList } from '../../types/comments';
import { CommentInput } from '../comment-input/CommentInput';
import { CommentList } from '../comment-list/CommentList';

export function CommentSection() {
  const [comments, setComments] = useState<CommentListType>(dummyCommentList);

  const handleSubmit = (content: string) => {
    // TODO: API 호출 후 댓글 추가
    const newComment = {
      id: `comment_${Date.now()}`,
      user: {
        id: 'current_user',
        nickname: '현재 사용자',
        profileImage: null,
      },
      content,
      createdAt: new Date().toISOString(),
      isOwner: true,
    };
    setComments((prev) => [...prev, newComment]);
  };

  const handleDelete = (id: string) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  };

  return (
    <div className="mt-5 pb-20">
      <CommentList comments={comments} onDelete={handleDelete} />
      <div className="mobile-width z-20">
        <CommentInput onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
