'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseScrollRestorationProps {
  isOpen: boolean;
  persistedScrollY: number;
  setPersistedScrollY: (y: number) => void;
}

export function useScrollRestoration({
  isOpen,
  persistedScrollY,
  setPersistedScrollY,
}: UseScrollRestorationProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isNodeAvailable, setIsNodeAvailable] = useState(false);

  const measuredRef = useCallback((node: HTMLDivElement | null) => {
    scrollRef.current = node;
    setIsNodeAvailable(node !== null);
  }, []);

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const currentScrollY = event.currentTarget.scrollTop;
      setPersistedScrollY(currentScrollY);
    },
    [setPersistedScrollY],
  );

  useEffect(() => {
    if (isOpen && isNodeAvailable && scrollRef.current) {
      scrollRef.current.scrollTop = persistedScrollY;
    }
  }, [isOpen, isNodeAvailable, persistedScrollY, scrollRef]);

  return {
    scrollContainerRef: measuredRef,
    handleScroll,
  };
}
