'use client';

import { LocationConsent, PrivacyConsent, useConsent } from '@/features/user';
import { Button, Checkbox } from '@/shared/components';

export default function ConsentPage() {
  const {
    privacyConsent,
    locationConsent,
    handleAllConsent,
    handleAgreement,
    setPrivacyConsent,
    setLocationConsent,
  } = useConsent();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="heading-1 mb-8 text-center">
        개인정보 수집 및 위치기반 서비스 동의
      </h1>

      <div className="space-y-6">
        <PrivacyConsent
          checked={privacyConsent}
          onCheckedChange={setPrivacyConsent}
        />
        <LocationConsent
          checked={locationConsent}
          onCheckedChange={setLocationConsent}
        />
        <div className="flex items-center space-x-2">
          <Checkbox
            id="all"
            checked={privacyConsent && locationConsent}
            onCheckedChange={handleAllConsent}
          />
          <label htmlFor="all" className="body-text">
            모두 동의
          </label>
        </div>
      </div>

      <Button
        className="button-text mt-6 w-full"
        disabled={!(privacyConsent && locationConsent)}
        onClick={handleAgreement}
      >
        다음
      </Button>
    </div>
  );
}
