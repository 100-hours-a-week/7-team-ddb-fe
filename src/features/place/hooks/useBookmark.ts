'use client';

import { useEffect, useState } from 'react';

import { postBookmark } from '../api';

interface UseBookmarkProps {
  initialIsBookmarked: boolean;
}

export function useBookmark({ initialIsBookmarked }: UseBookmarkProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsBookmarked(initialIsBookmarked);
  }, [initialIsBookmarked]);

  const toggleBookmark = async (placeId: number) => {
    setIsLoading(true);
    const response = await postBookmark(placeId);

    setIsBookmarked(response.is_bookmarked);
    setIsLoading(false);
  };

  return { isBookmarked, isLoading, toggleBookmark };
}
