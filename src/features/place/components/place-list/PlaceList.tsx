import { PlaceItem } from '../place-item';

import { PlaceListType } from '@/features/place';

export interface PlaceListProps {
  places: PlaceListType;
  emptyContainerClassName?: string;
  emptyMessage?: string;
  isBookmarkButton?: boolean;
}

export function PlaceList({ places, isBookmarkButton }: PlaceListProps) {
  return (
    <div className="space-y-8">
      {places.map((place) => (
        <div key={place.id} className="border-b border-zinc-200 pb-8">
          <PlaceItem
            place={place}
            isClickable
            isBookmarkButton={isBookmarkButton}
          />
        </div>
      ))}
    </div>
  );
}
