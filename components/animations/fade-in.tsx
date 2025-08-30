"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
}

export function FadeIn({ children, delay = 0, direction = "up", className }: FadeInProps) {
  const directionOffset = {
    up: { y: 24, x: 0 },
    down: { y: -24, x: 0 },
    left: { y: 0, x: 24 },
    right: { y: 0, x: -24 },
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directionOffset[direction],
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
