'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h2 className="heading-1">문제가 발생했습니다 😢</h2>
      <p className="text-gray-600">
        {error.message || '잠시 후 다시 시도해주세요.'}
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-rose-200 px-4 py-2 hover:bg-rose-300"
      >
        다시 시도
      </button>
    </div>
  );
}
