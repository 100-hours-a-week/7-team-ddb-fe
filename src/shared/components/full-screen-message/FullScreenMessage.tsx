import Image from 'next/image';

import { cn } from '@/shared/lib/utils';

export interface FullScreenMessageProps {
  message: string;
  image?: string;
  className?: string;
}

export function FullScreenMessage({
  message,
  image,
  className = '',
}: FullScreenMessageProps) {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center',
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center">
        {image && <Image src={image} alt="loading" width={100} height={100} />}
        <div className="text-center text-gray-500">{message}</div>
      </div>
    </div>
  );
}
