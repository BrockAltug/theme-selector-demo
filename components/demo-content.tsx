"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Eye, GitFork, User, Mail, Phone, MapPin } from "lucide-react"

export function DemoContent() {
  return (
    <div className="space-y-8 px-4 pb-12">
      {/* Hero Demo Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6 text-foreground"
          >
            Theme Demo Showcase
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground mb-8"
          >
            Experience how different themes transform the same content with unique visual identities
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button size="lg" className="px-8">
              Primary Action
            </Button>
            <Button variant="outline" size="lg" className="px-8 bg-transparent">
              Secondary Action
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Cards Demo Section */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8 text-foreground">Component Showcase</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project Card Demo */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                <span className="text-muted-foreground">Demo Image</span>
              </div>
              <h4 className="text-xl font-semibold mb-2 text-foreground">Sample Project</h4>
              <p className="text-muted-foreground mb-4">
                This demonstrates how project cards look in different themes with consistent spacing and typography.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">Tailwind</Badge>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    1.2k
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    5.4k
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    234
                  </span>
                </div>
              </div>
            </Card>

            {/* Profile Card Demo */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-foreground">John Doe</h4>
                  <p className="text-muted-foreground">Full-Stack Developer</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Passionate about creating beautiful and functional web applications with modern technologies.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  john.doe@example.com
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  +1 (555) 123-4567
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  San Francisco, CA
                </div>
              </div>
            </Card>

            {/* Stats Card Demo */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <h4 className="text-xl font-semibold mb-4 text-foreground">Theme Statistics</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Themes</span>
                  <span className="text-2xl font-bold text-foreground">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Premium Themes</span>
                  <span className="text-2xl font-bold text-foreground">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Color Variants</span>
                  <span className="text-2xl font-bold text-foreground">36+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Animations</span>
                  <span className="text-2xl font-bold text-foreground">∞</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Typography Demo */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8 text-foreground">Typography Showcase</h3>
          <Card className="p-8">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Heading 1</h1>
                <h2 className="text-3xl font-semibold text-foreground mb-2">Heading 2</h2>
                <h3 className="text-2xl font-medium text-foreground mb-2">Heading 3</h3>
                <h4 className="text-xl font-medium text-foreground">Heading 4</h4>
              </div>
              <div>
                <p className="text-lg text-foreground mb-4">
                  This is a large paragraph demonstrating how body text appears in different themes. Each theme has
                  carefully selected typography that matches its visual identity.
                </p>
                <p className="text-base text-muted-foreground mb-4">
                  This is regular body text with muted foreground color. Notice how the contrast and readability remain
                  consistent across all themes while maintaining each theme's unique character.
                </p>
                <p className="text-sm text-muted-foreground">
                  This is small text, often used for captions, metadata, or secondary information.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Button Demo */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8 text-foreground">Interactive Elements</h3>
          <Card className="p-8">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-foreground">Buttons</h4>
                <div className="flex flex-wrap gap-4">
                  <Button>Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="destructive">Destructive Button</Button>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-foreground">Badges</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
