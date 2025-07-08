'use client';

import { useMomentScrollStore } from '../../stores';
import { MomentListType } from '../../types';
import { MomentList } from '../moment-list';
import { ScrollTopButton } from '../scroll-top-button';
import { WriteMomentFab } from '../write-moment-fab';

import { useScrollRestoration } from '@/shared/hooks';

export interface MomentsClientProps {
  initialMoments: MomentListType;
}

export function MomentsClient({ initialMoments }: MomentsClientProps) {
  const { scrollY, setScrollY } = useMomentScrollStore();

  const { scrollContainerRef, handleScroll, scrollToTop, showScrollTopButton } =
    useScrollRestoration({
      isOpen: true,
      persistedScrollY: scrollY,
      setPersistedScrollY: setScrollY,
    });

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className="h-full overflow-y-auto pb-22"
    >
      <ScrollTopButton show={showScrollTopButton} onClick={scrollToTop} />
      <MomentList initialMoments={initialMoments} type="all" />
      <WriteMomentFab />
    </div>
  );
}
