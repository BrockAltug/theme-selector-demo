"use client"

import { Button } from "@/components/ui/button"

import { useEffect, useState } from "react"
import { useTheme } from "@/contexts/theme-context"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Palette } from "lucide-react"

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const { theme, setTheme, themes } = useTheme()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleThemeSelect = (themeValue: string) => {
    setTheme(themeValue as any)
    setOpen(false)
  }

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen(true)}
          className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent/10 font-body"
        >
          <span className="text-xs">⌘K</span>
          <span className="ml-2">Quick Switch</span>
        </Button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search themes..." className="font-body" />
        <CommandList>
          <CommandEmpty className="font-body">No themes found.</CommandEmpty>
          <CommandGroup heading="Themes">
            {themes.map((themeOption) => (
              <CommandItem
                key={themeOption.value}
                onSelect={() => handleThemeSelect(themeOption.value)}
                className="cursor-pointer"
              >
                <Palette className="mr-2 h-4 w-4" />
                <div className="flex-1">
                  <div className="font-medium font-body">{themeOption.label}</div>
                  <div className="text-xs text-muted-foreground font-body">{themeOption.description}</div>
                </div>
                {theme === themeOption.value && <span className="ml-2 text-xs text-primary font-body">Active</span>}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
