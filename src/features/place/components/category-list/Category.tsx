'use client';

import { useRouter } from 'next/navigation';

import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '../../constants';

export function Category({ category }: { category: string }) {
  const router = useRouter();

  const handleClick = (category: string) => {
    router.push(
      `/search?category=${category}&lat=${DEFAULT_LATITUDE}&lng=${DEFAULT_LONGITUDE}`,
    );
  };

  return (
    <button
      key={category}
      className="label-text min-w-24 rounded-full bg-white py-2 shadow transition-all duration-150 hover:bg-gray-200"
      onClick={() => handleClick(category)}
    >
      {category}
    </button>
  );
}
