'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { PlaceItemType } from '../../types';
import { BookmarkButton } from '../bookmark-button';
import { KeywordList } from '../keyword-list';

import { Button } from '@/shared/components';

export interface PlaceItemProps {
  place: PlaceItemType;
  isClickable?: boolean;
  isDetailButton?: boolean;
}

export function PlaceItem({
  place,
  isClickable,
  isDetailButton,
}: PlaceItemProps) {
  const router = useRouter();
  const { id, name, thumbnail, keywords, is_bookmarked } = place;

  const handleDetailClick = () => {
    router.push(`/places/${id}`);
  };

  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-between">
        <div
          className={`flex w-full gap-4 ${isClickable ? 'cursor-pointer' : ''}`}
          onClick={isClickable ? handleDetailClick : undefined}
        >
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt="장소 이미지"
                className="h-full w-full object-cover"
                fill
              />
            ) : (
              <div className="h-full w-full bg-gray-200">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-center text-gray-500">이미지 없음</div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="heading-3">{name}</div>
            <KeywordList keywords={keywords} />
          </div>
        </div>
        <BookmarkButton
          placeId={id}
          initialIsBookmarked={is_bookmarked}
          className="mr-4"
        />
      </div>
      {isDetailButton && (
        <Button
          onClick={handleDetailClick}
          className="bg-primary mt-4 h-11 w-full rounded-lg text-center text-sm font-medium text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          장소 상세보기
        </Button>
      )}
    </div>
  );
}
