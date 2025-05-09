import { Suspense } from 'react';

import {
  DolpinLogo,
  KakaoLoginButton,
  OnboardingSlider,
  slides,
} from '@/features/onboarding';

export default async function Onboarding() {
  return (
    <div className="relative min-h-screen bg-white">
      <div className="absolute top-0 left-2 z-10">
        <DolpinLogo />
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center pt-20">
        <OnboardingSlider slides={slides} />
        <div className="mt-8 w-full max-w-md px-4">
          <Suspense>
            <KakaoLoginButton />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
