'use client';

import { useState } from 'react';

import {
  Map,
  PlaceBottomSheet,
  PlaceList,
  SearchResultBar,
} from '@/features/place';

export default function SearchPage() {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const query = searchParams.get('query');
  // const lat = searchParams.get('lat');
  // const lng = searchParams.get('lng');
  // const category = searchParams.get('category');

  const [isOpen, setIsOpen] = useState(false);

  //const [places, setPlaces] = useState<Place[]>([]);
  // const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);

  // const handleMarkerClick = (placeId: number) => {
  //   setSelectedPlaceId((prevId) => (prevId === placeId ? null : placeId)); // 선택 토글
  // };

  return (
    <div className="relative h-full w-full">
      <Map
      // places={places}
      // selectedPlaceId={selectedPlaceId}
      // onMarkerClick={handleMarkerClick}
      />
      <div className="absolute top-0 left-0 z-10 flex w-full flex-col gap-5">
        <SearchResultBar />
        <button
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <img
            src="/img/pin-select.png"
            alt="pin"
            className="mt-32 ml-28 h-15 w-15 cursor-pointer"
          />
        </button>
      </div>
      <PlaceList />
      <PlaceBottomSheet isOpen={isOpen} onOpenChange={setIsOpen} />
    </div>
  );
}
