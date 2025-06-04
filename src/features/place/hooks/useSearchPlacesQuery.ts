import { useQuery } from '@tanstack/react-query';

import { searchPlaces, SearchPlacesResponse } from '../api';

export interface UseSearchPlacesQueryProps {
  query: string | null;
  lat: string | null;
  lng: string | null;
  category: string | null;
}

export function useSearchPlacesQuery({
  query,
  lat,
  lng,
  category,
}: UseSearchPlacesQueryProps) {
  const queryKey = ['searchPlaces', query, lat, lng, category];

  return useQuery<SearchPlacesResponse>({
    queryKey,
    queryFn: async () => {
      if (!lat || !lng) {
        return {
          total: 0,
          places: [],
        };
      }

      return await searchPlaces({ query, lat, lng, category });
    },
    enabled: !!lat && !!lng,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
