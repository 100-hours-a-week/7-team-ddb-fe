'use client';

import { useState } from 'react';

import { postBookmark } from '../api';

import { useLoginRequiredAction } from '@/shared/hooks';
import { useUserStore } from '@/shared/store';

interface UseBookmarkProps {
  initialIsBookmarked: boolean;
}

export function useBookmark({ initialIsBookmarked }: UseBookmarkProps) {
  const { isLoggedIn } = useUserStore();
  const [isBookmarked, setIsBookmarked] = useState(
    isLoggedIn ? initialIsBookmarked : false,
  );
  const [isLoading, setIsLoading] = useState(false);
  const loginRequiredAction = useLoginRequiredAction();

  const toggleBookmark = async (placeId: number) => {
    await loginRequiredAction(async () => {
      setIsLoading(true);
      const response = await postBookmark(placeId);
      setIsBookmarked(response.is_bookmarked);
      setIsLoading(false);
    });
  };

  return { isBookmarked, isLoading, toggleBookmark };
}
