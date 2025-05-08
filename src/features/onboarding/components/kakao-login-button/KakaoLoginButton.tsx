'use client';

import { NavArrowRight } from 'iconoir-react';
import Image from 'next/image';

export interface KakaoLoginButtonProps {
  redirectUrl: string;
}

export function KakaoLoginButton({ redirectUrl }: KakaoLoginButtonProps) {
  return (
    <button
      className="button-text flex w-full items-center justify-center gap-2 px-4 py-2"
      onClick={() => {
        console.log('redirectUrl', redirectUrl);
        window.location.href = redirectUrl;
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
