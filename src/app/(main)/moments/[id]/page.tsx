import { cookies } from 'next/headers';

import {
  getComments,
  getMomentById,
  INFINITE_SCROLL,
  MomentDetailClient,
} from '@/features/community';
import { FullScreenMessage } from '@/shared/components';

export interface MomentDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MomentDetailPage({
  params,
}: MomentDetailPageProps) {
  const { id } = await params;
  const cookie = (await cookies()).toString();
  const moment = await getMomentById(Number(id), cookie);
  const comments = await getComments({
    limit: INFINITE_SCROLL.COMMENTS_PER_PAGE,
    cursor: null,
    momentId: Number(id),
    cookie,
  });

  if (!moment) {
    return <FullScreenMessage message="존재하지 않는 기록 id 입니다." />;
  }

  return <MomentDetailClient moment={moment} comments={comments} />;
}
