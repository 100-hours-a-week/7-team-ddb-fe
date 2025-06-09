import { EyeIcon, MessageCircleIcon, LockIcon } from 'lucide-react';
import Link from 'next/link';

import { MomentItemType } from '../../types';
import { formatDateByType } from '../../utils';
import { AuthorInfo } from '../author-info';

export interface MomentItemProps {
  moment: MomentItemType;
  showAuthorInfo?: boolean;
}

export function MomentItem({ moment, showAuthorInfo = true }: MomentItemProps) {
  const {
    author,
    createdAt,
    title,
    thumbnail,
    content,
    isPublic,
    viewCount,
    commentCount,
  } = moment;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-md transition-shadow duration-200 hover:shadow-lg">
      {showAuthorInfo && (
        <>
          <div className="absolute top-2 right-0 justify-end px-4 py-2">
            {!isPublic && (
              <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-500">
                <LockIcon className="my-1 mr-1 h-4 w-4" />
                나만보기
              </span>
            )}
          </div>
          <div className="border-b border-gray-100 px-4 py-3">
            <AuthorInfo user={author} writtenAt={createdAt} />
          </div>
        </>
      )}
      <Link href={`/moments/${moment.id}`}>
        <div className="flex flex-col gap-3 px-4 py-3">
          <div className="flex flex-row justify-between gap-2">
            <div className="flex-1">
              {!showAuthorInfo && (
                <div>{formatDateByType(createdAt, 'relative')}</div>
              )}
              <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
              <p className="mt-1 text-sm text-gray-600">{content}</p>
            </div>
            {thumbnail && (
              <div className="h-32 w-32 overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src={thumbnail}
                  alt={title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex border-t border-gray-100 px-4 py-2 text-sm text-gray-500">
          <div className="flex flex-1 items-center justify-center gap-1">
            <MessageCircleIcon className="h-4 w-4" />
            <span>{commentCount}</span>
          </div>
          <div className="flex flex-1 items-center justify-center gap-1">
            <EyeIcon className="h-4 w-4" />
            <span>{viewCount}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
