'use client';

import { useLayoutEffect } from 'react';

export function useGlobalFocusHandler(enabled = true) {
  useLayoutEffect(() => {
    if (!enabled) {
      return;
    }

    const handleFocusIn = (e: FocusEvent) => {
      e.stopImmediatePropagation();
    };
    const handleFocusOut = (e: FocusEvent) => {
      e.stopImmediatePropagation();
    };

    document.addEventListener('focusin', handleFocusIn, true);
    document.addEventListener('focusout', handleFocusOut, true);

    return () => {
      document.removeEventListener('focusin', handleFocusIn, true);
      document.removeEventListener('focusout', handleFocusOut, true);
    };
  }, [enabled]);
}
