import React from 'react';

interface CenterButtonProps {
  isActive: boolean;
  icon: React.ReactNode;
  solidIcon: React.ReactNode;
}

export function CenterButton({ isActive, icon, solidIcon }: CenterButtonProps) {
  return (
    <div
      className={`absolute -top-10 h-26 w-26 rounded-full bg-white ${
        isActive ? 'bg-primary' : 'bg-white'
      } flex items-center justify-center shadow-lg`}
    >
      <div className={isActive ? '' : 'text-gray-400'}>
        {isActive ? solidIcon : icon}
      </div>
    </div>
  );
}
