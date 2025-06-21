'use client';

import { Search } from 'iconoir-react';
import { useRouter } from 'next/navigation';

import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '../../constants';
import { useSearchBar } from '../../hooks/useSearchBar';
import { useBottomSheetStore } from '../../stores';

import { Button } from '@/shared/components';

export interface SearchBarProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  initialQuery = '',
  placeholder = '장소를 검색해보세요',
  className = '',
}: SearchBarProps) {
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
      resetForNewSearch('freeform');
    }
  };

  return (
    <form onSubmit={handleSearch} className={`w-full ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="focus:border-primary focus:ring-primary h-12 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm shadow-md transition-all duration-200 hover:shadow-lg focus:shadow-lg focus:ring-1 focus:outline-none"
          maxLength={25}
        />
        <Button
          type="submit"
          variant="ghost"
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-2 hover:bg-gray-100"
        >
          <Search className="size-5 text-gray-600" />
        </Button>
      </div>
    </form>
  );
}
