export type BottomSheetType = 'list' | 'pin';

export interface BottomSheetState {
  opened: BottomSheetType;
  prevSnap: number | string | null;
  scrollY: number;
  lastPlaceId: number | null;
  setOpened: (opened: BottomSheetType) => void;
  setPrevSnap: (prevSnap: number | string | null) => void;
  setScrollY: (scrollY: number) => void;
  setLastPlaceId: (lastPlaceId: number | null) => void;
  resetForNewSearch: () => void;
}
