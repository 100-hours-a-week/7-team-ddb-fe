export function loadKakaoMapScript(onLoad: () => void) {
  if (document.getElementById('kakao-map-sdk')) {
    onLoad();
    return;
  }

  const script = document.createElement('script');
  script.id = 'kakao-map-sdk';
  script.async = true;
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&libraries=services&autoload=false`;
  script.addEventListener('load', onLoad);
  document.head.appendChild(script);
}
