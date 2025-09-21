import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { useLanguage } from "@/hooks/use-language";
import { Logo } from "./logo";
import { NavLink } from "@/components/ui/nav-link";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const { isTransitioning: isLanguageTransitioning, setIsTransitioning } = useLanguage();
  const [isThemeAnimating, setIsThemeAnimating] = useState(false);
  const [isLanguageAnimating, setIsLanguageAnimating] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setIsLanguageAnimating(true);
    setIsTransitioning(true);

    // Change language after fade out completes
    setTimeout(() => {
      i18n.changeLanguage(i18n.language === 'en_us' ? 'zh_cn' : 'en_us');
      setIsTransitioning(false);
    }, 200);

    // Complete button animation
    setTimeout(() => {
      setIsLanguageAnimating(false);
    }, 350);
  };

  const toggleTheme = () => {
    setIsThemeAnimating(true);
    setTheme(theme === "dark" ? "light" : "dark");

    setTimeout(() => {
      setIsThemeAnimating(false);
    }, 400);
  };

  return (
    <header className="flex flex-wrap items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <Logo />
      </div>
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
      <nav className={`w-full md:w-auto md:flex flex-grow md:flex-grow-0 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className={`flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8 mt-4 md:mt-0 ${isLanguageTransitioning ? 'language-fade-out' : 'language-fade-in'}`}>
          <NavLink to="/">{t('home')}</NavLink>
          <NavLink to="/about">{t('about')}</NavLink>
          <NavLink to="/project">{t('projects')}</NavLink>
          <NavLink to="/contact">{t('contact')}</NavLink>
        </div>
      </nav>
      <div className="flex items-center space-x-4 ml-auto md:ml-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className={`theme-toggle-button !bg-transparent ${isThemeAnimating ? 'theme-button-clicked' : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M492-280q83 0 141.5-58.5T692-480q0-83-58.5-141.5T492-680q-22 0-43 4.5T408-662q54 25 85.5 74T525-480q0 59-31.5 108T408-298q20 9 41 13.5t43 4.5ZM480-28 346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm0-112 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z"/>
          </svg>
          <span className="sr-only">Toggle theme</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleLanguage}
          className={`language-toggle-button !bg-transparent ${isLanguageAnimating ? 'language-button-clicked' : ''}`}
        >
          <span className="material-symbols-outlined">translate</span>
          <span className="sr-only">{t('toggle_language')}</span>
        </Button>
      </div>
    </header>
  );
}
