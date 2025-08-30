"use client"

import { useTheme } from "@/contexts/theme-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"

export function ThemeShowcase() {
  const { theme, setTheme, themes } = useTheme()

  const getHeadingClass = () => {
    switch (theme) {
      case "editorial":
        return "font-heading-editorial"
      case "creative-coder":
        return "font-heading-coder"
      default:
        return "font-heading-default"
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl ${getHeadingClass()} text-foreground mb-4`}>
              Theme Showcase
            </h2>
            <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto">
              Experience different visual identities with live theme switching. Each theme represents a unique brand
              personality.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {themes.map((themeOption, index) => {
            const isActive = theme === themeOption.value

            return (
              <StaggerItem key={themeOption.value}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="h-full" // Added h-full for consistent height
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg h-80 flex flex-col ${
                      isActive ? "ring-2 ring-primary shadow-lg" : ""
                    }`} // Added fixed height h-80 and flex flex-col
                    onClick={() => setTheme(themeOption.value)}
                  >
                    <CardHeader className="pb-3 flex-shrink-0">
                      {" "}
                      {/* Added flex-shrink-0 */}
                      <div className="flex items-center justify-between">
                        <CardTitle className={`${getHeadingClass()} text-lg`}>{themeOption.label}</CardTitle>
                        {isActive && (
                          <motion.div
                            className="w-2 h-2 bg-primary rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            aria-label="Active theme"
                          />
                        )}
                      </div>
                      <CardDescription className="font-body text-sm">{themeOption.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between">
                      {" "}
                      {/* Added flex-1 flex flex-col justify-between for content distribution */}
                      <div className="space-y-3">
                        <motion.div
                          className="h-2 bg-primary/20 rounded-full overflow-hidden"
                          whileHover={{ scale: 1.02 }}
                        >
                          <motion.div
                            className="h-2 bg-primary rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: "75%" }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </motion.div>
                        <div className="space-y-2">
                          <motion.div
                            className="h-1 bg-muted rounded"
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                          />
                          <motion.div
                            className="h-1 bg-muted rounded"
                            initial={{ width: 0 }}
                            whileInView={{ width: "66%" }}
                            transition={{ duration: 0.8, delay: index * 0.1 + 0.4 }}
                          />
                        </div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="sm"
                            variant={isActive ? "default" : "outline"}
                            className="w-full font-body text-xs"
                            onClick={(e) => {
                              e.stopPropagation()
                              setTheme(themeOption.value)
                            }}
                          >
                            {isActive ? "Active" : "Preview"}
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        <FadeIn delay={0.6}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-4 text-sm font-body text-muted-foreground">
              <span>Quick switch:</span>
              <motion.kbd
                className="px-2 py-1 bg-muted rounded text-xs"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                ⌘K
              </motion.kbd>
              <span>or use the theme button in the top right</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
