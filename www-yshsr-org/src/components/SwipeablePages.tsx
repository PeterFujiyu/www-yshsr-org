import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSwipeGesture } from '@/hooks/use-swipe-gesture';
import { routes, getAnimationDuration, applyPageTransition, cleanupPageTransition } from '@/lib/navigation-utils';

interface SwipeablePagesProps {
  children: React.ReactNode;
}

export function SwipeablePages({ children }: SwipeablePagesProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const currentRouteIndex = routes.indexOf(location.pathname);

  const performNavigation = useCallback((targetIndex: number, direction: 'left' | 'right') => {
    if (targetIndex === currentRouteIndex) return;

    setIsTransitioning(true);
    setDirection(direction);

    const distance = Math.abs(targetIndex - currentRouteIndex);
    const duration = getAnimationDuration(distance);

    if (containerRef.current) {
      applyPageTransition(containerRef.current, direction, duration);
    }

    navigate(routes[targetIndex]);

    setTimeout(() => {
      setIsTransitioning(false);
      setDirection(null);
      if (containerRef.current) {
        cleanupPageTransition(containerRef.current);
      }
    }, duration);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRouteIndex, navigate]);

  const { containerRef, handleStart, handleMove, handleEnd } = useSwipeGesture({
    onSwipeLeft: () => {
      if (currentRouteIndex < routes.length - 1) {
        performNavigation(currentRouteIndex + 1, 'left');
      }
    },
    onSwipeRight: () => {
      if (currentRouteIndex > 0) {
        performNavigation(currentRouteIndex - 1, 'right');
      }
    }
  });

  // Common drag logic
  const handleDragStart = useCallback((clientX: number) => {
    if (isTransitioning) return;
    handleStart(clientX);
    setIsDragging(true);
  }, [isTransitioning, handleStart]);

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging || isTransitioning) return;

    const isAtLeftBoundary = currentRouteIndex === 0;
    const isAtRightBoundary = currentRouteIndex === routes.length - 1;

    const newDragX = handleMove(clientX, isAtLeftBoundary, isAtRightBoundary);
    setDragX(newDragX);
  }, [isDragging, isTransitioning, currentRouteIndex, handleMove]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    handleEnd();
    setIsDragging(false);
    setDragX(0);
  }, [isDragging, handleEnd]);

  // Touch event handlers
  const handleTouchStart = useCallback((e: TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  }, [handleDragStart]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  }, [handleDragMove]);

  // Mouse event handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    handleDragStart(e.clientX);
  }, [handleDragStart]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  }, [handleDragMove]);

  // Touch event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const touchStartOptions = { passive: true };
    const touchMoveOptions = { passive: true };
    const touchEndOptions = { passive: true };

    container.addEventListener('touchstart', handleTouchStart, touchStartOptions);
    container.addEventListener('touchmove', handleTouchMove, touchMoveOptions);
    container.addEventListener('touchend', handleDragEnd, touchEndOptions);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleDragEnd);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleTouchStart, handleTouchMove, handleDragEnd]);

  // Global mouse event listeners for dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientX);
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleDragEnd);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  return (
    <div
      ref={containerRef}
      className={`
        relative w-full h-full overflow-hidden
        ${isTransitioning ? 'page-transition' : ''}
        ${direction === 'left' ? 'slide-left' : direction === 'right' ? 'slide-right' : ''}
        ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
      `}
      style={{
        transform: isDragging ? `translateX(${dragX}px)` : undefined,
        transition: isDragging ? 'none' : undefined,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleDragEnd}
      data-swipeable
    >
      {children}
    </div>
  );
}