"use client"

import { useState, useRef, useEffect } from "react"
import { useTheme } from "@/contexts/theme-context"
import { motion, AnimatePresence } from "framer-motion"
import { Crown, Palette, Zap, Star, Search, Grid, List, Play, Pause } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function AdvancedThemeShowcase() {
  const { theme, setTheme, themes } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "premium" | "standard">("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null)
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const [previewTheme, setPreviewTheme] = useState<string | null>(null)
  const autoPlayRef = useRef<NodeJS.Timeout>()

  const premiumThemes = ["royal-luxury", "holographic-matrix", "quantum-void", "neural-network"]

  useEffect(() => {
    if (isAutoPlay) {
      let currentIndex = themes.findIndex((t) => t.value === theme)
      autoPlayRef.current = setInterval(() => {
        currentIndex = (currentIndex + 1) % themes.length
        setTheme(themes[currentIndex].value)
      }, 3000)
    } else {
      clearInterval(autoPlayRef.current)
    }
    return () => clearInterval(autoPlayRef.current)
  }, [isAutoPlay, theme, themes, setTheme])

  const getThemeColors = (themeName: string) => {
    const colorMap: Record<string, { primary: string; secondary: string; accent: string }> = {
      default: {
        primary: "#3b82f6",
        secondary: "#fafafa",
        accent: "#ec4899",
      },
      "dark-pro": {
        primary: "#fbbf24",
        secondary: "rgba(15, 23, 42, 0.95)",
        accent: "#8b5cf6",
      },
      editorial: {
        primary: "#7c2d12",
        secondary: "#fefbf3",
        accent: "#059669",
      },
      "creative-coder": {
        primary: "#00ff41",
        secondary: "#0a0a0a",
        accent: "#ff1493",
      },
      "neon-cyberpunk": {
        primary: "#ff00ff",
        secondary: "#0f0820",
        accent: "#00ffff",
      },
      "retro-sunset": {
        primary: "#d946ef",
        secondary: "#fef3e2",
        accent: "#f59e0b",
      },
      "ocean-deep": {
        primary: "#06b6d4",
        secondary: "#1e293b",
        accent: "#10b981",
      },
      "forest-sage": {
        primary: "#16a34a",
        secondary: "#f7f9f7",
        accent: "#ca8a04",
      },
      "royal-luxury": {
        primary: "#fbbf24",
        secondary: "#0a0612",
        accent: "#d946ef",
      },
      "holographic-matrix": {
        primary: "#00ffff",
        secondary: "#050814",
        accent: "#ff00ff",
      },
      "quantum-void": {
        primary: "#a855f7",
        secondary: "#020202",
        accent: "#ec4899",
      },
      "neural-network": {
        primary: "#0ea5e9",
        secondary: "#0f172a",
        accent: "#10b981",
      },
    }
    return (
      colorMap[themeName] || {
        primary: "#2563eb",
        secondary: "#ffffff",
        accent: "#ec4899",
      }
    )
  }

  const filteredThemes = themes.filter((themeObj) => {
    const matchesSearch = themeObj.label.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterType === "all" ||
      (filterType === "premium" && premiumThemes.includes(themeObj.value)) ||
      (filterType === "standard" && !premiumThemes.includes(themeObj.value))
    return matchesSearch && matchesFilter
  })

  return (
    <section className="py-12 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <motion.h1
            className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
          >
            Ultimate Theme Showcase
          </motion.h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Experience the most advanced theme system ever created with live previews, interactive comparisons, and
            cutting-edge visual effects
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search themes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("all")}
              >
                All ({themes.length})
              </Button>
              <Button
                variant={filterType === "premium" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("premium")}
                className="gap-1"
              >
                <Crown className="w-4 h-4" />
                Premium ({premiumThemes.length})
              </Button>
              <Button
                variant={filterType === "standard" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("standard")}
              >
                Standard ({themes.length - premiumThemes.length})
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            <Button
              variant={isAutoPlay ? "default" : "outline"}
              size="sm"
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="gap-2"
            >
              {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              Auto Play
            </Button>
          </div>
        </motion.div>

        <motion.div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1 max-w-4xl mx-auto"
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredThemes.map((themeObj, index) => {
              const colors = getThemeColors(themeObj.value)
              const isPremium = premiumThemes.includes(themeObj.value)
              const isActive = theme === themeObj.value
              const isHovered = hoveredTheme === themeObj.value

              return (
                <motion.div
                  key={themeObj.value}
                  layout
                  initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  transition={{
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    rotateX: 5,
                    rotateY: 5,
                    z: 50,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setHoveredTheme(themeObj.value)}
                  onHoverEnd={() => setHoveredTheme(null)}
                  className="relative group cursor-pointer h-full"
                  style={{ perspective: "1000px" }}
                  onClick={() => setTheme(themeObj.value)}
                >
                  <Card
                    className={`
                    relative overflow-hidden transition-all duration-500 h-96 flex flex-col
                    ${isActive ? "ring-4 ring-primary shadow-2xl shadow-primary/25" : "hover:shadow-xl"}
                    ${viewMode === "list" ? "p-6 h-auto" : "p-4"}
                    bg-gradient-to-br from-card via-card/95 to-card/90
                  `}
                  >
                    {isPremium && (
                      <motion.div
                        className="absolute -top-2 -right-2 z-30"
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: isHovered ? 1.2 : 1,
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full p-2 shadow-lg">
                          <Crown className="w-5 h-5 text-white" />
                        </div>
                      </motion.div>
                    )}

                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 rounded-lg border-2 border-primary/50"
                      />
                    )}

                    <div className="relative mb-4">
                      <motion.div className="h-24 rounded-lg overflow-hidden relative bg-card border">
                        <motion.div
                          className="w-6 h-6 rounded-full absolute top-3 left-3 border-2 border-white/20 shadow-lg"
                          style={{ backgroundColor: colors.primary }}
                          animate={
                            isHovered
                              ? {
                                  x: [0, 20, 0],
                                  y: [0, -10, 0],
                                  scale: [1, 1.2, 1],
                                }
                              : {}
                          }
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                        <motion.div
                          className="w-6 h-6 rounded-full absolute top-3 right-3 border-2 border-white/20 shadow-lg"
                          style={{ backgroundColor: colors.secondary }}
                          animate={
                            isHovered
                              ? {
                                  x: [0, -20, 0],
                                  y: [0, 10, 0],
                                  scale: [1, 1.2, 1],
                                }
                              : {}
                          }
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                        />
                        <motion.div
                          className="w-6 h-6 rounded-full absolute bottom-3 left-1/2 transform -translate-x-1/2 border-2 border-white/20 shadow-lg"
                          style={{ backgroundColor: colors.accent }}
                          animate={
                            isHovered
                              ? {
                                  y: [0, -15, 0],
                                  scale: [1, 1.3, 1],
                                }
                              : {}
                          }
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                        />

                        {isPremium && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{
                              x: ["-100%", "100%"],
                            }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                          />
                        )}
                      </motion.div>
                    </div>

                    <div className="space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <motion.h3
                            className="font-bold text-lg text-foreground"
                            animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            {themeObj.label}
                          </motion.h3>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex items-center gap-1 text-primary"
                            >
                              <Star className="w-4 h-4 fill-current" />
                              <span className="text-sm font-medium">Active</span>
                            </motion.div>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">{themeObj.description}</p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Palette className="w-3 h-3" />
                            <span>3 Colors</span>
                          </div>
                          {isPremium && (
                            <div className="flex items-center gap-1">
                              <Zap className="w-3 h-3 text-yellow-500" />
                              <span className="text-yellow-600 font-medium">PRO</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 mt-auto">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            setTheme(themeObj.value)
                          }}
                          className="flex-1"
                          variant={isActive ? "default" : "outline"}
                        >
                          {isActive ? "Active" : "Apply"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {filteredThemes.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No themes found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
