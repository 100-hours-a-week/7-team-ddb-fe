'use client';

import { useRouter } from 'next/navigation';

import { CommentListType, MomentDetail } from '../../types';

import {
  AuthorInfo,
  CommentSection,
  MomentDetailContent,
  MomentDetailOwnerDropdown,
  MomentImageSlider,
} from '@/features/community';
import { Header } from '@/shared/components';
import { useNavigationStore } from '@/shared/store';

interface MomentDetailClientProps {
  moment: MomentDetail;
  comments: CommentListType;
}

export function MomentDetailClient({
  moment,
  comments,
}: MomentDetailClientProps) {
  const router = useRouter();
  const { previousPath, setPreviousPath } = useNavigationStore();

  const { title, author, createdAt, images, content, place, isOwner } = moment;

  const handleBackClick = () => {
    if (previousPath) {
      router.replace(previousPath);
      setPreviousPath(null);
    } else {
      router.back();
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="mobile-width fixed top-0 z-10 flex">
        <Header showBackButton onBackClick={handleBackClick} />
      </div>
      <div id="comment-scroll-container" className="flex-1 overflow-y-scroll">
        <div className="mx-auto mb-22 p-4 px-7 pt-20">
          <div className="flex items-center justify-between">
            <AuthorInfo user={author} writtenAt={createdAt} />
            {isOwner && <MomentDetailOwnerDropdown momentId={moment.id} />}
          </div>
          <h1 className="heading-2 my-4">{title}</h1>
          <MomentImageSlider images={images} />
          <MomentDetailContent content={content} place={place} />
          <CommentSection momentId={moment.id} initialComments={comments} />
        </div>
      </div>
    </div>
  );
}
