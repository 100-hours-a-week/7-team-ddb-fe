import { Suspense } from 'react';

import KakaoCallbackClient from './KakaoCallbackClient'; // 방금 만든 클라이언트 컴포넌트

export default function KakaoCallbackPage() {
  // 이 페이지 컴포넌트는 서버 컴포넌트(기본값)가 됩니다.
  // 여기서는 'use client'를 사용하지 않습니다.

  // Suspense의 fallback UI는 로딩 중에 보여줄 내용입니다.
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
