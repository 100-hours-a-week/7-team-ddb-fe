import { ArrowUpIcon } from 'lucide-react';

import { Button } from '@/shared/components';

export function ScrollTopButton({
  show,
  onClick,
}: {
  show: boolean;
  onClick: () => void;
}) {
  return (
    show && (
      <Button
        onClick={onClick}
        className="fixed top-8 left-1/2 z-50 -translate-x-1/2 rounded-full bg-rose-200 text-sm text-stone-800 hover:bg-rose-300"
      >
        <ArrowUpIcon className="h-4 w-4" />
        <span>맨 위로 이동</span>
      </Button>
    )
  );
}
