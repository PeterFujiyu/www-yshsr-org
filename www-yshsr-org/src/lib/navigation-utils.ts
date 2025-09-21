export const routes = ['/', '/about', '/project', '/contact'];

export function getAnimationDuration(distance: number): number {
  const baseDuration = 200;
  const maxDuration = 400;
  const minDuration = 150;

  return Math.min(maxDuration, Math.max(minDuration, baseDuration + distance * 50));
}

export function applyPageTransition(
  element: HTMLElement | null,
  direction: 'left' | 'right',
  duration: number
): void {
  if (!element) return;

  element.style.setProperty('--animation-duration', `${duration}ms`);
  element.classList.add('page-transition', `slide-${direction}`);
}

export function cleanupPageTransition(element: HTMLElement | null): void {
  if (!element) return;

  element.classList.remove('page-transition', 'slide-left', 'slide-right');
}