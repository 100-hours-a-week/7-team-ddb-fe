'use client';

import { Suspense } from 'react';

import { NewMomentForm } from '@/features/community';
import { FullScreenMessage } from '@/shared/components';

export default function NewMomentPage() {
  return (
    <Suspense fallback={<FullScreenMessage message="로딩중..." />}>
      <NewMomentForm />
    </Suspense>
  );
}
