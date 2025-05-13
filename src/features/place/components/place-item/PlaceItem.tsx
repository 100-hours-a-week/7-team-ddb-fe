'use client';

import { useRouter } from 'next/navigation';

import { KeywordList } from '../keyword-list';

export interface PlaceItemProps {
  id: number;
  name: string;
  thumbnail: string;
  keywords: string[];
  isClickable?: boolean;
  isDetailButton?: boolean;
}

export function PlaceItem({
  id,
  name,
  thumbnail,
  keywords,
  isClickable,
  isDetailButton,
}: PlaceItemProps) {
  const router = useRouter();
  const handleDetailClick = () => {
    router.push(`/places/${id}`);
  };

  return (
    <div className="flex flex-col">
      <div
        className={`flex gap-4 ${isClickable ? 'cursor-pointer' : ''}`}
        onClick={isClickable ? handleDetailClick : undefined}
      >
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt="장소 이미지"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gray-200">
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center text-gray-500">이미지 없음</div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="heading-3">{name}</div>
          <KeywordList keywords={keywords} />
        </div>
      </div>
      {isDetailButton && (
        <button
          onClick={handleDetailClick}
          className="bg-primary hover:bg-primary/90 focus:ring-primary/50 mt-6 w-full rounded-lg px-4 py-3 text-center text-sm font-medium text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          장소 상세보기
        </button>
      )}
    </div>
  );
}
