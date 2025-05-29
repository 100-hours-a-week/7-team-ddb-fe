import { create } from 'zustand';

import { DEFAULT_BOTTOM_SHEET_INITIAL_SNAP } from '../constants';
import { BottomSheetState } from '../types';

export const useBottomSheetStore = create<BottomSheetState>((set) => ({
  opened: 'list',
  prevSnap: DEFAULT_BOTTOM_SHEET_INITIAL_SNAP,
  scrollY: 0,
  lastPlaceId: null,
  setOpened: (opened) => set({ opened }),
  setPrevSnap: (prevSnap) => set({ prevSnap }),
  setScrollY: (scrollY) => set({ scrollY }),
  setLastPlaceId: (lastPlaceId) => set({ lastPlaceId }),
  resetForNewSearch: () =>
    set({ opened: 'list', prevSnap: null, scrollY: 0, lastPlaceId: null }),
}));
