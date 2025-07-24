import { create } from 'zustand';

interface UserState {
  isLoggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  isLoggedIn: false,
  setLoggedIn: (loggedIn: boolean) => {
    set({
      isLoggedIn: loggedIn,
    });
  },
}));
