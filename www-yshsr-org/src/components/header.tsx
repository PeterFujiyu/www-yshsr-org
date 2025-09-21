import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { Logo } from "./logo";
import { NavLink } from "@/components/ui/nav-link";
import { useTranslation } from "react-i18next";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en_us' ? 'zh_cn' : 'en_us');
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-8">
        <Logo />
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/">{t('home')}</NavLink>
          <NavLink to="/about">{t('about')}</NavLink>
          <NavLink to="/project">{t('projects')}</NavLink>
          <NavLink to="/contact">{t('contact')}</NavLink>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="!bg-transparent hover:animate-[wiggle_0.5s_ease-in-out_infinite]">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M492-280q83 0 141.5-58.5T692-480q0-83-58.5-141.5T492-680q-22 0-43 4.5T408-662q54 25 85.5 74T525-480q0 59-31.5 108T408-298q20 9 41 13.5t43 4.5ZM480-28 346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm0-112 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z"/>
          </svg>
          <span className="sr-only">Toggle theme</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleLanguage} className="!bg-transparent hover:animate-[wiggle_0.5s_ease-in-out_infinite]">
          <span className="material-symbols-outlined">translate</span>
          <span className="sr-only">{t('toggle_language')}</span>
        </Button>
      </div>
    </header>
  );
}
