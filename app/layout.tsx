import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Space_Grotesk, DM_Sans, Playfair_Display, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/contexts/theme-context"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
})

export const metadata: Metadata = {
  title: "Portfolio - Multi-Theme Experience",
  description: "Professional portfolio with multiple branded visual themes",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
  --font-space-grotesk: ${spaceGrotesk.variable};
  --font-dm-sans: ${dmSans.variable};
  --font-playfair: ${playfairDisplay.variable};
  --font-jetbrains: ${jetbrainsMono.variable};
}
        `}</style>
      </head>
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable}`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
