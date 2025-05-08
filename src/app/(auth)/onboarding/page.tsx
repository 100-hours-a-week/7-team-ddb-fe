import {
  DolpinLogo,
  KakaoLoginButton,
  OnboardingSlider,
  slides,
} from '@/features/onboarding';
import { getOAuthRedirectUrl } from '@/features/user';

export default async function Onboarding() {
  const { redirect_url } = await getOAuthRedirectUrl();

  return (
    <div className="relative min-h-screen bg-white">
      <div className="absolute top-0 left-2 z-10">
        <DolpinLogo />
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center pt-20">
        <OnboardingSlider slides={slides} />
        <div className="mt-8 w-full max-w-md px-4">
          <KakaoLoginButton redirectUrl={redirect_url} />
        </div>
      </div>
    </div>
  );
}
