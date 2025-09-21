import { useEffect, useState } from "react"
import { ThemeProviderContext } from "@/contexts/theme-context"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: string
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState(
    () => (localStorage.getItem(storageKey) as string) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    // Add preload class to prevent transitions during initial load
    root.classList.add("preload")

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }

    // Remove preload class after a short delay to enable transitions
    setTimeout(() => {
      root.classList.remove("preload")
    }, 100)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: string) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

