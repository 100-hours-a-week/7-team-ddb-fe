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
  onOutOfBounds?: (
    map: kakao.maps.Map,
    latLng: kakao.maps.LatLng,
    bounds: kakao.maps.LatLngBounds,
  ) => void,
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
      if (onOutOfBounds) onOutOfBounds(map, latLng, bounds);
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

/**
 * 지도에 있는 기존 장소 마커들을 모두 제거합니다.
 */
function clearPlaceMarkers() {
  currentPlaceMarkers.forEach((marker) => marker.setMap(null));
  currentPlaceMarkers = [];
  currentSelectedMarker = null;
}

/**
 * 장소 목록을 받아 지도에 마커를 생성하고 표시합니다.
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
  const imageSize = new window.kakao.maps.Size(45, 45);
  const imageOption = { offset: new window.kakao.maps.Point(20, 45) };

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

  places.forEach((place) => {
    if (place.location && place.location.coordinates) {
      const [lng, lat] = place.location.coordinates;
      const markerPosition = new window.kakao.maps.LatLng(lat, lng);

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: normalMarkerImage,
        title: place.name,
      });

      marker.setMap(map);
      currentPlaceMarkers.push(marker);

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
    } else {
      console.warn(
        '[map.ts createPlaceMarkers] Place missing location or coordinates:',
        place,
      );
    }
  });
}

export function resetSelectedMarker() {
  if (currentSelectedMarker) {
    const normalImageSrc = '/img/pin.png';
    const imageSize = new window.kakao.maps.Size(45, 45);
    const imageOption = { offset: new window.kakao.maps.Point(20, 45) };

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
