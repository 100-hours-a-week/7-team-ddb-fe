import { Switch } from '@/shared/components';
import { cn } from '@/shared/lib/utils';

interface HeaderVisibilityToggleProps {
  isPublic: boolean;
  onToggle: (checked: boolean) => void;
}

export function HeaderVisibilityToggle({
  isPublic,
  onToggle,
}: HeaderVisibilityToggleProps) {
  return (
    <div className="relative inline-flex items-center">
      <Switch
        checked={isPublic}
        onCheckedChange={onToggle}
        className={cn(
          'peer bg-muted relative h-8 w-20 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors',
          'data-[state=checked]:bg-neutral-500',
          '[&>span]:hidden',
        )}
      />

      <span
        className={cn(
          'pointer-events-none absolute top-1 left-1 z-10 h-6 w-6 rounded-full bg-white transition-transform',
          isPublic ? 'translate-x-12' : 'translate-x-0',
        )}
      />

      <span
        className={cn(
          'pointer-events-none absolute top-1/2 left-1/2 z-20 w-16 -translate-x-1/2 -translate-y-1/2 text-[13px] font-medium text-white select-none',
          isPublic ? 'ml-2.5' : 'ml-6.5',
        )}
      >
        {isPublic ? '공개' : '비공개'}
      </span>
    </div>
  );
}
