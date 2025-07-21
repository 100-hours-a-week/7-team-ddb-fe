'use client';

import Link from 'next/link';

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
        <Link href={`/users/${user.id}`} aria-label="user profile">
          <UserAvatar imageUrl={profileImage ?? null} size="small" />
        </Link>
        <div className="flex flex-col">
          <Link href={`/users/${user.id}`} aria-label="user profile">
            <span className="font-semibold text-gray-700">{nickname}</span>
          </Link>
          <span className="text-gray-500">
            {formatDateByType(writtenAt, 'relative')}
          </span>
        </div>
      </div>
    </div>
  );
}
