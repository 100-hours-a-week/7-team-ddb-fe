import { getCategories } from '../../api';

import { Category } from './Category';

export async function CategoryList() {
  const { categories } = await getCategories();

  return (
    <div className="relative w-full">
      <div className="scrollbar-hide flex w-full flex-row items-center gap-2 overflow-x-auto px-4 whitespace-nowrap">
        {categories.map((category) => (
          <Category key={category} category={category} />
        ))}
      </div>
    </div>
  );
}
