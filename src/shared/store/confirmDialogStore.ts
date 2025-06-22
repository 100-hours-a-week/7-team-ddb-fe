import { create } from 'zustand';

interface ConfirmDialogState {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClassName?: string;
  resolver?: (ok: boolean) => void;
  openDialog: (
    params: Omit<
      ConfirmDialogState,
      'open' | 'resolver' | 'openDialog' | 'closeDialog'
    >,
  ) => Promise<boolean>;
  closeDialog: () => void;
}

export const useConfirmDialogStore = create<ConfirmDialogState>((set) => ({
  open: false,
  title: '',
  description: '',
  confirmText: '확인',
  cancelText: '취소',
  resolver: undefined,
  confirmButtonClassName: '',
  openDialog: async (params) => {
    return new Promise<boolean>((resolve) => {
      set((state) => ({ ...state, ...params, resolver: resolve, open: true }));
    });
  },
  closeDialog: () => {
    set(() => ({
      open: false,
      title: '',
      description: '',
      confirmText: '확인',
      cancelText: '취소',
      confirmButtonClassName: '',
      resolver: undefined,
    }));
  },
}));
