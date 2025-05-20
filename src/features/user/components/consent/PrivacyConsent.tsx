import { ConsentCard } from './ConsentCard';

export const PrivacyConsent = ({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) => (
  <ConsentCard
    title="제1조 (개인정보 수집 항목 및 이용 목적)"
    checked={checked}
    onCheckedChange={onCheckedChange}
    label="[필수] 개인정보 수집 및 이용 동의"
  >
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
  </ConsentCard>
);
