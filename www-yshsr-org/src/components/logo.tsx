import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

export function Logo() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname === '/') return;

    // Calculate animation duration - going to home from any page
    const routes = ['/', '/about', '/project', '/contact'];
    const currentIndex = routes.indexOf(location.pathname);
    const targetIndex = 0; // Home page index

    const distance = Math.abs(targetIndex - currentIndex);
    const baseDuration = 200;
    const maxDuration = 400;
    const minDuration = 150;
    const duration = Math.min(maxDuration, Math.max(minDuration, baseDuration + distance * 50));

    // Apply animation to the main container
    const mainElement = document.querySelector('[data-swipeable]') as HTMLElement;
    if (mainElement) {
      mainElement.style.setProperty('--animation-duration', `${duration}ms`);

      // Always slide right when going to home (going back)
      mainElement.classList.add('page-transition', 'slide-right');

      // Navigate after a brief delay
      setTimeout(() => {
        navigate('/');

        // Clean up animation classes
        setTimeout(() => {
          mainElement.classList.remove('page-transition', 'slide-left', 'slide-right');
        }, duration);
      }, 10);
    } else {
      navigate('/');
    }
  };

  return (
    <div
      className="flex items-center cursor-pointer logo-hover-effect hover:scale-105 active:scale-95"
      onClick={handleLogoClick}
    >
      <span className="text-2xl font-bold">
        <span style={{ color: '#4285F4' }}>H</span>
        <span style={{ color: '#EA4335' }}>s</span>
        <span style={{ color: '#FBBC05' }}>r</span>
      </span>
      <span className="text-2xl font-normal text-muted-foreground"> {t('hsr_cloud').split(' ')[1]}</span>
    </div>
  );
}
