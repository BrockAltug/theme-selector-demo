"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/contexts/theme-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeftRight } from "lucide-react"

export function ThemeComparison() {
  const { themes } = useTheme()
  const [leftTheme, setLeftTheme] = useState("dark-pro")
  const [rightTheme, setRightTheme] = useState("editorial")

  const leftThemeObj = themes.find((t) => t.value === leftTheme)
  const rightThemeObj = themes.find((t) => t.value === rightTheme)

  const renderThemePreview = (themeValue: string, themeObj: any) => (
    <div
      className={`space-y-4 ${themeValue}`}
      style={{
        isolation: "isolate",
        contain: "style layout paint",
        position: "relative",
      }}
    >
      <Card
        className="p-6 border-2"
        style={
          {
            backgroundColor: `var(--card)`,
            color: `var(--card-foreground)`,
            borderColor: `var(--border)`,
            "--local-background": `var(--background)`,
            "--local-foreground": `var(--foreground)`,
            "--local-primary": `var(--primary)`,
            "--local-secondary": `var(--secondary)`,
            "--local-accent": `var(--accent)`,
          } as React.CSSProperties
        }
      >
        <h3 className="text-xl font-semibold mb-4" style={{ color: `var(--foreground)` }}>
          {themeObj?.label}
        </h3>
        <p className="mb-4" style={{ color: `var(--muted-foreground)` }}>
          This is how content appears in the {themeObj?.label} theme with proper typography and spacing.
        </p>
        <div className="flex gap-2 mb-4">
          <Badge
            style={{
              backgroundColor: `var(--primary)`,
              color: `var(--primary-foreground)`,
            }}
          >
            Feature
          </Badge>
          <Badge
            style={{
              backgroundColor: `var(--secondary)`,
              color: `var(--secondary-foreground)`,
            }}
          >
            Demo
          </Badge>
        </div>
        <div className="space-y-2">
          <Button
            className="w-full"
            style={{
              backgroundColor: `var(--primary)`,
              color: `var(--primary-foreground)`,
            }}
          >
            Primary Action
          </Button>
          <Button
            className="w-full"
            style={{
              backgroundColor: "transparent",
              color: `var(--foreground)`,
              borderColor: `var(--border)`,
            }}
          >
            Secondary Action
          </Button>
        </div>
      </Card>
    </div>
  )

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Theme Comparison</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Compare themes side-by-side to see their differences in real-time
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Left:</span>
              <Select value={leftTheme} onValueChange={setLeftTheme}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme.value} value={theme.value}>
                      {theme.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <motion.div
              animate={{ rotate: [0, 180, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <ArrowLeftRight className="w-6 h-6 text-muted-foreground" />
            </motion.div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Right:</span>
              <Select value={rightTheme} onValueChange={setRightTheme}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme.value} value={theme.value}>
                      {theme.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold text-foreground">{leftThemeObj?.label}</h3>
              <Badge variant="outline">Left</Badge>
            </div>
            {renderThemePreview(leftTheme, leftThemeObj)}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold text-foreground">{rightThemeObj?.label}</h3>
              <Badge variant="outline">Right</Badge>
            </div>
            {renderThemePreview(rightTheme, rightThemeObj)}
          </div>
        </div>
      </div>
    </section>
  )
}
