'use client';

import { useSearchParams } from 'next/navigation';

export function usePlaceSearchParams() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const category = searchParams.get('category');

  return {
    query,
    lat,
    lng,
    category,
  };
}
