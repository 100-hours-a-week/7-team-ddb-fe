'use client';

import { useEffect, useState } from 'react';

import { getPlaceBookmarkStatus } from '../../api';
import { BookmarkButton } from '../bookmark-button';

import { useSession } from '@/shared/hooks';

export interface PlaceBookmarkStatusProps {
  placeId: number;
}

export function PlaceBookmarkStatus({ placeId }: PlaceBookmarkStatusProps) {
  const { isLoggedIn } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchBookmarkStatus = async () => {
      const { is_bookmarked } = await getPlaceBookmarkStatus({ placeId });
      setIsBookmarked(is_bookmarked);
    };
    fetchBookmarkStatus();
  }, [placeId, isLoggedIn]);

  if (!isLoggedIn) return null;

  return (
    <BookmarkButton
      placeId={placeId}
      initialIsBookmarked={isBookmarked}
      className=""
    />
  );
}
