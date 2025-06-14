import { cookies } from 'next/headers';

import {
  AuthorInfo,
  CommentSection,
  getComments,
  getMomentById,
  INFINITE_SCROLL,
  MomentDetailContent,
  MomentDetailOwnerDropdown,
  MomentImageSlider,
} from '@/features/community';
import { FullScreenMessage, Header } from '@/shared/components';

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

  const { author, createdAt, images, content, place, isOwner } = moment;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="mobile-width fixed top-0 z-10 flex">
        <Header showBackButton />
      </div>
      <div id="comment-scroll-container" className="flex-1 overflow-y-scroll">
        <div className="mx-auto mb-22 p-4 px-7 pt-20">
          <div className="flex items-center justify-between">
            <AuthorInfo user={author} writtenAt={createdAt} />
            {isOwner && <MomentDetailOwnerDropdown momentId={moment.id} />}
          </div>
          <MomentImageSlider images={images} />
          <MomentDetailContent content={content} place={place} />
          <CommentSection momentId={Number(id)} initialComments={comments} />
        </div>
      </div>
    </div>
  );
}
