import { useRef, useCallback } from 'react';

interface SwipeGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
  maxDrag?: number;
  resistanceFactor?: number;
}


export function useSwipeGesture(options: SwipeGestureOptions = {}) {
  const {
    onSwipeLeft,
    onSwipeRight,
    threshold = 0.15,
    maxDrag = 0.3,
    resistanceFactor = 0.3
  } = options;

  const startX = useRef(0);
  const currentX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculateDragX = useCallback((deltaX: number, isAtBoundary: boolean): number => {
    const maxDragDistance = window.innerWidth * maxDrag;
    let adjustedDelta = deltaX;

    if (isAtBoundary) {
      adjustedDelta = deltaX * resistanceFactor;
    } else {
      adjustedDelta = Math.max(-maxDragDistance, Math.min(maxDragDistance, deltaX));
    }

    return adjustedDelta;
  }, [maxDrag, resistanceFactor]);

  const handleStart = useCallback((clientX: number) => {
    startX.current = clientX;
    currentX.current = clientX;

    if (containerRef.current) {
      containerRef.current.style.willChange = 'transform';
    }
  }, []);

  const handleMove = useCallback((clientX: number, isAtLeftBoundary: boolean, isAtRightBoundary: boolean): number => {
    currentX.current = clientX;
    const deltaX = currentX.current - startX.current;

    const isAtBoundary = (isAtLeftBoundary && deltaX > 0) || (isAtRightBoundary && deltaX < 0);
    return calculateDragX(deltaX, isAtBoundary);
  }, [calculateDragX]);

  const handleEnd = useCallback(() => {
    const deltaX = currentX.current - startX.current;
    const thresholdDistance = window.innerWidth * threshold;

    if (containerRef.current) {
      containerRef.current.style.willChange = 'auto';
    }

    if (Math.abs(deltaX) > thresholdDistance) {
      if (deltaX > 0 && onSwipeRight) {
        onSwipeRight();
        return true;
      } else if (deltaX < 0 && onSwipeLeft) {
        onSwipeLeft();
        return true;
      }
    }

    return false;
  }, [threshold, onSwipeLeft, onSwipeRight]);

  return {
    containerRef,
    handleStart,
    handleMove,
    handleEnd
  };
}