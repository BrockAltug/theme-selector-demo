"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export type Theme =
  | "default"
  | "dark-pro"
  | "editorial"
  | "creative-coder"
  | "neon-cyberpunk"
  | "retro-sunset"
  | "ocean-deep"
  | "forest-sage"
  | "royal-luxury"
  | "holographic-matrix"
  | "quantum-void"
  | "neural-network"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  themes: { value: Theme; label: string; description: string; isPremium?: boolean }[]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const themes = [
  {
    value: "default" as Theme,
    label: "Modern Geometric",
    description: "Clean, modern design with geometric elements",
  },
  {
    value: "dark-pro" as Theme,
    label: "Dark Pro",
    description: "High-contrast dark mode with glassy UI",
  },
  {
    value: "editorial" as Theme,
    label: "Editorial Serif",
    description: "Minimal luxury with classic typography",
  },
  {
    value: "creative-coder" as Theme,
    label: "Creative Coder",
    description: "Tech-inspired with monospace elements",
  },
  {
    value: "neon-cyberpunk" as Theme,
    label: "Neon Cyberpunk",
    description: "Electric purple and pink with neon glow effects",
  },
  {
    value: "retro-sunset" as Theme,
    label: "Retro Sunset",
    description: "Warm 80s vibes with gradient aesthetics",
  },
  {
    value: "ocean-deep" as Theme,
    label: "Ocean Deep",
    description: "Deep blues and teals with wave animations",
  },
  {
    value: "forest-sage" as Theme,
    label: "Forest Sage",
    description: "Natural greens with organic shadows",
  },
  {
    value: "royal-luxury" as Theme,
    label: "Royal Luxury",
    description: "Deep royal black with champagne gold luxury",
    isPremium: true,
  },
  {
    value: "holographic-matrix" as Theme,
    label: "Holographic Matrix",
    description: "Advanced 3D hologram effects with scanning overlays",
    isPremium: true,
  },
  {
    value: "quantum-void" as Theme,
    label: "Quantum Void",
    description: "Particle physics inspired with quantum field animations",
    isPremium: true,
  },
  {
    value: "neural-network" as Theme,
    label: "Neural Network",
    description: "AI-inspired with data visualization patterns",
    isPremium: true,
  },
]

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("default")

  useEffect(() => {
    // Load theme from localStorage on mount, but keep "default" as fallback
    const savedTheme = localStorage.getItem("portfolio-theme") as Theme
    if (savedTheme && themes.some((t) => t.value === savedTheme)) {
      setTheme(savedTheme)
    } else {
      setTheme("default")
    }
  }, [])

  useEffect(() => {
    // Apply theme to document body and save to localStorage
    const body = document.body

    body.classList.remove(
      "default",
      "dark-pro",
      "editorial",
      "creative-coder",
      "neon-cyberpunk",
      "retro-sunset",
      "ocean-deep",
      "forest-sage",
      "royal-luxury",
      "holographic-matrix",
      "quantum-void",
      "neural-network",
    )

    // Add current theme class
    body.classList.add(theme)

    // Save to localStorage
    localStorage.setItem("portfolio-theme", theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme, themes }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
