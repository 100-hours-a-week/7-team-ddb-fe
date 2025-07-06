'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseScrollRestorationProps {
  isOpen: boolean;
  persistedScrollY: number;
  setPersistedScrollY: (y: number) => void;
  scrollTopThreshold?: number;
}

export function useScrollRestoration({
  isOpen,
  persistedScrollY,
  setPersistedScrollY,
  scrollTopThreshold = 200,
}: UseScrollRestorationProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isNodeAvailable, setIsNodeAvailable] = useState(false);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  const measuredRef = useCallback((node: HTMLDivElement | null) => {
    scrollRef.current = node;
    setIsNodeAvailable(node !== null);
  }, []);

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const currentScrollY = event.currentTarget.scrollTop;
      setPersistedScrollY(currentScrollY);
      setShowScrollTopButton(currentScrollY > scrollTopThreshold);
    },
    [setPersistedScrollY, scrollTopThreshold],
  );

  useEffect(() => {
    if (isOpen && isNodeAvailable && scrollRef.current) {
      scrollRef.current.scrollTop = persistedScrollY;
    }
  }, [isOpen, isNodeAvailable]);

  const scrollToTop = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      setPersistedScrollY(0);
    }
  }, []);

  return {
    scrollContainerRef: measuredRef,
    handleScroll,
    scrollToTop,
    showScrollTopButton,
  };
}
