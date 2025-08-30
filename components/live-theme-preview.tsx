"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Maximize2, Minimize2, RotateCcw, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/contexts/theme-context"

interface LiveThemePreviewProps {
  previewTheme?: string | null
  onClose?: () => void
}

export function LiveThemePreview({ previewTheme, onClose }: LiveThemePreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTheme, setCurrentTheme] = useState(previewTheme)
  const { theme, setTheme, themes } = useTheme()

  useEffect(() => {
    if (previewTheme) {
      setCurrentTheme(previewTheme)
    }
  }, [previewTheme])

  if (!currentTheme) return null

  const themeObj = themes.find((t) => t.value === currentTheme)
  if (!themeObj) return null

  const handleApplyTheme = () => {
    setTheme(currentTheme)
    onClose?.()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className={`
            bg-card rounded-2xl shadow-2xl overflow-hidden
            ${isFullscreen ? "w-full h-full" : "w-full max-w-6xl h-[80vh]"}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b bg-card/95 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <div className="ml-4">
                <h3 className="font-semibold text-foreground">{themeObj.label} Preview</h3>
                <p className="text-xs text-muted-foreground">Live theme demonstration</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => setCurrentTheme(theme)}>
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => setIsFullscreen(!isFullscreen)}>
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
              <Button size="sm" variant="outline" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6" data-theme={currentTheme}>
            <div className="space-y-8">
              {/* Hero Section Preview */}
              <section className="text-center py-12">
                <motion.h1
                  className="text-5xl font-bold mb-6 text-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {themeObj.label} Theme
                </motion.h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Experience this theme's unique visual identity with live components and interactions
                </p>
                <div className="flex justify-center gap-4">
                  <Button size="lg" onClick={handleApplyTheme}>
                    Apply This Theme
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </section>

              {/* Component Showcase */}
              <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-foreground">Sample Card</h3>
                  <p className="text-muted-foreground mb-4">
                    This card demonstrates how content looks in the {themeObj.label} theme.
                  </p>
                  <div className="flex gap-2 mb-4">
                    <Badge>React</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                  </div>
                  <Button className="w-full">Action Button</Button>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-foreground">Typography</h3>
                  <div className="space-y-2">
                    <h4 className="text-lg font-medium text-foreground">Heading 4</h4>
                    <p className="text-foreground">Regular paragraph text</p>
                    <p className="text-sm text-muted-foreground">Small muted text</p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-foreground">Interactive Elements</h3>
                  <div className="space-y-3">
                    <Button className="w-full">Primary Button</Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Outline Button
                    </Button>
                    <Button variant="ghost" className="w-full">
                      Ghost Button
                    </Button>
                  </div>
                </Card>
              </section>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border-t bg-card/95 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Previewing:</span>
              <Badge variant="outline">{themeObj.label}</Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleApplyTheme}>Apply Theme</Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
