'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import {
  Map,
  Place,
  PlaceList,
  searchPlaces,
  SearchResultBar,
} from '@/features/place';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const category = searchParams.get('category');

  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsLoading(true);
      const currentLat = lat || undefined;
      const currentLng = lng || undefined;
      const currentQuery = query || null;
      const currentCategory = category || null;

      if (currentLat && currentLng) {
        try {
          const result = await searchPlaces({
            query: currentQuery,
            lat: currentLat,
            lng: currentLng,
            category: currentCategory,
          });
          console.log('장소 검색 결과:', result.places);
          setPlaces(result.places || []);
        } catch (error) {
          console.error('장소 검색 API 호출 중 오류:', error);
          setPlaces([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.log('위치 정보(lat, lng)가 없어 장소를 검색할 수 없습니다.');
      }
    };

    fetchPlaces();
  }, [query, lat, lng, category]);

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
