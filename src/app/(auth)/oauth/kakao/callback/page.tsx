import { Suspense } from 'react';

import KakaoCallbackClient from './KakaoCallbackClient';

export default function KakaoCallbackPage() {
  const fallbackUI = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100svh',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <h1>페이지를 준비하고 있습니다...</h1>
      <p>잠시 후 카카오 로그인 처리가 시작됩니다.</p>
    </div>
  );

  return (
    <Suspense fallback={fallbackUI}>
      <KakaoCallbackClient />
    </Suspense>
  );
}
