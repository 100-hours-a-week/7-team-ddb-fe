'use client';

import { useEffect, useRef, useState } from 'react';
import { Drawer } from 'vaul';

import { Place } from '../../types';
import { PlaceItem } from '../place-item';

export interface PlaceListProps {
  places: Place[];
}

export function PlaceList({ places }: PlaceListProps) {
  const snapPoints = ['300px', '400px', 1];
  const minSnap = snapPoints[0];

  const [isOpen, setIsOpen] = useState(true);
  const [snap, setSnap] = useState<string | number | null>(minSnap);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const firstButton = contentRef.current.querySelector('button');
      firstButton?.focus();
    }
  }, [isOpen]);

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (open) setIsOpen(true);
      }}
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
    >
      <Drawer.Portal>
        <Drawer.Content
          className="fixed right-0 bottom-0 left-0 z-50 mx-auto flex max-w-[430px] flex-col rounded-t-2xl border-t bg-white shadow-lg"
          style={{ maxHeight: '100dvh' }}
        >
          <div className="mx-auto mt-4 h-1.5 w-12 rounded-full bg-zinc-300" />
          <Drawer.Title className="hidden">추천 장소 목록</Drawer.Title>
          <Drawer.Description className="hidden">
            당신이 원하는 장소를 추천해드립니다.
          </Drawer.Description>
          <div className="my-10 flex-1 overflow-y-auto px-4 pb-10">
            <div className="space-y-8">
              {places.map((place) => (
                <div key={place.id} className="border-b border-zinc-200 pb-8">
                  <PlaceItem
                    key={place.id}
                    id={place.id}
                    name={place.name}
                    thumbnail={place.thumbnail}
                    keywords={place.keywords}
                    isClickable
                  />
                </div>
              ))}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
