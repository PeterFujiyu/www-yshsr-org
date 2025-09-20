import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SwipeablePagesProps {
  children: React.ReactNode;
}

const routes = ['/', '/about', '/project', '/contact'];

export function SwipeablePages({ children }: SwipeablePagesProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();

  const currentRouteIndex = routes.indexOf(location.pathname);

  // Calculate animation duration based on distance
  const getAnimationDuration = useCallback((distance: number) => {
    const baseDuration = 200; // 基础动画时间 200ms
    const maxDuration = 400; // 最大动画时间 400ms
    const minDuration = 150; // 最小动画时间 150ms

    // 距离越远，动画时间越长，但有上下限
    const duration = Math.min(maxDuration, Math.max(minDuration, baseDuration + distance * 50));
    return duration;
  }, []);

  // Performance optimized touch handlers
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (isTransitioning) return;

    startX.current = e.touches[0].clientX;
    currentX.current = startX.current;
    setIsDragging(true);

    // Enable hardware acceleration
    if (containerRef.current) {
      containerRef.current.style.willChange = 'transform';
    }
  }, [isTransitioning]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || isTransitioning) return;

    currentX.current = e.touches[0].clientX;
    const deltaX = currentX.current - startX.current;

    // Limit drag distance and add resistance at boundaries
    const maxDrag = window.innerWidth * 0.3;
    let adjustedDelta = deltaX;

    // Add resistance at boundaries
    if ((currentRouteIndex === 0 && deltaX > 0) ||
        (currentRouteIndex === routes.length - 1 && deltaX < 0)) {
      adjustedDelta = deltaX * 0.3; // Reduce drag at boundaries
    } else {
      adjustedDelta = Math.max(-maxDrag, Math.min(maxDrag, deltaX));
    }

    setDragX(adjustedDelta);
  }, [isDragging, isTransitioning, currentRouteIndex]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;

    const deltaX = currentX.current - startX.current;
    const threshold = window.innerWidth * 0.15; // 15% of screen width

    setIsDragging(false);
    setDragX(0);

    // Remove hardware acceleration hint
    if (containerRef.current) {
      containerRef.current.style.willChange = 'auto';
    }

    // Determine if we should navigate
    if (Math.abs(deltaX) > threshold) {
      let targetIndex = currentRouteIndex;

      if (deltaX > 0 && currentRouteIndex > 0) {
        // Swipe right - go to previous page
        targetIndex = currentRouteIndex - 1;
        setDirection('right');
      } else if (deltaX < 0 && currentRouteIndex < routes.length - 1) {
        // Swipe left - go to next page
        targetIndex = currentRouteIndex + 1;
        setDirection('left');
      }

      if (targetIndex !== currentRouteIndex) {
        setIsTransitioning(true);

        // Calculate animation duration based on distance
        const distance = Math.abs(targetIndex - currentRouteIndex);
        const duration = getAnimationDuration(distance);

        // Apply custom CSS variable for animation duration
        if (containerRef.current) {
          containerRef.current.style.setProperty('--animation-duration', `${duration}ms`);
        }

        navigate(routes[targetIndex]);

        // Reset transition state after animation
        setTimeout(() => {
          setIsTransitioning(false);
          setDirection(null);
        }, duration);
      }
    }
  }, [isDragging, currentRouteIndex, navigate, getAnimationDuration]);

  // Set up touch listeners with passive option for performance
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const touchStartOptions = { passive: true };
    const touchMoveOptions = { passive: true };
    const touchEndOptions = { passive: true };

    container.addEventListener('touchstart', handleTouchStart, touchStartOptions);
    container.addEventListener('touchmove', handleTouchMove, touchMoveOptions);
    container.addEventListener('touchend', handleTouchEnd, touchEndOptions);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Mouse events for desktop testing
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isTransitioning) return;

    startX.current = e.clientX;
    currentX.current = startX.current;
    setIsDragging(true);

    if (containerRef.current) {
      containerRef.current.style.willChange = 'transform';
    }
  }, [isTransitioning]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || isTransitioning) return;

    currentX.current = e.clientX;
    const deltaX = currentX.current - startX.current;

    const maxDrag = window.innerWidth * 0.3;
    let adjustedDelta = deltaX;

    if ((currentRouteIndex === 0 && deltaX > 0) ||
        (currentRouteIndex === routes.length - 1 && deltaX < 0)) {
      adjustedDelta = deltaX * 0.3;
    } else {
      adjustedDelta = Math.max(-maxDrag, Math.min(maxDrag, deltaX));
    }

    setDragX(adjustedDelta);
  }, [isDragging, isTransitioning, currentRouteIndex]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;

    const deltaX = currentX.current - startX.current;
    const threshold = window.innerWidth * 0.15;

    setIsDragging(false);
    setDragX(0);

    if (containerRef.current) {
      containerRef.current.style.willChange = 'auto';
    }

    if (Math.abs(deltaX) > threshold) {
      let targetIndex = currentRouteIndex;

      if (deltaX > 0 && currentRouteIndex > 0) {
        targetIndex = currentRouteIndex - 1;
        setDirection('right');
      } else if (deltaX < 0 && currentRouteIndex < routes.length - 1) {
        targetIndex = currentRouteIndex + 1;
        setDirection('left');
      }

      if (targetIndex !== currentRouteIndex) {
        setIsTransitioning(true);

        const distance = Math.abs(targetIndex - currentRouteIndex);
        const duration = getAnimationDuration(distance);

        if (containerRef.current) {
          containerRef.current.style.setProperty('--animation-duration', `${duration}ms`);
        }

        navigate(routes[targetIndex]);

        setTimeout(() => {
          setIsTransitioning(false);
          setDirection(null);
        }, duration);
      }
    }
  }, [isDragging, currentRouteIndex, navigate, getAnimationDuration]);

  // Mouse event listeners for desktop
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      currentX.current = e.clientX;
      const deltaX = currentX.current - startX.current;

      const maxDrag = window.innerWidth * 0.3;
      let adjustedDelta = deltaX;

      if ((currentRouteIndex === 0 && deltaX > 0) ||
          (currentRouteIndex === routes.length - 1 && deltaX < 0)) {
        adjustedDelta = deltaX * 0.3;
      } else {
        adjustedDelta = Math.max(-maxDrag, Math.min(maxDrag, deltaX));
      }

      setDragX(adjustedDelta);
    };

    const handleGlobalMouseUp = () => {
      const deltaX = currentX.current - startX.current;
      const threshold = window.innerWidth * 0.15;

      setIsDragging(false);
      setDragX(0);

      if (containerRef.current) {
        containerRef.current.style.willChange = 'auto';
      }

      if (Math.abs(deltaX) > threshold) {
        let targetIndex = currentRouteIndex;

        if (deltaX > 0 && currentRouteIndex > 0) {
          targetIndex = currentRouteIndex - 1;
          setDirection('right');
        } else if (deltaX < 0 && currentRouteIndex < routes.length - 1) {
          targetIndex = currentRouteIndex + 1;
          setDirection('left');
        }

        if (targetIndex !== currentRouteIndex) {
          setIsTransitioning(true);

          const distance = Math.abs(targetIndex - currentRouteIndex);
          const duration = getAnimationDuration(distance);

          if (containerRef.current) {
            containerRef.current.style.setProperty('--animation-duration', `${duration}ms`);
          }

          navigate(routes[targetIndex]);

          setTimeout(() => {
            setIsTransitioning(false);
            setDirection(null);
          }, duration);
        }
      }
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, currentRouteIndex, navigate, getAnimationDuration]);

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
      onMouseUp={handleMouseUp}
    >
      {children}
    </div>
  );
}