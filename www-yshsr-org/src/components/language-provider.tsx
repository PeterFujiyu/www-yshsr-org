import { useState } from "react"
import { LanguageContext } from "@/contexts/language-context"

type LanguageProviderProps = {
  children: React.ReactNode
}

export function LanguageProvider({
  children,
  ...props
}: LanguageProviderProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const value = {
    isTransitioning,
    setIsTransitioning,
  }

  return (
    <LanguageContext.Provider {...props} value={value}>
      {children}
    </LanguageContext.Provider>
  )
}