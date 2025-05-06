'use client';

import { useRouter } from 'next/navigation';

import {
  mockPlaceDetail,
  PlaceBasicInfo,
  PlaceMenu,
  PlaceOpenHours,
} from '@/features/place';
import { Header } from '@/shared/components';

export default function PlaceDetailPage() {
  const router = useRouter();
  // TODO: API 연동 시 실제 데이터로 교체
  const place = mockPlaceDetail;

  return (
    <div className="flex h-screen flex-col">
      <Header showBackButton onBackClick={() => router.back()} />
      <div className="flex-1 overflow-y-auto pb-16">
        <div className="container mx-auto mb-4 px-4 py-5">
          <PlaceBasicInfo placeBasicInfo={place} />
          <PlaceOpenHours openHours={place.opening_hours} />
          <PlaceMenu menu={place.menu} />
        </div>
      </div>
    </div>
  );
}
