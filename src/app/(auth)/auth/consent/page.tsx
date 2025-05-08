'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { postAgreement } from '@/features/user';
import { Button, Card, Checkbox } from '@/shared/components';

export default function Consent() {
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
        locationAgreed: true,
        privacyAgreed: true,
      });

      router.push('/auth/signup');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="heading-1 mb-8 text-center">
        개인정보 수집 및 위치기반 서비스 동의
      </h1>

      <div className="space-y-6">
        <div>
          <Card className="p-6">
            <div className="scrollbar-hide h-[200px] overflow-y-auto pr-4">
              <h2 className="heading-2 mb-4">
                제1조 (개인정보 수집 항목 및 이용 목적)
              </h2>
              <p className="body-text mb-4">
                회사는 다음과 같은 개인정보를 수집하고 있습니다.
              </p>

              <div className="mb-6">
                <h3 className="heading-3 mb-2">1. 필수항목</h3>
                <ul className="body-text list-disc space-y-2 pl-6">
                  <li>이메일 주소: 회원식별 및 로그인</li>
                  <li>닉네임: 서비스 이용</li>
                  <li>프로필 이미지: 서비스 이용</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="heading-3 mb-2">2. 선택항목</h3>
                <ul className="body-text list-disc space-y-2 pl-6">
                  <li>관심사: 맞춤 서비스 제공</li>
                  <li>연령대: 맞춤 콘텐츠 제공</li>
                </ul>
              </div>
            </div>
          </Card>
          <div className="mt-4 flex items-center space-x-2">
            <Checkbox
              id="privacy"
              checked={privacyConsent}
              onCheckedChange={(checked) =>
                setPrivacyConsent(checked as boolean)
              }
            />
            <label htmlFor="privacy" className="body-text">
              [필수] 개인정보 수집 및 이용 동의
            </label>
          </div>
        </div>

        <div>
          <Card className="p-6">
            <div className="scrollbar-hide h-[200px] overflow-y-auto pr-4">
              <h2 className="heading-2 mb-4">위치기반 서비스 이용 약관</h2>

              <div className="mb-6">
                <h3 className="heading-3 mb-2">제1조 (목적)</h3>
                <p className="body-text">
                  본 약관은 서비스의 위치기반 서비스 제공에 관한 사항을
                  규정합니다.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="heading-3 mb-2">제2조 (위치정보 수집 방법)</h3>
                <ul className="body-text list-disc space-y-2 pl-6">
                  <li>GPS: 사용자 단말기의 위치정보</li>
                  <li>Wi-Fi: 무선망을 통한 위치정보</li>
                  <li>기지국: 이동통신 기지국 위치정보</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="heading-3 mb-2">제3조 (위치정보 이용목적)</h3>
                <ul className="body-text list-disc space-y-2 pl-6">
                  <li>현재 위치 기반 장소 추천 서비스 제공</li>
                  <li>위치 기반 맞춤 콘텐츠 제공</li>
                </ul>
              </div>
            </div>
          </Card>
          <div className="mt-4 flex items-center space-x-2">
            <Checkbox
              id="location"
              checked={locationConsent}
              onCheckedChange={(checked) =>
                setLocationConsent(checked as boolean)
              }
            />
            <label htmlFor="location" className="body-text">
              [필수] 위치기반 서비스 이용 약관 동의
            </label>
          </div>
        </div>

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
