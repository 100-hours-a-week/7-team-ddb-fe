'use client';

import { ChatPlusInSolid } from 'iconoir-react';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/shared/components';
import { useNavigationStore } from '@/shared/store';

interface WriteMomentFabProps {
  place?: {
    id: number;
    name: string;
  };
}

export function WriteMomentFab({ place }: WriteMomentFabProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { setPreviousPath } = useNavigationStore();

  const handleClick = () => {
    setPreviousPath(pathname);
    router.push(
      place
        ? `/moments/new?placeId=${place.id}&placeName=${place.name}`
        : '/moments/new',
    );
  };

  return (
    <div className="mobile-width fixed bottom-23 z-20">
      <div className="flex w-full justify-end">
        <Button
          size="icon"
          aria-label="write moment"
          className="mr-5 h-14 w-14 rounded-full bg-rose-300 shadow-lg hover:bg-rose-400"
          onClick={handleClick}
        >
          <ChatPlusInSolid className="size-6" />
        </Button>
      </div>
    </div>
  );
}
