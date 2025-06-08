'use client';

import { ChatPlusInSolid } from 'iconoir-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/shared/components';

export function WriteMomentFab() {
  const router = useRouter();

  return (
    <div className="mobile-width fixed bottom-23 z-20">
      <div className="flex w-full justify-end">
        <Button
          size="icon"
          className="mr-5 h-14 w-14 rounded-full bg-rose-300 shadow-lg hover:bg-rose-400"
          onClick={() => {
            router.push('/moments/new');
          }}
        >
          <ChatPlusInSolid className="size-6" />
        </Button>
      </div>
    </div>
  );
}
