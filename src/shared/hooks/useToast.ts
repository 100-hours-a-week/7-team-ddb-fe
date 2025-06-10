'use client';

import { toast } from 'sonner';

type ToastPosition = 'top-center' | 'bottom-center';
type ToastVariant = 'default' | 'error' | 'success';

interface ToastOptions {
  position?: ToastPosition;
  duration?: number;
  variant?: ToastVariant;
}

const TOAST_STYLES = {
  default: {
    backgroundColor: 'white',
    color: '#1f2937',
  },
  error: {
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
  },
  success: {
    backgroundColor: '#DCFCE7',
    color: '#16A34A',
  },
};

export const useToast = () => {
  const showToast = (
    message: string,
    {
      position = 'bottom-center',
      duration = 2000000,
      variant = 'default',
    }: ToastOptions = {},
  ) => {
    const baseStyle = {
      borderRadius: '8px',
      marginTop: position === 'top-center' ? '3.5rem' : undefined,
      marginBottom: position === 'bottom-center' ? '5rem' : undefined,
      boxShadow:
        '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      padding: '1rem',
      fontSize: '0.875rem',
      pointerEvents: 'none',
      zIndex: 100,
    };

    toast(message, {
      position,
      duration,
      className: 'toast-custom',
      closeButton: false,
      style: {
        ...baseStyle,
        ...TOAST_STYLES[variant],
        pointerEvents: 'none' as const,
      },
    });
  };

  return {
    showToast,
    showErrorToast: (
      message: string,
      options?: Omit<ToastOptions, 'variant'>,
    ) => showToast(message, { ...options, variant: 'error' }),
    showSuccessToast: (
      message: string,
      options?: Omit<ToastOptions, 'variant'>,
    ) => showToast(message, { ...options, variant: 'success' }),
  };
};
