import { Suspense } from 'react';

export default function PlacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col">
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
