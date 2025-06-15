'use client';

import { getMoments } from '../../api';
import { useInfiniteScroll } from '../../hooks';

import { MomentItem } from './MomentItem';

import {
  MomentItemType,
  MomentListType,
  MomentType,
} from '@/features/community/types';
import { FullScreenMessage, LoadingSpinner } from '@/shared/components';

export interface MomentListProps {
  type: MomentType;
  initialMoments: MomentListType;
  userId?: number;
  placeId?: number;
}

export function MomentList({
  type,
  initialMoments,
  userId,
  placeId,
}: MomentListProps) {
  const { items, isLoading, hasError, targetRef } =
    useInfiniteScroll<MomentItemType>({
      initialData: initialMoments,
      fetchMore: async ({ limit, cursor }) => {
        const newData = await getMoments({
          limit,
          cursor,
          type,
          userId,
          placeId,
        });
        return newData;
      },
    });

  return (
    <div className="flex flex-col gap-2">
      {items.map((moment) => (
        <MomentItem moment={moment} key={moment.id} />
      ))}
      <div ref={targetRef} />
      {isLoading && <LoadingSpinner className="h-24" />}
      {hasError && <FullScreenMessage message="데이터 로드에 실패했습니다." />}
    </div>
  );
}
