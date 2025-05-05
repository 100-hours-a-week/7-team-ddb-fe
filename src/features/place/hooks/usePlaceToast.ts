'use client';

import { toast } from 'sonner';

const TOAST_ID = 'place-toast';

export const usePlaceToast = () => {
  const showToast = (message: string) => {
    toast(message, {
      id: TOAST_ID,
      position: 'top-center',
      duration: 1500,
      className: 'toast-custom',
      closeButton: false,
      style: {
        borderRadius: '8px',
        marginTop: '3.5rem',
        backgroundColor: 'white',
        boxShadow:
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        padding: '1rem',
        fontSize: '0.875rem',
        color: '#1f2937',
        pointerEvents: 'none',
        zIndex: 100,
      },
    });
  };

  return { showToast };
};
