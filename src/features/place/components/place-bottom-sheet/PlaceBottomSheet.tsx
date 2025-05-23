'use client';

import { Drawer } from 'vaul';

import { Place } from '../../types';
import { PlaceItem } from '../place-item';

interface PlaceBottomSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  place: Place | null;
}

export function PlaceBottomSheet({
  isOpen,
  onOpenChange,
  place,
}: PlaceBottomSheetProps) {
  if (!place) {
    return null;
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <Drawer.Content className="fixed right-0 bottom-0 left-0 z-50 mx-auto flex h-fit w-full max-w-[430px] flex-col rounded-t-[10px] bg-gray-100 outline-none">
          <div className="flex-1 rounded-t-[10px] bg-white p-4">
            <div className="mx-auto mb-3 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
            <div className="mx-auto max-w-md">
              <div className="relative">
                <Drawer.Title className="sr-only">{place.name}</Drawer.Title>
                <Drawer.Description className="sr-only">
                  {place.name} 장소 정보를 확인할 수 있는 드로어입니다.
                </Drawer.Description>
                <PlaceItem
                  id={place.id}
                  name={place.name}
                  thumbnail={place.thumbnail}
                  keywords={place.keywords}
                  isDetailButton
                />
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
