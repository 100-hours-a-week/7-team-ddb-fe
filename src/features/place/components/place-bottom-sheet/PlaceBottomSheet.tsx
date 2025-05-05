'use client';

import { Bookmark, BookmarkSolid } from 'iconoir-react';
import { useRouter } from 'next/navigation';
import { Drawer } from 'vaul';

import { KeywordList } from '../keyword-list';

interface PlaceBottomSheetProps {
  isOpen: boolean;
  isBookmarked: boolean;
  onOpenChange: (open: boolean) => void;
  onBookmarkClick: () => void;
}

export function PlaceBottomSheet({
  isOpen,
  isBookmarked,
  onOpenChange,
  onBookmarkClick,
}: PlaceBottomSheetProps) {
  const router = useRouter();

  const handleDetailClick = () => {
    router.push('/places/1');
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-10 bg-black/40" />
        <Drawer.Content className="fixed right-0 bottom-0 left-0 z-100 mx-auto flex h-fit w-full max-w-[430px] flex-col rounded-t-[10px] bg-gray-100 outline-none">
          <div className="flex-1 rounded-t-[10px] bg-white p-4">
            <div className="mx-auto mb-3 h-1.5 w-12 flex-shrink-0 rounded-full" />
            <div className="mx-auto max-w-md">
              <div className="relative">
                <button
                  onClick={onBookmarkClick}
                  className="absolute -top-2 -right-2 rounded-full p-2 hover:bg-gray-100"
                >
                  {isBookmarked ? (
                    <BookmarkSolid className="text-primary h-6 w-6" />
                  ) : (
                    <Bookmark className="h-6 w-6 text-gray-400" />
                  )}
                </button>
                <div className="flex gap-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src="https://images.unsplash.com/photo-1575936123452-b67c3203c357"
                      alt="장소 이미지"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Drawer.Title className="text-lg font-medium text-gray-900">
                      경복궁
                    </Drawer.Title>
                    <Drawer.Description className="sr-only">
                      장소 정보를 확인할 수 있는 드로어입니다.
                    </Drawer.Description>
                    <KeywordList keywords={['유물', '조용한', '한적한']} />
                  </div>
                </div>
                <button
                  onClick={handleDetailClick}
                  className="bg-primary hover:bg-primary/90 focus:ring-primary/50 mt-6 w-full rounded-lg px-4 py-3 text-center text-sm font-medium text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
                >
                  장소 상세보기
                </button>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
