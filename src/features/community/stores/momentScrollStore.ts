import { create } from 'zustand';

interface MomentScrollStore {
  scrollY: number;
  setScrollY: (scrollY: number) => void;
}

export const useMomentScrollStore = create<MomentScrollStore>((set) => ({
  scrollY: 0,
  setScrollY: (scrollY) => set({ scrollY }),
}));
