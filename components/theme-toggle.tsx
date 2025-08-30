"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check, Sparkles, Crown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme, themes } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getThemePreviewColors = (themeValue: string) => {
    switch (themeValue) {
      case "default":
        return {
          bg: "#fafafa",
          primary: "#3b82f6",
          accent: "#ec4899",
          text: "#1f2937",
        }
      case "dark-pro":
        return {
          bg: "rgba(15, 23, 42, 0.95)",
          primary: "#fbbf24",
          accent: "#8b5cf6",
          text: "#f8fafc",
        }
      case "editorial":
        return {
          bg: "#fefbf3",
          primary: "#7c2d12",
          accent: "#059669",
          text: "#1c1917",
        }
      case "creative-coder":
        return {
          bg: "#0a0a0a",
          primary: "#00ff41",
          accent: "#ff1493",
          text: "#00ff41",
        }
      case "neon-cyberpunk":
        return {
          bg: "#0f0820",
          primary: "#ff00ff",
          accent: "#00ffff",
          text: "#ff00ff",
        }
      case "retro-sunset":
        return {
          bg: "#fef3e2",
          primary: "#d946ef",
          accent: "#f59e0b",
          text: "#7c2d12",
        }
      case "ocean-deep":
        return {
          bg: "#1e293b",
          primary: "#06b6d4",
          accent: "#10b981",
          text: "#e2e8f0",
        }
      case "forest-sage":
        return {
          bg: "#f7f9f7",
          primary: "#16a34a",
          accent: "#ca8a04",
          text: "#1f2937",
        }
      case "royal-luxury":
        return {
          bg: "#0a0612",
          primary: "#fbbf24",
          accent: "#d946ef",
          text: "#f3e8a6",
        }
      case "holographic-matrix":
        return {
          bg: "#050814",
          primary: "#00ffff",
          accent: "#ff00ff",
          text: "#00ffff",
        }
      case "quantum-void":
        return {
          bg: "#020202",
          primary: "#a855f7",
          accent: "#ec4899",
          text: "#f3e8ff",
        }
      case "neural-network":
        return {
          bg: "#0f172a",
          primary: "#0ea5e9",
          accent: "#10b981",
          text: "#e2e8f0",
        }
      default:
        return {
          bg: "#ffffff",
          primary: "#2563eb",
          accent: "#ec4899",
          text: "#1f2937",
        }
    }
  }

  const handleThemeChange = (themeValue: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setTheme(themeValue as any)
    setIsOpen(false)
  }

  if (!mounted) {
    return null
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="fixed top-4 right-4 z-50"
        >
          <Button
            variant="outline"
            size="sm"
            className="bg-background/90 backdrop-blur-md border-border/60 hover:bg-accent/20 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={(e) => e.preventDefault()} // Prevent any default behavior
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex items-center"
            >
              <Sparkles className="h-4 w-4 mr-2" />
            </motion.div>
            <span className="font-medium">Themes</span>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <AnimatePresence>
        {isOpen && (
          <DropdownMenuContent
            align="end"
            className="w-80 bg-background/95 backdrop-blur-md border-border/60 shadow-2xl max-h-[80vh] overflow-y-auto"
            asChild
            sideOffset={8}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <DropdownMenuLabel className="font-heading text-base font-semibold px-4 py-3">
                Choose Your Style
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/60" />
              <div className="p-2">
                {themes.map((themeOption, index) => {
                  const colors = getThemePreviewColors(themeOption.value)
                  const isActive = theme === themeOption.value

                  return (
                    <motion.div
                      key={themeOption.value}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <DropdownMenuItem
                        className="cursor-pointer p-4 rounded-lg mb-2 hover:bg-accent/10 focus:bg-accent/10 transition-all duration-200"
                        onSelect={(e) => e.preventDefault()} // Prevent default select behavior
                        onClick={(e) => handleThemeChange(themeOption.value, e)}
                      >
                        <div className="flex items-center space-x-4 w-full">
                          <div className="flex items-center space-x-1">
                            <motion.div
                              className="w-4 h-4 rounded-full border-2 border-border/30 shadow-sm"
                              style={{ backgroundColor: colors.bg }}
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.2 }}
                            />
                            <motion.div
                              className="w-4 h-4 rounded-full border-2 border-border/30 shadow-sm"
                              style={{ backgroundColor: colors.primary }}
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.2, delay: 0.05 }}
                            />
                            <motion.div
                              className="w-4 h-4 rounded-full border-2 border-border/30 shadow-sm"
                              style={{ backgroundColor: colors.accent }}
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.2, delay: 0.1 }}
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-heading font-semibold text-sm text-foreground">
                                {themeOption.label}
                              </span>
                              {themeOption.isPremium && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.2, duration: 0.3 }}
                                  className="flex items-center"
                                >
                                  <motion.div
                                    animate={{
                                      rotate: [0, 10, -10, 0],
                                      scale: [1, 1.1, 1],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Number.POSITIVE_INFINITY,
                                      repeatDelay: 3,
                                    }}
                                  >
                                    <Crown className="h-3 w-3 text-yellow-500" />
                                  </motion.div>
                                  <motion.div
                                    className="w-1 h-1 bg-yellow-500 rounded-full ml-1"
                                    animate={{
                                      opacity: [0.5, 1, 0.5],
                                      scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                      duration: 1.5,
                                      repeat: Number.POSITIVE_INFINITY,
                                      ease: "easeInOut",
                                    }}
                                  />
                                </motion.div>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground font-body mt-1">
                              {themeOption.description}
                            </div>
                          </div>

                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="text-primary"
                              >
                                <Check className="h-5 w-5" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </DropdownMenuItem>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  )
}
