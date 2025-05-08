import { redirect } from 'next/navigation';

import { issueAuthTokens } from '@/features/user';

interface KakaoCallbackPageProps {
  searchParams: {
    code?: string;
    error?: string;
    error_description?: string;
  };
}

export default async function KakaoCallbackPage({
  searchParams,
}: KakaoCallbackPageProps) {
  const { code, error, error_description } = searchParams;

  console.log('callback page');

  if (error) {
    console.error(`Kakao OAuth Error: ${error} - ${error_description}`);
    redirect('/onboarding');
  }

  if (!code) {
    console.error('Kakao OAuth: Authorization code not found in callback.');
    redirect('/onboarding');
  }

  const response = await issueAuthTokens({ authorizationCode: code });

  console.log('response', response);

  if (!response.user.profileCompleted) {
    redirect('/auth/consent');
  } else {
    redirect('/');
  }

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
      <h1>카카오 로그인 처리 중</h1>
    </div>
  );
}
