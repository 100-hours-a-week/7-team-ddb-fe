import { Loader2 } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

export interface LoadingSpinnerProps {
  className?: string;
}

export function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <Loader2
      className={cn('mx-auto h-10 w-10 animate-spin text-rose-200', className)}
    />
  );
}
