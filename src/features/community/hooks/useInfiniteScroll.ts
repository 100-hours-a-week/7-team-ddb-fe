'use client';

import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { InfiniteList } from '@/shared/types';

interface InfiniteScrollProps<T> {
  initialData: InfiniteList<T>;
  fetchMore: (params: {
    limit: number;
    cursor: string | null;
  }) => Promise<InfiniteList<T>>;
  queryKey?: unknown[];
}

export function useInfiniteScroll<T extends { id: number | string }>({
  initialData,
  fetchMore,
  queryKey = ['infinite-scroll'],
}: InfiniteScrollProps<T>) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery<InfiniteList<T>, Error>({
    queryKey,
    queryFn: ({ pageParam }: QueryFunctionContext) =>
      fetchMore({
        limit: initialData.pagination.limit,
        cursor: pageParam as string | null,
      }),
    initialPageParam: null,
    refetchOnMount: true,
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor ?? undefined,
    staleTime: 0,
    gcTime: 1000 * 60 * 10,
    initialData: {
      pages: [initialData],
      pageParams: [null],
    },
  });

  const items = data?.pages.flatMap((p) => p.items) ?? [];

  const targetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: '0px', threshold: 1 },
    );

    observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    items,
    isLoading,
    hasError: isError,
    targetRef,
    refetch,
  };
}
