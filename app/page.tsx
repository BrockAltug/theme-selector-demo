"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { CommandPalette } from "@/components/command-palette"
import { ParticleSystem } from "@/components/advanced-features/particle-system"
import { CommandCenter } from "@/components/advanced-features/command-center"
import { useTheme } from "@/contexts/theme-context"
import { AdvancedThemeShowcase } from "@/components/advanced-theme-showcase"
import { LiveThemePreview } from "@/components/live-theme-preview"
import { ThemeComparison } from "@/components/theme-comparison"
import { InteractiveDemo } from "@/components/interactive-demo"

function HomePageContent() {
  const { theme } = useTheme()

  return (
    <>
      <ThemeToggle />
      <CommandPalette />
      <ParticleSystem theme={theme} />
      <CommandCenter />
      <main className="relative min-h-screen">
        <AdvancedThemeShowcase />
        <LiveThemePreview />
        <ThemeComparison />
        <InteractiveDemo />
      </main>
    </>
  )
}

export default function HomePage() {
  return <HomePageContent />
}
