const RADIUS_OFFSET = 0.005; // 약 1km
export const MIN_LEVEL = 1;
export const MAX_LEVEL = 3;

export function initializeMap(
  mapContainer: HTMLElement,
  lat: number,
  lng: number,
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

  new window.kakao.maps.Marker({ position: latLng }).setMap(map);

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
