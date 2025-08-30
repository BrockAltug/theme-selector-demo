"use client"

import { useTheme } from "@/contexts/theme-context"
import { motion } from "framer-motion"
import { Crown, Sparkles } from "lucide-react"

export function ThemeShowcaseGrid() {
  const { theme, setTheme, themes } = useTheme()

  const premiumThemes = ["royal-luxury", "holographic-matrix", "quantum-void", "neural-network"]

  const getThemeColors = (themeName: string) => {
    const colorMap: Record<string, { primary: string; secondary: string; accent: string }> = {
      default: { primary: "oklch(0.55 0.25 260)", secondary: "oklch(0.65 0.2 320)", accent: "oklch(0.7 0.25 180)" },
      "dark-pro": { primary: "oklch(0.75 0.3 60)", secondary: "oklch(0.65 0.25 300)", accent: "oklch(0.8 0.25 180)" },
      editorial: { primary: "oklch(0.4 0.15 30)", secondary: "oklch(0.6 0.12 60)", accent: "oklch(0.5 0.1 120)" },
      "creative-coder": {
        primary: "oklch(0.75 0.2 120)",
        secondary: "oklch(0.7 0.25 60)",
        accent: "oklch(0.8 0.3 300)",
      },
      "neon-cyberpunk": {
        primary: "oklch(0.8 0.35 300)",
        secondary: "oklch(0.75 0.3 260)",
        accent: "oklch(0.85 0.25 180)",
      },
      "retro-sunset": { primary: "oklch(0.6 0.25 350)", secondary: "oklch(0.7 0.2 60)", accent: "oklch(0.65 0.2 280)" },
      "ocean-deep": {
        primary: "oklch(0.65 0.2 180)",
        secondary: "oklch(0.7 0.15 200)",
        accent: "oklch(0.75 0.25 160)",
      },
      "forest-sage": { primary: "oklch(0.45 0.15 140)", secondary: "oklch(0.6 0.12 80)", accent: "oklch(0.55 0.1 60)" },
      "royal-luxury": { primary: "oklch(0.85 0.35 50)", secondary: "oklch(0.7 0.25 30)", accent: "oklch(0.9 0.2 60)" },
      "holographic-matrix": {
        primary: "oklch(0.9 0.4 300)",
        secondary: "oklch(0.85 0.35 120)",
        accent: "oklch(0.95 0.3 60)",
      },
      "quantum-void": {
        primary: "oklch(0.8 0.4 270)",
        secondary: "oklch(0.75 0.35 330)",
        accent: "oklch(0.85 0.3 210)",
      },
      "neural-network": {
        primary: "oklch(0.75 0.3 160)",
        secondary: "oklch(0.8 0.25 40)",
        accent: "oklch(0.85 0.35 280)",
      },
    }
    return colorMap[themeName] || { primary: "#666", secondary: "#999", accent: "#ccc" }
  }

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Theme Showcase Demo</h1>
          <p className="text-lg text-muted-foreground">Experience 12 unique themes with advanced visual effects</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {themes.map((themeObj, index) => {
            const colors = getThemeColors(themeObj.value)
            const isPremium = premiumThemes.includes(themeObj.value)
            const isActive = theme === themeObj.value

            return (
              <motion.button
                key={themeObj.value}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(themeObj.value)}
                className={`
                  relative p-4 rounded-xl border-2 transition-all duration-300 h-32 flex flex-col justify-center
                  ${isActive ? "border-primary shadow-lg shadow-primary/25" : "border-border hover:border-primary/50"}
                  bg-card hover:bg-card/80 cursor-pointer
                `}
              >
                {isPremium && (
                  <div className="absolute -top-2 -right-2 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                )}

                <div className="flex flex-col items-center space-y-3">
                  <div className="flex space-x-1">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white/20"
                      style={{ backgroundColor: colors.primary }}
                    />
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white/20"
                      style={{ backgroundColor: colors.secondary }}
                    />
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white/20"
                      style={{ backgroundColor: colors.accent }}
                    />
                  </div>

                  <div className="text-center">
                    <h3 className="font-semibold text-sm text-foreground">{themeObj.label}</h3>
                    {isPremium && (
                      <div className="flex items-center justify-center mt-1">
                        <Sparkles className="w-3 h-3 text-yellow-500 mr-1" />
                        <span className="text-xs text-yellow-600 font-medium">PRO</span>
                      </div>
                    )}
                  </div>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="activeTheme"
                    className="absolute inset-0 rounded-xl border-2 border-primary bg-primary/5"
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
