import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';

import {
  BackgroundPanel,
  DynamicComponents,
  FeedbackButton,
} from '@/shared/components';
import { QueryProvider } from '@/shared/providers';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://dolpin.site',
  ),
  title: 'Dolpin | AI 기반 맞춤 장소 추천',
  description:
    '당신의 취향을 이해하는 AI 장소 추천 서비스, 돌핀과 함께 특별한 장소를 발견하세요.',
  keywords: 'AI 추천, 장소 추천, 맞춤 여행, 데이트 코스, 맛집 추천',
  openGraph: {
    title: 'Dolpin | AI 기반 맞춤 장소 추천',
    description: '당신의 취향을 이해하는 AI 장소 추천 서비스',
    url: 'https://dolpin.site',
    siteName: 'Dolpin',
    images: [
      {
        url: '/img/openGraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Dolpin - AI 기반 맞춤 장소 추천 서비스',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dolpin | AI 기반 맞춤 장소 추천',
    description: '당신의 취향을 이해하는 AI 장소 추천 서비스',
    images: ['/img/openGraph.jpg'],
  },
  verification: {
    google: 'JnkkxA-f1hxZtGmv4ZR1dEVvLqyqQ4ODw5m-If-EK80',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <BackgroundPanel />
          <div className="mobile-container relative">
            <main className="h-full w-full">
              {children}
              <DynamicComponents />
            </main>
          </div>
        </QueryProvider>
        <FeedbackButton />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ''} />
    </html>
  );
}
