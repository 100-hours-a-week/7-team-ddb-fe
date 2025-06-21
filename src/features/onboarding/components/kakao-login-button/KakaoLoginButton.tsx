'use client';

import { NavArrowRight } from 'iconoir-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { getOAuthRedirectUrl } from '@/features/user';

export function KakaoLoginButton() {
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleRedirect = async () => {
      const { redirect_url } = await getOAuthRedirectUrl();
      setRedirectUrl(redirect_url);
    };
    handleRedirect();
  }, []);

  return (
    <button
      className="button-text flex w-full cursor-pointer items-center justify-center gap-2 px-4 py-2"
      onClick={() => {
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      }}
    >
      <div className="flex items-center gap-2">
        <Image src="/img/kakao-symbol.svg" alt="Kakao" width={40} height={40} />
        <span>로그인</span>
      </div>
      <NavArrowRight className="size-5" />
    </button>
  );
}
