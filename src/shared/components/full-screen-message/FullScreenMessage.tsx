import { cn } from '@/shared/lib/utils';

export interface FullScreenMessageProps {
  message: string;
  className?: string;
}

export function FullScreenMessage({
  message,
  className = '',
}: FullScreenMessageProps) {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center',
        className,
      )}
    >
      <div className="text-center text-gray-500">{message}</div>
    </div>
  );
}
