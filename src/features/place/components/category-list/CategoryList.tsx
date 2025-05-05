'use client';

import { useRouter } from 'next/navigation';

const categories = [
  '음식점',
  '카페',
  '문화 시설',
  '숙박',
  '쇼핑',
  '놀이 공원',
  '주점',
  '카트',
  '레저',
  '농장',
  '바다',
];

export function CategoryList() {
  const router = useRouter();

  const handleClick = (category: string) => {
    router.push(`/search?q=${category}`);
  };
  return (
    <div className="scrollbar-hide z-10 flex flex-row items-center gap-2 overflow-x-auto whitespace-nowrap">
      {categories.map((category) => (
        <button
          key={category}
          className="label-text min-w-24 rounded-full bg-white py-2 shadow transition-all duration-150 hover:bg-gray-200"
          onClick={() => handleClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
