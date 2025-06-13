'use client';

import { Bookmark, BookmarkSolid } from 'iconoir-react';

import { useBookmark } from '../../hooks';

import { cn } from '@/shared/lib/utils';

interface BookmarkButtonProps {
  placeId: number;
  initialIsBookmarked: boolean;
  className?: string;
}

export function BookmarkButton({
  placeId,
  initialIsBookmarked,
  className,
}: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmark({
    initialIsBookmarked,
  });

  return (
    <span
      className={cn('size-6 cursor-pointer', className)}
      onClick={() => {
        toggleBookmark(placeId);
      }}
    >
      {isBookmarked ? (
        <BookmarkSolid className="h-full w-full text-zinc-600" />
      ) : (
        <Bookmark className="h-full w-full text-zinc-500 hover:text-zinc-600" />
      )}
    </span>
  );
}
