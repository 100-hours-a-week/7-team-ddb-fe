import { EyeIcon, LockIcon, MessageCircleIcon } from 'lucide-react';
import Link from 'next/link';

import { MomentItemType } from '../../types';
import { formatDateByType, truncateText } from '../../utils';

export interface ProfileMomentItemProps {
  moment: MomentItemType;
}

export function ProfileMomentItem({ moment }: ProfileMomentItemProps) {
  const {
    id,
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
      {!isPublic && (
        <div className="absolute top-2 right-0 z-10 justify-end px-4 py-2">
          <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-500">
            <LockIcon className="my-1 mr-1 h-4 w-4" />
            나만보기
          </span>
        </div>
      )}
      <Link href={`/moments/${id}`} className="block">
        <div className="flex flex-col gap-3 px-4 py-3">
          <div className="flex flex-row justify-between gap-2">
            <div className="flex-1">
              <div className="text-sm text-gray-500">
                {formatDateByType(createdAt, 'relative')}
              </div>
              <h3 className="mt-1 text-xl font-semibold text-gray-800">
                {truncateText(title, 15)}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                {truncateText(content, 80)}
              </p>
            </div>
            {thumbnail && (
              <div className="h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-gray-100">
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
