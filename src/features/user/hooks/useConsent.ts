import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { postAgreement } from '../api';

export const useConsent = () => {
  const router = useRouter();
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [locationConsent, setLocationConsent] = useState(false);

  const handleAllConsent = () => {
    const newValue = !(privacyConsent && locationConsent);
    setPrivacyConsent(newValue);
    setLocationConsent(newValue);
  };

  const handleAgreement = async () => {
    try {
      await postAgreement({
        location_agreed: true,
        privacy_agreed: true,
      });

      router.push('/auth/signup');
    } catch (error) {
      console.error(error);
    }
  };

  return {
    privacyConsent,
    setPrivacyConsent,
    locationConsent,
    setLocationConsent,
    handleAllConsent,
    handleAgreement,
  };
};
