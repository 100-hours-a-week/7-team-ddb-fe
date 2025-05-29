'use client';

import { Drawer } from 'vaul';

import { BOTTOM_SHEET_SNAP_POINTS } from '../../constants';
import {
  useBottomSheetSnapManagement,
  useGlobalFocusHandler,
  useScrollRestoration,
} from '../../hooks';
import { useBottomSheetStore } from '../../stores';
import { Place } from '../../types';
import { PlaceItem } from '../place-item';

export interface PlaceListProps {
  places: Place[];
}

export function PlaceListBottomSheet({ places }: PlaceListProps) {
  const { opened, prevSnap, scrollY, setPrevSnap, setScrollY } =
    useBottomSheetStore();

  const isOpen = opened === 'list';

  const { snap, setSnap, snapPoints } = useBottomSheetSnapManagement({
    initialSnapPoints: BOTTOM_SHEET_SNAP_POINTS,
    persistedPrevSnap: prevSnap,
    setPersistedPrevSnap: setPrevSnap,
  });

  const { scrollContainerRef, handleScroll } = useScrollRestoration({
    isOpen,
    persistedScrollY: scrollY,
    setPersistedScrollY: setScrollY,
  });

  useGlobalFocusHandler(isOpen);

  return (
    <Drawer.Root
      open={isOpen}
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      modal={false}
    >
      <Drawer.Portal>
        <Drawer.Content
          className="fixed right-0 bottom-0 left-0 z-10 mx-auto flex h-full max-w-[430px] flex-col rounded-t-2xl border-t bg-white shadow-lg outline-none"
          style={{ maxHeight: 'calc(100svh - 60px)' }}
        >
          <div className="mx-auto mt-4 h-1.5 w-12 rounded-full bg-zinc-300" />
          <Drawer.Title className="hidden">추천 장소 목록</Drawer.Title>
          <Drawer.Description className="hidden">
            당신이 원하는 장소를 추천해드립니다.
          </Drawer.Description>
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="my-10 flex-1 overflow-y-auto px-4 pb-10"
          >
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
