import { Suspense } from 'react';

export default function PlacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Suspense fallback={<div>페이지 로딩 중...</div>}>{children}</Suspense>
    </div>
  );
}
