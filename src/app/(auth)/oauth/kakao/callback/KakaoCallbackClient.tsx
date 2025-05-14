'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { issueAuthTokens } from '@/features/user';

export default function KakaoCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const error_description = searchParams.get('error_description');

  useEffect(() => {
    async function handleCallback() {
      if (error) {
        console.error(`Kakao OAuth Error: ${error} - ${error_description}`);
        router.push('/onboarding');
        return;
      }

      if (!code) {
        console.error('Kakao OAuth: Authorization code not found in callback.');
        router.push('/onboarding');
        return;
      }

      try {
        const response = await issueAuthTokens({ authorization_code: code });

        if (!response || !response.user) {
          console.error('issueAuthTokens 응답에 user 객체 없음', response);
          router.push('/onboarding');
          return;
        }

        if (!response.user.profile_completed) {
          router.push('/auth/consent');
        } else {
          router.push('/');
        }
      } catch (err) {
        console.error('Failed to issue auth tokens:', err);
        router.push('/onboarding');
      }
    }

    handleCallback();
  }, [code, error, error_description, router]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <h1>카카오 로그인 처리 중...</h1>
      <p>잠시만 기다려주세요.</p>
    </div>
  );
}
