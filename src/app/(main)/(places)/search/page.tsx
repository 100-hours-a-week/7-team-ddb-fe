'use client';

import { useState } from 'react';

import {
  Map,
  PlaceBottomSheet,
  PlaceList,
  SearchResultBar,
} from '@/features/place';

export default function SearchPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative h-full w-full">
      <Map />
      <div className="absolute top-0 left-0 z-10 flex w-full flex-col gap-5">
        <SearchResultBar />
        <button
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          바텀 시트
        </button>
      </div>
      <PlaceList />
      <PlaceBottomSheet isOpen={isOpen} onOpenChange={setIsOpen} />
    </div>
  );
}
