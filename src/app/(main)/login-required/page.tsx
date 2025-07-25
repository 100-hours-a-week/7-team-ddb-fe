'use client';

import { ArrowLeft, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginRequiredPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  const handleGoToLogin = () => {
    router.push('/onboarding');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div
        className={`w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl transition-all duration-700 ease-out ${
          isVisible
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-8 scale-95 opacity-0'
        }`}
      >
        <div className="mx-auto mb-6 flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-red-100">
          <Lock className="h-8 w-8 text-red-500" />
        </div>
        <h1 className="mb-3 text-2xl font-bold text-gray-900">
          로그인이 필요한 페이지입니다
        </h1>
        <p className="mb-8 leading-relaxed text-gray-600">
          이 페이지를 이용하려면 로그인이 필요합니다.
          <br />
          로그인하시면 더 많은 기능을 이용하실 수 있습니다.
        </p>
        <div className="space-y-4">
          <button
            onClick={handleGoToLogin}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-rose-200 px-6 py-3 font-medium text-gray-700 transition-all duration-200 hover:scale-105 hover:bg-rose-300 hover:shadow-lg"
          >
            로그인 하러가기
          </button>
          <button
            onClick={handleGoBack}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-200 hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
            뒤로가기
          </button>
        </div>
        <div className="mt-6 text-xs text-gray-500">
          <p className="my-4">
            로그인하면 다음과 같은 기능을 이용할 수 있습니다:
          </p>
          <ul className="mt-2 space-y-2 text-left">
            <li>• 나만의 추억 작성하기</li>
            <li>• 맛집 즐겨찾기</li>
            <li>• 다른 사용자와 소통하기</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
