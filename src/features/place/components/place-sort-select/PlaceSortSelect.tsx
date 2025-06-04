import { DataTransferBoth } from 'iconoir-react';

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
        <SelectItem value="distance">거리순</SelectItem>
        {searchType === 'freeform' && (
          <SelectItem value="similarity">유사도순</SelectItem>
        )}
        <SelectItem value="popularity">인기순</SelectItem>
      </SelectContent>
    </Select>
  );
}
