'use client';

import { useState } from 'react';

import { Menu } from '../../types';

import { ToggleMenuButton } from './ToggleMenuButton';

interface PlaceMenuProps {
  menu: Menu[];
}

export function PlaceMenu({ menu }: PlaceMenuProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const visibleMenu = isExpanded ? menu : menu.slice(0, 5);

  return (
    <div>
      <h2 className="heading-2 mb-3">메뉴</h2>
      <div className="space-y-3">
        {visibleMenu.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <span className="body-text text-gray-800">{item.name}</span>
            {item.price && (
              <span className="body-text text-gray-600">
                {item.price.toLocaleString()}원
              </span>
            )}
          </div>
        ))}
      </div>
      {menu.length > 5 && (
        <ToggleMenuButton isExpanded={isExpanded} onToggle={handleToggle} />
      )}
    </div>
  );
}
