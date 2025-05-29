'use client';

import { ArrowLeft, Search } from 'iconoir-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '../../constants';
import { useSearchBar } from '../../hooks/useSearchBar';
import { useBottomSheetStore } from '../../stores';

export function SearchResultBar() {
  const searchParams = useSearchParams();
  const initialQuery =
    searchParams.get('query') || searchParams.get('category') || '';
  const router = useRouter();
  const { searchQuery, validateSearch, handleInputChange } =
    useSearchBar(initialQuery);
  const { resetForNewSearch } = useBottomSheetStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const validatedQuery = validateSearch(searchQuery);

    if (validatedQuery) {
      router.push(
        `/search?query=${encodeURIComponent(validatedQuery)}&lat=${DEFAULT_LATITUDE}&lng=${DEFAULT_LONGITUDE}`,
      );
      resetForNewSearch();
    }
  };

  return (
    <div className="sticky top-0 z-5 w-full border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
      <div className="mx-auto flex max-w-screen-lg items-center gap-2">
        <button
          onClick={() => router.push('/')}
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="장소를 검색해보세요"
              className="w-full rounded-lg px-4 py-2.5 pr-10 text-sm transition-all duration-200 focus:outline-none"
              maxLength={25}
            />
            <button
              type="submit"
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-2 hover:bg-gray-100"
            >
              <Search className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
