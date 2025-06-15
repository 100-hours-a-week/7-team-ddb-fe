import { create } from 'zustand';

interface NavigationState {
  previousPath: string | null;
  setPreviousPath: (path: string | null) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  previousPath: null,
  setPreviousPath: (path) => set({ previousPath: path }),
}));
