import { Suspense } from 'react';

import { SearchResultBar } from '@/features/place';

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
