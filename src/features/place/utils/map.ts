import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  MAX_LEVEL,
  MIN_LEVEL,
  RADIUS_OFFSET,
} from '../constants';
import { Place } from '../types';

export function initializeMap(
  mapContainer: HTMLElement,
  lat: number = DEFAULT_LATITUDE,
  lng: number = DEFAULT_LONGITUDE,
  onOutOfBounds?: () => void,
) {
  const latLng = new window.kakao.maps.LatLng(lat, lng);
  const mapOption = {
    center: latLng,
    level: 3,
    draggable: true,
  };
  const map = new window.kakao.maps.Map(mapContainer, mapOption);

  createUserLocationMarker(map, lat, lng);

  const bounds = createBounds(lat, lng);

  map.setMinLevel(MIN_LEVEL);
  map.setMaxLevel(MAX_LEVEL);

  const keepCenterIfOutOfBounds = () => {
    const center = map.getCenter();
    if (!isInBounds(bounds, center)) {
      map.setCenter(latLng);
      if (onOutOfBounds) onOutOfBounds();
    }
  };
  window.kakao.maps.event.addListener(map, 'dragend', keepCenterIfOutOfBounds);
  window.kakao.maps.event.addListener(
    map,
    'zoom_changed',
    keepCenterIfOutOfBounds,
  );

  map.setCenter(latLng);

  return map;
}

function createBounds(lat: number, lng: number) {
  return new window.kakao.maps.LatLngBounds(
    new window.kakao.maps.LatLng(lat - RADIUS_OFFSET, lng - RADIUS_OFFSET),
    new window.kakao.maps.LatLng(lat + RADIUS_OFFSET, lng + RADIUS_OFFSET),
  );
}

function isInBounds(
  bounds: kakao.maps.LatLngBounds,
  center: kakao.maps.LatLng,
) {
  return bounds.contain(center);
}

function createUserLocationMarker(
  map: kakao.maps.Map,
  lat: number,
  lng: number,
) {
  const latLng = new window.kakao.maps.LatLng(lat, lng);
  const imageSrc = '/img/user-location.png';
  const imageSize = new window.kakao.maps.Size(40, 40);
  const imageOptions = {
    offset: new window.kakao.maps.Point(0, 0),
  };

  const markerImage = new window.kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOptions,
  );

  const marker = new window.kakao.maps.Marker({
    position: latLng,
    image: markerImage,
  });

  marker.setMap(map);
}

let currentPlaceMarkers: kakao.maps.Marker[] = [];
let currentSelectedMarker: kakao.maps.Marker | null = null;
let currentClusterer: kakao.maps.MarkerClusterer | null = null;

/**
 * 지도에 있는 기존 장소 마커들과 클러스터러를 모두 제거합니다.
 */
function clearPlaceMarkers() {
  currentPlaceMarkers.forEach((marker) => marker.setMap(null));
  currentPlaceMarkers = [];
  currentSelectedMarker = null;

  if (currentClusterer) {
    currentClusterer.clear();
    currentClusterer = null;
  }
}

/**
 * 장소 목록을 받아 지도에 마커를 생성하고 클러스터러로 관리합니다.
 * @param map 표시할 kakao.maps.Map 객체
 * @param places 장소 정보 배열 (Place[])
 * @param onMarkerClick 마커 클릭 시 호출될 콜백 함수 (선택된 장소 정보를 인자로 받음)
 */
export function createPlaceMarkers(
  map: kakao.maps.Map,
  places: Place[],
  onMarkerClick?: (place: Place) => void,
) {
  const normalImageSrc = '/img/pin.png';
  const selectedImageSrc = '/img/pin-select.png';
  const imageSize = new window.kakao.maps.Size(35, 35);
  const imageOption = { offset: new window.kakao.maps.Point(15, 35) };

  const normalMarkerImage = new window.kakao.maps.MarkerImage(
    normalImageSrc,
    imageSize,
    imageOption,
  );
  const selectedMarkerImage = new window.kakao.maps.MarkerImage(
    selectedImageSrc,
    imageSize,
    imageOption,
  );

  clearPlaceMarkers();

  if (!places || places.length === 0) {
    return;
  }

  // 클러스터러 생성
  currentClusterer = new window.kakao.maps.MarkerClusterer({
    map: map,
    averageCenter: true,
    minLevel: 2,
    gridSize: 40,
    disableClickZoom: true,
    styles: [
      {
        width: '50px',
        height: '50px',
        background:
          'radial-gradient(circle, rgba(249, 206, 206, 0.9) 0%, rgba(249, 206, 206, 0.6) 70%, rgba(249, 206, 206, 0.2) 100%)',
        borderRadius: '50%',
        color: '#8B5A5A',
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: '50px',
        filter: 'blur(0.5px)',
      },
      {
        width: '60px',
        height: '60px',
        background:
          'radial-gradient(circle, rgba(249, 231, 231, 0.9) 0%, rgba(249, 231, 231, 0.6) 70%, rgba(249, 231, 231, 0.2) 100%)',
        borderRadius: '50%',
        color: '#8B5A5A',
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: '60px',
        filter: 'blur(0.5px)',
      },
      {
        width: '70px',
        height: '70px',
        background:
          'radial-gradient(circle, rgba(249, 156, 156, 0.9) 0%, rgba(249, 156, 156, 0.6) 70%, rgba(249, 156, 156, 0.2) 100%)',
        borderRadius: '50%',
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: '70px',
        filter: 'blur(0.5px)',
        boxShadow: '0 4px 12px rgba(249, 156, 156, 0.3)',
      },
    ],
  });

  const markers: kakao.maps.Marker[] = [];

  places.forEach((place) => {
    if (place.location && place.location.coordinates) {
      const [lng, lat] = place.location.coordinates;
      const markerPosition = new window.kakao.maps.LatLng(lat, lng);

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: normalMarkerImage,
        title: place.name,
      });

      window.kakao.maps.event.addListener(marker, 'mouseover', () => {
        if (marker !== currentSelectedMarker) {
          marker.setZIndex(10);
        }
      });

      window.kakao.maps.event.addListener(marker, 'mouseout', () => {
        if (marker !== currentSelectedMarker) {
          marker.setZIndex(1);
        }
      });

      window.kakao.maps.event.addListener(marker, 'click', () => {
        if (currentSelectedMarker && currentSelectedMarker !== marker) {
          currentSelectedMarker.setImage(normalMarkerImage);
          currentSelectedMarker.setZIndex(1);
        }

        marker.setImage(selectedMarkerImage);
        marker.setZIndex(10);
        currentSelectedMarker = marker;

        if (onMarkerClick) {
          onMarkerClick(place);
        }
      });

      markers.push(marker);
      currentPlaceMarkers.push(marker);
    } else {
      console.warn(
        '[map.ts createPlaceMarkers] Place missing location or coordinates:',
        place,
      );
    }
  });

  if (currentClusterer && markers.length > 0) {
    currentClusterer.addMarkers(markers);
  }

  if (currentClusterer) {
    window.kakao.maps.event.addListener(
      currentClusterer,
      'clusterclick',
      function (cluster: kakao.maps.Cluster) {
        const level = map.getLevel() - 1;
        map.setLevel(level, { anchor: cluster.getCenter() });
      },
    );
  }
}

export function resetSelectedMarker() {
  if (currentSelectedMarker) {
    const normalImageSrc = '/img/pin.png';
    const imageSize = new window.kakao.maps.Size(35, 35);
    const imageOption = { offset: new window.kakao.maps.Point(15, 35) };

    const normalMarkerImage = new window.kakao.maps.MarkerImage(
      normalImageSrc,
      imageSize,
      imageOption,
    );

    currentSelectedMarker.setImage(normalMarkerImage);
    currentSelectedMarker.setZIndex(1);
    currentSelectedMarker = null;
  }
}
