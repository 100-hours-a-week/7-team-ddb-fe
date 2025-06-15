import { useMemo } from 'react';

import { Place, SortType } from '../types';

export interface UseSortedPlaceListProps {
  places: Place[];
  sortType: SortType;
}

const sorters: Record<SortType, (a: Place, b: Place) => number> = {
  distance: (a, b) => a.distance - b.distance,
  similarity: (a, b) => b.similarity_score - a.similarity_score,
  popularity: (a, b) => b.moment_count - a.moment_count,
};

export function useSortedPlaceList({
  places,
  sortType,
}: UseSortedPlaceListProps) {
  return useMemo(() => {
    const placesCopy = [...places];
    const comparator = sorters[sortType] ?? (() => 0);
    placesCopy.sort(comparator);

    return placesCopy;
  }, [places, sortType]);
}
