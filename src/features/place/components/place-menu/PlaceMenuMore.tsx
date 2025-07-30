'use client';

import { useState } from 'react';

import { Menu } from '../../types';

import { ToggleMenuButton } from './ToggleMenuButton';

interface PlaceMenuMoreProps {
  menu: Menu[];
}

export default function PlaceMenuMore({ menu }: PlaceMenuMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isExpanded) {
    return (
      <ToggleMenuButton
        isExpanded={false}
        onToggle={() => setIsExpanded(true)}
      />
    );
  }

  return (
    <>
      {menu.map((item) => (
        <div key={item.name} className="flex items-center justify-between">
          <span className="body-text text-gray-800">{item.name}</span>
          {item.price && (
            <span className="body-text text-gray-600">
              {item.price.toLocaleString()}원
            </span>
          )}
        </div>
      ))}
      <ToggleMenuButton
        isExpanded={true}
        onToggle={() => setIsExpanded(false)}
      />
    </>
  );
}
