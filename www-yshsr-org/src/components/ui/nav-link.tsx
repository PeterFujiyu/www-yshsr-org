import { Link, useLocation, useNavigate } from "react-router-dom";
import { routes, getAnimationDuration } from "@/lib/navigation-utils";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ to, children, className = "" }: NavLinkProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = location.pathname === to;

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();

    const currentIndex = routes.indexOf(location.pathname);
    const targetIndex = routes.indexOf(to);

    if (currentIndex === targetIndex) return;

    // Calculate animation duration based on distance
    const distance = Math.abs(targetIndex - currentIndex);
    const duration = getAnimationDuration(distance);

    // Apply animation to the main container
    const mainElement = document.querySelector('[data-swipeable]') as HTMLElement;
    if (mainElement) {
      mainElement.style.setProperty('--animation-duration', `${duration}ms`);

      // Determine direction
      const direction = targetIndex > currentIndex ? 'left' : 'right';
      mainElement.classList.add('page-transition', `slide-${direction}`);

      // Navigate after a brief delay to show the animation start
      setTimeout(() => {
        navigate(to);

        // Clean up animation classes
        setTimeout(() => {
          mainElement.classList.remove('page-transition', 'slide-left', 'slide-right');
        }, duration);
      }, 10);
    } else {
      // Fallback if no swipeable container found
      navigate(to);
    }
  };

  const baseClasses = "text-base font-medium transition-colors duration-200 hover:scale-105 active:scale-95";
  const activeClasses = isActive ? "text-primary nav-link-active" : "text-muted-foreground hover:text-primary";

  return (
    <Link
      to={to}
      onClick={handleClick}
      className={`${baseClasses} ${activeClasses} ${className}`}
    >
      {children}
    </Link>
  );
}