'use client';

import { useState, useEffect } from 'react';

interface UseBottomSheetSnapManagementProps {
  initialSnapPoints: (string | number)[];
  persistedPrevSnap: string | number | null | undefined;
  setPersistedPrevSnap: (snap: string | number | null) => void;
}

export function useBottomSheetSnapManagement({
  initialSnapPoints,
  persistedPrevSnap,
  setPersistedPrevSnap,
}: UseBottomSheetSnapManagementProps) {
  const [snap, setSnap] = useState<number | string | null>(
    persistedPrevSnap ?? initialSnapPoints[0],
  );

  useEffect(() => {
    setPersistedPrevSnap(snap);
  }, [snap, setPersistedPrevSnap]);

  return {
    snap,
    setSnap,
    snapPoints: initialSnapPoints,
  };
}
