'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState } from 'react';

import { OnboardingSlide } from './OnboardingSlide';
import { SlideIndicator } from './SlideIndicator';

interface OnboardingSliderProps {
  slides: {
    imageUrl: string;
    title: string;
    description: string;
  }[];
}

export function OnboardingSlider({ slides }: OnboardingSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    const newIndex = activeIndex + newDirection;
    if (newIndex >= 0 && newIndex < slides.length) {
      setDirection(newDirection);
      setActiveIndex(newIndex);
    }
  };

  const variants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      position: 'absolute',
    }),
    center: {
      x: 0,
      opacity: 1,
      position: 'relative',
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      position: 'absolute',
    }),
  };

  return (
    <>
      <div className="relative mb-5 min-h-[400px] w-full max-w-md">
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              const offsetX = info.offset.x;
              const velocityX = info.velocity.x;

              if (offsetX < -100 || velocityX < -500) {
                paginate(1);
              } else if (offsetX > 100 || velocityX > 500) {
                paginate(-1);
              }
            }}
            className="absolute inset-0"
          >
            <OnboardingSlide {...slides[activeIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>
      <SlideIndicator total={slides.length} active={activeIndex} />
    </>
  );
}
