import type { Metadata } from 'next';

import { Toaster } from '@/shared/components';
import { pretendard } from '@/shared/fonts';
import { QueryProvider } from '@/shared/providers';

import './globals.css';

export const metadata: Metadata = {
  title: 'Dolpin | AI 기반 맞춤 장소 추천',
  description:
    '당신의 취향을 이해하는 AI 장소 추천 서비스, 돌핀과 함께 특별한 장소를 발견하세요.',
  keywords: 'AI 추천, 장소 추천, 맞춤 여행, 데이트 코스, 맛집 추천',
  openGraph: {
    title: 'Dolpin | AI 기반 맞춤 장소 추천',
    description: '당신의 취향을 이해하는 AI 장소 추천 서비스',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable}`}>
        <QueryProvider>
          <div className="mobile-container relative">
            <main className="h-full w-full">
              {children}
              <Toaster />
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
