'use client';

import { CommentListType } from '../../types/comments';

import { CommentItem } from './CommentItem';

interface CommentListProps {
  comments: CommentListType;
  onDelete: (id: string) => void;
}

export function CommentList({ comments, onDelete }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-muted-foreground flex h-32 items-center justify-center">
        아직 댓글이 없습니다.
      </div>
    );
  }

  return (
    <div className="divide-y">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onDelete={onDelete} />
      ))}
    </div>
  );
}
