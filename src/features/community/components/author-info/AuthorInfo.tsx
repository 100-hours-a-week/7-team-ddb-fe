'use client';

import { Author } from '../../types';
import { formatDateByType } from '../../utils';

import { UserAvatar } from '@/shared/components';

export interface AuthorInfoProps {
  user: Author;
  writtenAt: string;
}

export function AuthorInfo({ user, writtenAt }: AuthorInfoProps) {
  const { profileImage, nickname } = user;

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex items-center gap-3">
        <UserAvatar imageUrl={profileImage ?? null} size="small" />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-700">{nickname}</span>
          <span className="text-gray-500">
            {formatDateByType(writtenAt, 'relative')}
          </span>
        </div>
      </div>
    </div>
  );
}
