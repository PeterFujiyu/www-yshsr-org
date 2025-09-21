import { createContext } from "react";

export interface LanguageContextType {
  isTransitioning: boolean;
  setIsTransitioning: (isTransitioning: boolean) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);