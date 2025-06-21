'use client';

import { useRouter } from 'next/navigation';

import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '../../constants';
import { useBottomSheetStore } from '../../stores';

import { Button } from '@/shared/components';

export function Category({ category }: { category: string }) {
  const router = useRouter();
  const { resetForNewSearch } = useBottomSheetStore();

  const handleClick = (category: string) => {
    router.push(
      `/search?category=${category}&lat=${DEFAULT_LATITUDE}&lng=${DEFAULT_LONGITUDE}`,
    );
    resetForNewSearch('category');
  };

  return (
    <Button
      key={category}
      variant="ghost"
      className="label-text min-w-21 transform-gpu rounded-full bg-white shadow transition-all duration-150 hover:scale-105 hover:bg-rose-100"
      onClick={() => handleClick(category)}
    >
      {category}
    </Button>
  );
}
