import React from 'react';

interface CenterButtonProps {
  isActive: boolean;
  label: string;
  icon: React.ReactNode;
  solidIcon: React.ReactNode;
}

export function CenterButton({
  isActive,
  label,
  icon,
  solidIcon,
}: CenterButtonProps) {
  return (
    <div
      className={`absolute -top-10 h-26 w-26 rounded-full bg-white ${
        isActive ? 'bg-primary' : 'bg-white'
      } flex items-center justify-center shadow-lg`}
      aria-label={label}
    >
      <div className={isActive ? '' : 'text-gray-400'}>
        {isActive ? solidIcon : icon}
      </div>
    </div>
  );
}
