"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Command, Search, Palette, Mail, Github, Linkedin } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

interface CommandItem {
  id: string
  label: string
  icon: React.ComponentType<any>
  action: () => void
  category: string
}

export function CommandCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const { theme, setTheme } = useTheme()

  const availableThemes = [
    "default",
    "dark-pro",
    "editorial",
    "creative-coder",
    "neon-cyberpunk",
    "retro-sunset",
    "ocean-deep",
    "forest-sage",
    "royal-luxury",
  ]

  const commands: CommandItem[] = [
    {
      id: "search-projects",
      label: "Search Projects",
      icon: Search,
      action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }),
      category: "Navigation",
    },
    {
      id: "contact",
      label: "Get In Touch",
      icon: Mail,
      action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
      category: "Navigation",
    },
    {
      id: "github",
      label: "View GitHub",
      icon: Github,
      action: () => window.open("https://github.com/johndoe", "_blank"),
      category: "Social",
    },
    {
      id: "linkedin",
      label: "Connect on LinkedIn",
      icon: Linkedin,
      action: () => window.open("https://linkedin.com/in/johndoe", "_blank"),
      category: "Social",
    },
    ...availableThemes.map((themeName) => {
      const formattedName = themeName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      return {
        id: `theme-${themeName}`,
        label: `Switch to ${formattedName} Theme`,
        icon: Palette,
        action: () => setTheme(themeName),
        category: "Themes",
      }
    }),
  ]

  const filteredCommands = commands.filter((command) => command.label.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(!isOpen)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-primary-foreground rounded-full shadow-2xl hover:shadow-primary/25 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Command className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-4 border-b border-border">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Type a command or search..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-transparent border-0 outline-none text-foreground placeholder-muted-foreground text-lg"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {Object.entries(
                    filteredCommands.reduce(
                      (acc, command) => {
                        if (!acc[command.category]) acc[command.category] = []
                        acc[command.category].push(command)
                        return acc
                      },
                      {} as Record<string, CommandItem[]>,
                    ),
                  ).map(([category, items]) => (
                    <div key={category} className="p-2">
                      <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {category}
                      </div>
                      {items.map((command) => {
                        const Icon = command.icon
                        return (
                          <motion.button
                            key={command.id}
                            onClick={() => {
                              command.action()
                              setIsOpen(false)
                            }}
                            className="w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-muted/50 rounded-lg transition-colors"
                            whileHover={{ x: 4 }}
                          >
                            <Icon className="w-5 h-5 text-primary" />
                            <span className="text-foreground">{command.label}</span>
                          </motion.button>
                        )
                      })}
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-border bg-muted/20">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Press ⌘K to toggle</span>
                    <span>ESC to close</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
