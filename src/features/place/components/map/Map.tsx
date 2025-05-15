'use client';

import { useEffect, useRef, useState } from 'react';

import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '../../constants';
import { Place } from '../../types';
import { createPlaceMarkers, initializeMap } from '../../utils';
import { PlaceBottomSheet } from '../place-bottom-sheet';

import { loadKakaoMapScript } from '@/shared/lib/map';

export interface MapProps {
  places: Place[];
}

export function Map({ places }: MapProps) {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedPlaceForSheet, setSelectedPlaceForSheet] =
    useState<Place | null>(null);

  const handleMarkerClickForSheet = (place: Place) => {
    setSelectedPlaceForSheet(place);
    setIsBottomSheetOpen(true);
  };

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
      <PlaceBottomSheet
        isOpen={isBottomSheetOpen}
        onOpenChange={setIsBottomSheetOpen}
        place={selectedPlaceForSheet}
      />
    </>
  );
}
