'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import {
  Map,
  Place,
  PlaceList,
  searchPlaces,
  SearchPlacesResponse,
  SearchResultBar,
} from '@/features/place';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const category = searchParams.get('category');

  const queryKey = ['searchPlaces', query, lat, lng, category];

  const { data, isLoading } = useQuery<SearchPlacesResponse>({
    queryKey,
    queryFn: async () => {
      if (!lat || !lng) {
        return {
          total: 0,
          places: [],
        };
      }

      return await searchPlaces({ query, lat, lng, category });
    },
    enabled: !!lat && !!lng,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const places: Place[] = data?.places || [];

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center text-gray-500">장소를 검색중입니다...</div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div className="absolute top-0 left-0 z-10 flex w-full flex-col gap-5">
        <Suspense>
          <SearchResultBar />
        </Suspense>
      </div>
      {places.length > 0 ? (
        <>
          <Map places={places} />
          <PlaceList places={places} />
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-center text-gray-500">
            검색된 장소가 없습니다.
          </div>
        </div>
      )}
    </div>
  );
}
