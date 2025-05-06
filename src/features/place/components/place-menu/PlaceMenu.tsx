import { Menu } from '../../types';

interface PlaceMenuProps {
  menu: Menu[];
}

export function PlaceMenu({ menu }: PlaceMenuProps) {
  return (
    <div>
      <h2 className="heading-2 mb-3">메뉴</h2>
      <div className="space-y-3">
        {menu.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <span className="body-text text-gray-800">{item.name}</span>
            <span className="body-text text-gray-600">
              {item.price.toLocaleString()}원
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
