import { SearchType, SortType } from '../types';

export interface SortOption {
  value: SortType;
  label: string;
  isVisible?: (searchType: SearchType) => boolean;
}

export const SORT_OPTIONS: SortOption[] = [
  {
    value: 'distance',
    label: '거리순',
  },
  {
    value: 'similarity',
    label: '유사도순',
    isVisible: (searchType) => searchType === 'freeform',
  },
  {
    value: 'popularity',
    label: '인기순',
  },
];
