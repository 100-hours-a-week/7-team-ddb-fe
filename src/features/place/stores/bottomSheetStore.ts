import { create } from 'zustand';

import {
  DEFAULT_BOTTOM_SHEET_INITIAL_SNAP,
  DEFAULT_SEARCH_TYPE,
  DEFAULT_SORT_TYPE,
} from '../constants';
import { BottomSheetState, SearchType } from '../types';

export const useBottomSheetStore = create<BottomSheetState>((set) => ({
  opened: 'list',
  prevSnap: DEFAULT_BOTTOM_SHEET_INITIAL_SNAP,
  scrollY: 0,
  lastPlaceId: null,
  sortType: DEFAULT_SORT_TYPE,
  searchType: DEFAULT_SEARCH_TYPE,
  setOpened: (opened) => set({ opened }),
  setPrevSnap: (prevSnap) => set({ prevSnap }),
  setScrollY: (scrollY) => set({ scrollY }),
  setLastPlaceId: (lastPlaceId) => set({ lastPlaceId }),
  setSortType: (sortType) => set({ sortType }),
  resetForNewSearch: (searchType: SearchType) => {
    switch (searchType) {
      case 'category':
        set({
          opened: 'list',
          prevSnap: null,
          scrollY: 0,
          lastPlaceId: null,
          sortType: 'distance',
          searchType: 'category',
        });
        break;
      case 'freeform':
        set({
          opened: 'list',
          prevSnap: null,
          scrollY: 0,
          lastPlaceId: null,
          sortType: 'similarity',
          searchType: 'freeform',
        });
        break;
      default:
        throw new Error('Invalid search type');
    }
  },
}));
