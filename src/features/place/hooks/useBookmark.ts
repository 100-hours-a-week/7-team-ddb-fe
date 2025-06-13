'use client';

import { useState } from 'react';

import { postBookmark } from '../api';

interface UseBookmarkProps {
  initialIsBookmarked: boolean;
}

export function useBookmark({ initialIsBookmarked }: UseBookmarkProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [isLoading, setIsLoading] = useState(false);

  const toggleBookmark = async (placeId: number) => {
    setIsLoading(true);
    const response = await postBookmark(placeId);
    setIsBookmarked(response.is_bookmarked);
    setIsLoading(false);
  };

  return { isBookmarked, isLoading, toggleBookmark };
}
