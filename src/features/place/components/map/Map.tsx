'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '../../constants';
import { usePlaceToast } from '../../hooks';
import { useBottomSheetStore } from '../../stores';
import { Place } from '../../types';
import {
  createPlaceMarkers,
  initializeMap,
  resetSelectedMarker,
} from '../../utils';
import { PlacePinBottomSheet } from '../place-pin-bottom-sheet';

import { loadKakaoMapScript } from '@/shared/lib/map';

export interface MapProps {
  places: Place[];
  isBookmarkButton?: boolean;
}

export function Map({ places, isBookmarkButton }: MapProps) {
  const { showToast } = usePlaceToast();
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const lastPlaceId = useBottomSheetStore((state) => state.lastPlaceId);
  const setOpened = useBottomSheetStore((state) => state.setOpened);
  const setLastPlaceId = useBottomSheetStore((state) => state.setLastPlaceId);

  const handleMarkerClickForSheet = (place: Place) => {
    setOpened('pin');
    setLastPlaceId(place.id);
  };

  const handleCloseBottomSheet = useCallback(() => {
    setOpened('list');
    resetSelectedMarker();
  }, [setOpened]);

  const handleOutOfBounds = useCallback(() => {
    showToast('지도 영역을 벗어났습니다.');
  }, [showToast]);

  useEffect(() => {
    loadKakaoMapScript(() => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const mapContainer = document.getElementById('map');
          if (mapContainer) {
            const initializedMap = initializeMap(
              mapContainer,
              DEFAULT_LATITUDE,
              DEFAULT_LONGITUDE,
              handleOutOfBounds,
            );
            mapRef.current = initializedMap;
            setIsMapLoaded(true);
          } else {
            console.error(
              '[Map Initial useEffect] Map container element not found.',
            );
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    if (isMapLoaded && mapRef.current) {
      if (places && places.length > 0) {
        createPlaceMarkers(mapRef.current, places, handleMarkerClickForSheet);
      } else {
        createPlaceMarkers(mapRef.current, [], handleMarkerClickForSheet);
      }
    }
  }, [places, isMapLoaded]);

  return (
    <>
      <div
        id="map"
        className="absolute inset-0 z-0 h-full w-full"
        style={{ minHeight: '100svh' }}
      />
      <PlacePinBottomSheet
        onOpenChange={handleCloseBottomSheet}
        place={places.find((place) => place.id === lastPlaceId) || null}
        isBookmarkButton={isBookmarkButton}
      />
    </>
  );
}
