'use client';

import Link from 'next/link';

import { CommentItemType } from '../../types/comments';
import { formatDateByType } from '../../utils';

import { CommentOwnerDropDown } from './CommentOwnerDropDown';

import { UserAvatar } from '@/shared/components';

interface CommentItemProps {
  comment: CommentItemType;
  onDelete: (id: number) => void;
}

export function CommentItem({ comment, onDelete }: CommentItemProps) {
  const { id, user, content, createdAt, isOwner } = comment;
  const formattedDate = formatDateByType(createdAt, 'relative');

  return (
    <div className="flex gap-3 p-4">
      <Link href={`/users/${user.id}`}>
        <UserAvatar imageUrl={user.profileImage} size="small" />
      </Link>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href={`/users/${user.id}`}>
              <span className="font-medium">{user.nickname}</span>
            </Link>
            <span className="text-muted-foreground text-sm">
              {formattedDate}
            </span>
          </div>
          {isOwner && <CommentOwnerDropDown onDelete={onDelete} id={id} />}
        </div>
        <p className="mt-1 break-after-auto pr-6 text-sm">{content}</p>
      </div>
    </div>
  );
}
