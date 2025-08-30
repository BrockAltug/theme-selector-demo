"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/theme-context"

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme } = useTheme()

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.slice(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50" : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div className={`${getHeadingClass()} text-xl font-bold text-foreground`} whileHover={{ scale: 1.05 }}>
            AJ
          </motion.div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`px-3 py-2 rounded-md text-sm font-body transition-colors relative ${
                  activeSection === item.href.slice(1) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    layoutId="activeSection"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <motion.div className="md:hidden" whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="sm" className="font-body">
              Menu
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}
