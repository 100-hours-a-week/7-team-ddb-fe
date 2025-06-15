import { DataTransferBoth } from 'iconoir-react';

import { SORT_OPTIONS } from '../../constants';
import { SearchType, SortType } from '../../types';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components';

export interface PlaceSortSelectProps {
  searchType: SearchType;
  sortType: SortType;
  setSortType: (sortType: SortType) => void;
}

export function PlaceSortSelect({
  searchType,
  sortType,
  setSortType,
}: PlaceSortSelectProps) {
  return (
    <Select value={sortType} onValueChange={setSortType}>
      <SelectTrigger className="w-[120px] border-none shadow-none">
        <DataTransferBoth className="h-4 w-4" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="w-[120px]">
        {SORT_OPTIONS.filter(
          (option) => !option.isVisible || option.isVisible(searchType),
        ).map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
