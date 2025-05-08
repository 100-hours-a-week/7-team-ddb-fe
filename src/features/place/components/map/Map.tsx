'use client';

import { useEffect } from 'react';

import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  initializeMap,
} from '../../utils';

import { loadKakaoMapScript } from '@/shared/lib/map';

export function Map() {
  useEffect(() => {
    loadKakaoMapScript(() => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const mapContainer = document.getElementById('map');
          if (mapContainer) {
            initializeMap(mapContainer, DEFAULT_LATITUDE, DEFAULT_LONGITUDE);
          } else {
            console.error('Map container element not found.');
          }
        });
      }
    });
  }, []);

  return (
    <div
      id="map"
      className="absolute inset-0 z-0 h-full w-full"
      style={{ minHeight: '100vh' }}
    />
  );
}
