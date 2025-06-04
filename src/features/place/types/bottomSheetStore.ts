export type BottomSheetType = 'list' | 'pin';

export type SortType = 'distance' | 'similarity' | 'popularity';

export type SearchType = 'category' | 'freeform';

export interface BottomSheetState {
  opened: BottomSheetType;
  prevSnap: number | string | null;
  scrollY: number;
  lastPlaceId: number | null;
  sortType: SortType;
  searchType: SearchType;
  setOpened: (opened: BottomSheetType) => void;
  setPrevSnap: (prevSnap: number | string | null) => void;
  setScrollY: (scrollY: number) => void;
  setLastPlaceId: (lastPlaceId: number | null) => void;
  setSortType: (sortType: SortType) => void;
  resetForNewSearch: (searchType: SearchType) => void;
}
