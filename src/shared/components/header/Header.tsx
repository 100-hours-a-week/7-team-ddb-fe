'use client';

import { NavArrowLeft } from 'iconoir-react';
import { useRouter } from 'next/navigation';

export interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  rightElement?: React.ReactNode;
}

export function Header({
  title,
  showBackButton,
  onBackClick,
  rightElement,
}: HeaderProps) {
  const router = useRouter();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-b-gray-200 bg-white px-4">
      <div className="flex items-center">
        {showBackButton && (
          <button
            onClick={handleBackClick}
            className="flex cursor-pointer items-center gap-2"
          >
            <NavArrowLeft className="h-6 w-6" />
          </button>
        )}
      </div>

      {title && (
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg">{title}</h1>
      )}

      <div className="flex items-center gap-2">{rightElement}</div>
    </header>
  );
}
