import React from 'react';

import { CenterButton } from './CenterButton';
import { NavItem } from './navigation-config';

interface BottomNavigationItemProps {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}

export function BottomNavigationItem({
  item,
  isActive,
  onClick,
}: BottomNavigationItemProps) {
  const isCenter = item.isHome;

  return (
    <li className="flex w-24 flex-1 justify-center">
      <button
        onClick={onClick}
        className="flex w-24 cursor-pointer flex-col items-center justify-center"
      >
        {isCenter ? (
          <CenterButton
            isActive={isActive}
            icon={item.icon}
            solidIcon={item.solidIcon}
          />
        ) : (
          <>
            <div
              className={`${isActive ? 'stroke-[2.5px]' : 'text-gray-500'} mb-1`}
            >
              {isActive ? item.solidIcon : item.icon}
            </div>
          </>
        )}
      </button>
    </li>
  );
}
