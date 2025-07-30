import { Menu } from '../../types';

import PlaceMenuMore from './PlaceMenuMore';

interface PlaceMenuProps {
  menu: Menu[];
}

export function PlaceMenu({ menu }: PlaceMenuProps) {
  const firstMenus = menu.slice(0, 5);
  const hasMore = menu.length > 5;

  return (
    <div>
      <h2 className="heading-2 mb-3">메뉴</h2>
      <div className="space-y-3">
        {firstMenus.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <span className="body-text text-gray-800">{item.name}</span>
            {item.price && (
              <span className="body-text text-gray-600">
                {item.price.toLocaleString()}원
              </span>
            )}
          </div>
        ))}
        {hasMore && <PlaceMenuMore menu={menu.slice(5)} />}
      </div>
    </div>
  );
}
