import {
  AuthorInfo,
  CommentSection,
  dummyMomentDetail,
  MomentDetailContent,
  MomentDetailOwnerDropdown,
  MomentImageSlider,
} from '@/features/community';
import { FullScreenMessage, Header } from '@/shared/components';

export interface MomentDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MomentDetailPage() {
  const moment = dummyMomentDetail;

  if (!moment) {
    return <FullScreenMessage message="존재하지 않는 기록 id 입니다." />;
  }

  const { author, createdAt, images, content, place, isOwner } = moment;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="mobile-width fixed top-0 z-10 flex">
        <Header showBackButton />
      </div>
      <div className="flex-1 overflow-y-scroll">
        <div className="mx-auto mb-4 p-4 px-7 pt-20 pb-22">
          <div className="flex items-center justify-between">
            <AuthorInfo user={author} writtenAt={createdAt} />
            {isOwner && <MomentDetailOwnerDropdown momentId={moment.id} />}
          </div>
          <MomentImageSlider images={images} />
          <MomentDetailContent content={content} place={place} />
          <CommentSection />
        </div>
      </div>
    </div>
  );
}
