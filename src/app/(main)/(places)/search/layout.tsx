import { Metadata } from 'next';
import { Suspense } from 'react';

import { SearchResultBar } from '@/features/place';

export const metadata: Metadata = {
  title: 'Dolpin | 장소 검색',
  description:
    'AI가 추천하는 맞춤 장소를 검색해보세요. 카테고리별, 지역별로 원하는 장소를 쉽게 찾을 수 있습니다.',
  keywords:
    '장소 검색, AI 추천, 맛집 찾기, 카페 검색, 데이트 코스, 여행지 추천',
  openGraph: {
    title: 'Dolpin | 장소 검색',
    description: 'AI가 추천하는 맞춤 장소를 검색해보세요.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/search`,
    images: [
      {
        url: '/img/openGraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Dolpin 장소 검색',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dolpin | 장소 검색',
    description: 'AI가 추천하는 맞춤 장소를 검색해보세요.',
    images: ['/img/openGraph.jpg'],
  },
};

export default function PlacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col">
      <Suspense>
        <div className="absolute top-0 left-0 z-40 flex w-full flex-col gap-5">
          <SearchResultBar />
        </div>
      </Suspense>
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-center text-gray-500">로딩중...</div>
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
