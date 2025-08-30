"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/contexts/theme-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Play, Pause, RotateCcw, Settings, Sparkles } from "lucide-react"

export function InteractiveDemo() {
  const { theme, themes } = useTheme()
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [sliderValue, setSliderValue] = useState([50])
  const [switchValue, setSwitchValue] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [textareaValue, setTextareaValue] = useState("")

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1))
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const currentTheme = themes.find((t) => t.value === theme)

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Interactive Demo</h2>
          <p className="text-lg text-muted-foreground mb-4">
            Test all components and interactions in the current theme
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">Current theme:</span>
            <Badge className="gap-1">
              <Sparkles className="w-3 h-3" />
              {currentTheme?.label}
            </Badge>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-2xl font-semibold mb-6 text-foreground flex items-center gap-2">
              <Settings className="w-6 h-6" />
              Form Components
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Text Input</label>
                <Input
                  placeholder="Type something..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Textarea</label>
                <Textarea
                  placeholder="Enter your message..."
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Slider ({sliderValue[0]})</label>
                <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Toggle Switch</label>
                <Switch checked={switchValue} onCheckedChange={setSwitchValue} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button>Primary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Interactive Elements</h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Progress Demo</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setProgress(0)}>
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Progress value={progress} className="mb-2" />
                <p className="text-xs text-muted-foreground">{progress}% complete</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3 text-foreground">Badge Variants</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3 text-foreground">Sample Content</h4>
                <div className="space-y-3">
                  <p className="text-foreground">
                    This is regular paragraph text that demonstrates how readable content appears in the current theme.
                  </p>
                  <p className="text-muted-foreground">
                    This is muted text that's typically used for secondary information and descriptions.
                  </p>
                  <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                    "This is a blockquote that shows how quoted content is styled in the current theme."
                  </blockquote>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3 text-foreground">Typography Scale</h4>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-foreground">Heading 1</h1>
                  <h2 className="text-2xl font-semibold text-foreground">Heading 2</h2>
                  <h3 className="text-xl font-medium text-foreground">Heading 3</h3>
                  <h4 className="text-lg font-medium text-foreground">Heading 4</h4>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Card className="p-6 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
            <h4 className="text-lg font-semibold mb-2 text-foreground">Real-time Theme Testing</h4>
            <p className="text-muted-foreground">
              All interactions above update instantly when you switch themes. Try changing themes using the selector at
              the top to see how the same components look and feel across different visual identities.
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
