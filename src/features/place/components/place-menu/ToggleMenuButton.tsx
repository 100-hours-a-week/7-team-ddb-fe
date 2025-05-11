import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

export interface ToggleMenuButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export function ToggleMenuButton({
  isExpanded,
  onToggle,
}: ToggleMenuButtonProps) {
  return (
    <div className="relative flex w-full justify-center">
      <div className="absolute bottom-5 left-0 h-full w-full border-b border-gray-200" />
      <button
        onClick={onToggle}
        className="relative mt-5 flex items-center justify-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-gray-500"
      >
        {isExpanded ? '메뉴 접기' : '메뉴 더보기'}
        {isExpanded ? (
          <ChevronUpIcon className="h-4 w-4" />
        ) : (
          <ChevronDownIcon className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
