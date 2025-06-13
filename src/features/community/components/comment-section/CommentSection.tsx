'use client';

import { deleteComment, postComment } from '../../api';
import { CommentListType } from '../../types';
import { CommentInput } from '../comment-input/CommentInput';
import { CommentList } from '../comment-list/CommentList';

interface CommentSectionProps {
  momentId: number;
  initialComments: CommentListType;
}

export function CommentSection({
  momentId,
  initialComments,
}: CommentSectionProps) {
  const handleSubmit = async (content: string) => {
    await postComment({ momentId, content });
  };

  const handleDelete = async (id: number) => {
    await deleteComment(momentId, id);
  };

  return (
    <div className="mt-5 pb-20">
      <CommentList
        momentId={momentId}
        initialComments={initialComments}
        onDelete={handleDelete}
      />
      <div className="mobile-width z-20">
        <CommentInput onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
