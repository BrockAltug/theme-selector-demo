"use client"

import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Palette, Zap } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { FadeIn } from "@/components/animations/fade-in"
import { useEffect, useState } from "react"

export function Hero() {
  const { theme } = useTheme()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, 100])
  const opacity = useTransform(scrollY, [0, 200], [1, 0])

  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const titles = ["Full-Stack Developer", "UI/UX Designer", "Creative Problem Solver", "Digital Innovator"]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  useEffect(() => {
    const currentTitle = titles[currentIndex]
    if (displayText.length < currentTitle.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentTitle.slice(0, displayText.length + 1))
      }, 100)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setDisplayText("")
        setCurrentIndex((prev) => (prev + 1) % titles.length)
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [displayText, currentIndex])

  const getHeadingClass = () => {
    switch (theme) {
      case "editorial":
        return "font-heading-editorial elegant-spacing"
      case "creative-coder":
        return "font-heading-coder terminal-glow"
      case "dark-pro":
        return "font-heading-default"
      case "neon-cyberpunk":
        return "font-heading-neon neon-glow"
      case "retro-sunset":
        return "font-heading-retro"
      case "ocean-deep":
        return "font-heading-ocean"
      case "forest-sage":
        return "font-heading-forest"
      case "royal-luxury":
        return "font-heading-royal"
      default:
        return "font-heading-default"
    }
  }

  const getContainerClass = () => {
    switch (theme) {
      case "dark-pro":
        return "glass-effect"
      case "creative-coder":
        return "border border-primary/30"
      case "editorial":
        return "border-l-4 border-primary pl-8"
      case "neon-cyberpunk":
        return "bg-card/80 backdrop-blur-md border border-primary/50 neon-glow"
      case "retro-sunset":
        return "retro-gradient bg-clip-padding backdrop-blur-sm"
      case "ocean-deep":
        return "wave-effect bg-card/70 backdrop-blur-lg"
      case "forest-sage":
        return "organic-shadow bg-card/90"
      case "royal-luxury":
        return "luxury-border bg-card/95 backdrop-blur-sm"
      default:
        return "bg-card/50 backdrop-blur-sm"
    }
  }

  return (
    <section
      id="home"
      className="relative h-[45vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <motion.div className="absolute inset-0 -z-10" style={{ y }}>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-secondary/15 rounded-full blur-2xl" />
        {theme === "creative-coder" && (
          <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(32,255,77,0.03)_25%,rgba(32,255,77,0.03)_26%,transparent_27%,transparent_74%,rgba(32,255,77,0.03)_75%,rgba(32,255,77,0.03)_76%,transparent_77%,transparent)] bg-[length:50px_50px]" />
        )}
      </motion.div>

      <div className="absolute inset-0 -z-5">
        {[...Array(theme === "creative-coder" ? 30 : 10)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              theme === "creative-coder" ? "bg-primary/50 shadow-[0_0_6px_currentColor]" : "bg-primary/30"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, 10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 1,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 1,
            }}
          />
        ))}
      </div>

      <motion.div
        className={`max-w-4xl mx-auto text-center space-y-3 p-4 rounded-[var(--radius)] ${getContainerClass()}`}
        style={{ opacity }}
      >
        <div className="space-y-1">
          <FadeIn delay={0.1}>
            <div className="flex items-center justify-center mb-4">
              <motion.div
                className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="/cartoon-developer-john-doe.png"
                  alt="John Doe - Cartoon Developer Portrait"
                  className="w-full h-full object-cover"
                />
                {theme === "neon-cyberpunk" && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 mix-blend-overlay" />
                )}
              </motion.div>
            </div>
            <motion.h1
              className={`text-3xl sm:text-5xl lg:text-6xl ${getHeadingClass()} text-foreground leading-tight`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              John Doe
            </motion.h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="h-10 flex items-center justify-center">
              <motion.p
                className={`text-lg sm:text-xl font-body text-primary ${
                  theme === "creative-coder" ? "terminal-glow font-mono" : ""
                }`}
              >
                {displayText}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  className="ml-1"
                >
                  {theme === "creative-coder" ? "█" : "|"}
                </motion.span>
              </motion.p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p
              className={`text-sm sm:text-base font-body text-muted-foreground max-w-xl mx-auto ${
                theme === "editorial" ? "elegant-spacing" : "leading-relaxed"
              }`}
            >
              {theme === "creative-coder"
                ? "> Crafting digital experiences with code and creativity"
                : "Crafting exceptional digital experiences with cutting-edge technology"}
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-1">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="relative group">
              {theme === "dark-pro" && (
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[var(--radius)] blur opacity-25 group-hover:opacity-75 transition duration-300" />
              )}
              <Button
                size="lg"
                className={`relative font-body ${
                  theme === "creative-coder"
                    ? "bg-primary hover:bg-primary/90 font-mono uppercase tracking-wider"
                    : "bg-primary hover:bg-primary/90"
                }`}
                onClick={() => scrollToSection("projects")}
              >
                <Zap className="mr-2 h-4 w-4" />
                {theme === "creative-coder" ? "EXECUTE" : "View My Work"}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className={`font-body bg-transparent border-2 ${
                  theme === "creative-coder" ? "font-mono uppercase tracking-wider" : ""
                }`}
                onClick={() => scrollToSection("contact")}
              >
                <Mail className="mr-2 h-4 w-4" />
                {theme === "creative-coder" ? "CONTACT" : "Get In Touch"}
              </Button>
            </motion.div>
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="flex justify-center items-center space-x-6 pt-2">
            {[
              { icon: Github, label: "GitHub", skill: "Code", href: "https://github.com/BrockAltug" },
              { icon: Linkedin, label: "LinkedIn", skill: "Network", href: "https://linkedin.com/in/brock-altug" },
              { icon: Palette, label: "Design", skill: "Design", href: "#" },
            ].map(({ icon: Icon, label, skill, href }, index) => (
              <motion.div
                key={label}
                className="group relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
              >
                <motion.a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`flex flex-col items-center space-y-1 text-muted-foreground hover:text-foreground transition-colors ${
                    theme === "creative-coder" ? "terminal-glow" : ""
                  }`}
                  aria-label={label}
                  whileHover={{ scale: 1.2, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-body opacity-0 group-hover:opacity-100 transition-opacity">
                    {theme === "creative-coder" ? skill.toUpperCase() : skill}
                  </span>
                </motion.a>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        <motion.button
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 cursor-pointer bg-transparent border-none"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          style={{ opacity }}
          onClick={() => scrollToSection("projects")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowDown className={`h-5 w-5 text-muted-foreground ${theme === "creative-coder" ? "terminal-glow" : ""}`} />
        </motion.button>
      </motion.div>
    </section>
  )
}
