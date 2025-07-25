import { Metadata } from 'next';
import { cookies } from 'next/headers';

import {
  getMoments,
  INFINITE_SCROLL,
  MomentsClient,
} from '@/features/community';

export const metadata: Metadata = {
  title: 'Dolpin | 기록',
  description:
    '사용자들이 공유한 특별한 장소의 기록들을 둘러보세요. AI가 추천하는 맞춤 장소와 실제 경험담을 함께 확인할 수 있습니다.',
  keywords:
    '장소 기록, 여행 후기, 맛집 리뷰, 데이트 코스, 장소 추천, 실제 경험담',
};

export default async function Moments() {
  const cookie = (await cookies()).toString();
  const moments = await getMoments({
    limit: INFINITE_SCROLL.MOMENTS_PER_PAGE,
    cursor: null,
    type: 'all',
    cookie,
  });

  return <MomentsClient initialMoments={moments} />;
}
