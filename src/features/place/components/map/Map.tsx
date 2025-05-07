'use client';

import { useEffect } from 'react';

import { initializeMap } from '../../utils';

import { loadKakaoMapScript } from '@/shared/lib/map';

export function Map() {
  useEffect(() => {
    loadKakaoMapScript(() => {
      window.kakao.maps.load(() => {
        if (!navigator.geolocation) {
          console.error('이 브라우저에서는 위치 정보를 지원하지 않습니다.');
          return;
        }
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const mapContainer = document.getElementById('map');
            if (mapContainer) {
              initializeMap(mapContainer, latitude, longitude);
            }
          },
          (error) => {
            console.error('위치 정보를 가져오는데 실패했습니다:', error);
          },
        );
      });
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
