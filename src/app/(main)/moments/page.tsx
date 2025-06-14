import { cookies } from 'next/headers';

import {
  getMoments,
  INFINITE_SCROLL,
  MomentList,
  WriteMomentFab,
} from '@/features/community';

export default async function Moments() {
  const cookie = (await cookies()).toString();
  const moments = await getMoments({
    limit: INFINITE_SCROLL.MOMENTS_PER_PAGE,
    cursor: null,
    type: 'all',
    cookie,
  });

  return (
    <div className="h-full overflow-y-auto pb-22">
      <MomentList initialMoments={moments} type="all" />
      <WriteMomentFab />
    </div>
  );
}
