'use client';

import Link from 'next/link';

import { useCommentStore } from '../../stores';
import { CommentItemType } from '../../types/comments';
import { formatDateByType } from '../../utils';

import { CommentOwnerDropDown } from './CommentOwnerDropDown';

import { UserAvatar } from '@/shared/components';

interface CommentItemProps {
  comment: CommentItemType;
  onDelete: (id: number) => void;
  isReply?: boolean;
  replies?: CommentItemType[];
}

export function CommentItem({
  comment,
  onDelete,
  isReply,
  replies,
}: CommentItemProps) {
  const { id, user, content, createdAt, isOwner } = comment;
  const { startReply } = useCommentStore();
  const formattedDate = formatDateByType(createdAt, 'relative');

  const handleReplyClick = () => {
    startReply(user.id, user.nickname, id);
  };

  return (
    <>
      <div
        className={`flex gap-3 p-4 ${isReply ? 'mx-4 mb-2 rounded-lg border-l-2 border-gray-200 bg-gray-50/50' : ''}`}
      >
        <Link href={`/users/${user.id}`} aria-label="user profile">
          <UserAvatar imageUrl={user.profileImage} size="small" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href={`/users/${user.id}`} aria-label="user profile">
                <span className={`font-medium ${isReply ? 'text-sm' : ''}`}>
                  {user.nickname}
                </span>
              </Link>
              <span
                className={`text-muted-foreground ${isReply ? 'text-xs' : 'text-sm'}`}
              >
                {formattedDate}
              </span>
            </div>
            {isOwner && <CommentOwnerDropDown onDelete={onDelete} id={id} />}
          </div>
          <p
            className={`mt-1 break-after-auto pr-6 ${isReply ? 'text-sm' : 'text-sm'}`}
          >
            {content}
          </p>
          {!isReply && (
            <button
              className="text-muted-foreground mt-2 cursor-pointer text-xs transition-colors hover:text-gray-700"
              onClick={handleReplyClick}
            >
              답글 달기
            </button>
          )}
        </div>
      </div>
      {replies && replies.length > 0 && (
        <div className="relative">
          <div className="space-y-1 pl-8">
            {replies.map((reply) => (
              <div key={reply.id} className="relative">
                <CommentItem
                  comment={reply}
                  onDelete={onDelete}
                  isReply={true}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
