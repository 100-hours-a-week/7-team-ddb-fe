'use client';

import { useEffect, useState } from 'react';

import { getMoments } from '../../api';
import { INFINITE_SCROLL } from '../../constants';
import { MomentListType } from '../../types';
import { MomentList } from '../moment-list';

export interface PlaceMomentSectionProps {
  placeId: number;
}

export function PlaceMomentSection({ placeId }: PlaceMomentSectionProps) {
  const [initialMoments, setInitialMoments] = useState<MomentListType | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchInitialMoments() {
      try {
        setIsLoading(true);
        const momentsData = await getMoments({
          limit: INFINITE_SCROLL.MOMENTS_PER_PAGE,
          cursor: null,
          type: 'place',
          placeId,
        });
        setInitialMoments(momentsData);
      } catch (error) {
        console.error('Failed to fetch moments:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchInitialMoments();
  }, [placeId]);

  if (isLoading) {
    return (
      <div className="my-10 flex h-full flex-col items-center justify-center gap-2">
        <div className="body-text text-gray-500">
          방문 기록을 불러오는 중입니다.
        </div>
      </div>
    );
  }

  return (
    <div className="my-6 w-full">
      <h2 className="heading-2 mb-4">방문 기록</h2>
      {initialMoments && initialMoments.items.length > 0 ? (
        <MomentList
          type="place"
          placeId={placeId}
          initialMoments={initialMoments}
        />
      ) : (
        <div className="my-10 flex h-full flex-col items-center justify-center gap-2">
          <p className="body-text text-gray-500">기록이 없습니다.</p>
          <p className="body-text text-gray-500">첫 번째 기록을 남겨보세요!</p>
        </div>
      )}
    </div>
  );
}
