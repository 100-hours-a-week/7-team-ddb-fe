import { ConsentCard } from './ConsentCard';

export const LocationConsent = ({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) => (
  <ConsentCard
    title="위치기반 서비스 이용 약관"
    checked={checked}
    onCheckedChange={onCheckedChange}
    label="[필수] 위치기반 서비스 이용 약관 동의"
  >
    <div className="mb-6">
      <h3 className="heading-3 mb-2">제1조 (목적)</h3>
      <p className="body-text">
        본 약관은 서비스의 위치기반 서비스 제공에 관한 사항을 규정합니다.
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
  </ConsentCard>
);
