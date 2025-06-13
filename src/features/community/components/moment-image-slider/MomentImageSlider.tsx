'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useState } from 'react';

import { MomentImageIndicator } from './MomentImageIndicator';
import { MomentImageSlide } from './MomentImageSlide';

import { Button } from '@/shared/components';

interface MomentImageSliderProps {
  images: string[];
}

export function MomentImageSlider({ images }: MomentImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="relative mt-5 flex justify-center">
      <div className="relative h-92 w-92 overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0"
              style={{ width: '100%' }}
            >
              <MomentImageSlide imageUrl={image} />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 left-0 h-8 w-8 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-0 h-8 w-8 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={handleNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          <MomentImageIndicator
            total={images.length}
            current={currentIndex}
            className="absolute bottom-2 left-1/2 -translate-x-1/2"
          />
        </>
      )}
    </div>
  );
}
