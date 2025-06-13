'use client';

import { useEffect, useRef, useState } from 'react';

import { InfiniteList } from '@/shared/types';

interface InfiniteScrollProps<T> {
  initialData: InfiniteList<T>;
  fetchMore: (params: {
    limit: number;
    cursor: string | null;
  }) => Promise<InfiniteList<T>>;
}

export function useInfiniteScroll<T>({
  initialData,
  fetchMore,
}: InfiniteScrollProps<T>) {
  const [items, setItems] = useState(initialData.items);
  const [pagination, setPagination] = useState(initialData.pagination);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const fetchNextPage = async () => {
    if (isLoading || !pagination.hasNext) return;

    setIsLoading(true);

    try {
      const newData = await fetchMore({
        limit: pagination.limit,
        cursor: pagination.nextCursor,
      });

      setItems((prev) => [...prev, ...newData.items]);
      setPagination(newData.pagination);
    } catch (error) {
      console.error(error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && pagination.hasNext && !isLoading) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1,
      },
    );

    if (targetRef.current) {
      observerRef.current.observe(targetRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [pagination.nextCursor, isLoading]);

  return {
    items,
    pagination,
    isLoading,
    hasError,
    targetRef,
  };
}
