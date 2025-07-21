import { Suspense } from 'react';

import { MomentEditSkeleton, NewMomentForm } from '@/features/community';

export default function NewMomentPage() {
  return (
    <Suspense fallback={<MomentEditSkeleton />}>
      <NewMomentForm />
    </Suspense>
  );
}
