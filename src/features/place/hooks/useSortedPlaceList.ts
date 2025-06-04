import { useMemo } from 'react';

import { Place, SortType } from '../types';

export interface UseSortedPlaceListProps {
  places: Place[];
  sortType: SortType;
}

export function useSortedPlaceList({
  places,
  sortType,
}: UseSortedPlaceListProps) {
  return useMemo(() => {
    const copied = [...places];

    switch (sortType) {
      case 'distance':
        return copied.sort((a, b) => a.distance - b.distance);
      case 'similarity':
        return copied.sort((a, b) => b.similarity_score - a.similarity_score);
      case 'popularity':
        return copied.sort((a, b) => b.moment_count - a.moment_count);
      default:
        return copied;
    }
  }, [places, sortType]);
}
