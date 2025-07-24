'use client';

import {
  Map,
  Place,
  PlaceListBottomSheet,
  usePlaceSearchParams,
  useSearchPlacesQuery,
} from '@/features/place';
import { FullScreenMessage } from '@/shared/components';

export default function SearchPage() {
  const { query, lat, lng, category } = usePlaceSearchParams();
  const { data, isLoading } = useSearchPlacesQuery({
    query,
    lat,
    lng,
    category,
  });

  const places: Place[] = data?.places || [];

  if (isLoading) {
    return (
      <FullScreenMessage
        message="장소를 검색중입니다..."
        image="/img/search-loading.png"
      />
    );
  }

  if (places.length === 0) {
    return (
      <FullScreenMessage
        message="검색된 장소가 없습니다."
        image="/img/search-empty.png"
      />
    );
  }

  return (
    <div className="relative h-full w-full">
      <Map places={places} />
      <PlaceListBottomSheet places={places} />
    </div>
  );
}
