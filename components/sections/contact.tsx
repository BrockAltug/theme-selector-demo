"use client"

import type React from "react"
import { useState } from "react"
import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send, MessageCircle, Calendar, Zap } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "altugba99@gmail.com",
    href: "mailto:altugba99@gmail.com",
    description: "Best for project inquiries",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    description: "Available 9 AM - 6 PM PST",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "San Francisco, CA",
    href: "#",
    description: "Open to remote work",
  },
]

const quickActions = [
  {
    icon: MessageCircle,
    label: "Quick Chat",
    description: "15-min consultation",
    action: "chat",
  },
  {
    icon: Calendar,
    label: "Schedule Call",
    description: "Book a meeting",
    action: "schedule",
  },
  {
    icon: Zap,
    label: "Project Quote",
    description: "Get estimate",
    action: "quote",
  },
]

export function Contact() {
  const { theme } = useTheme()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0.8, 1], [50, 0])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    budget: "",
    timeline: "",
  })

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "", budget: "", timeline: "" })

    // Reset success state after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleQuickAction = (action: (typeof quickActions)[0]) => {
    // Placeholder function - no actual functionality
    console.log(`${action.label} clicked - placeholder only`)
  }

  return (
    <section id="contact" className="py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"
        style={{ y }}
      />

      <div className="max-w-7xl mx-auto relative">
        <FadeIn>
          <div className="text-center mb-10">
            <h2 className={`text-4xl sm:text-5xl lg:text-6xl ${getHeadingClass()} text-foreground mb-3`}>
              Let's Work Together
            </h2>
            <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your next project
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <motion.button
                  key={index}
                  className="flex items-center gap-3 px-6 py-3 bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl hover:border-primary/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleQuickAction(action)}
                >
                  <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="font-body font-semibold text-foreground text-sm">{action.label}</div>
                    <div className="font-body text-muted-foreground text-xs">{action.description}</div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <StaggerContainer className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <StaggerItem key={index}>
                    <motion.a
                      href={info.href}
                      className="flex items-start space-x-4 p-4 rounded-xl hover:bg-muted/50 transition-all duration-300 group border border-transparent hover:border-primary/20"
                      whileHover={{ scale: 1.02, x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="flex-shrink-0 p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                      >
                        <Icon className="h-5 w-5 text-primary" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className={`${getHeadingClass()} text-lg font-semibold text-foreground`}>{info.title}</h3>
                        <p className="font-body text-muted-foreground mb-1">{info.value}</p>
                        <p className="font-body text-muted-foreground text-sm">{info.description}</p>
                      </div>
                    </motion.a>
                  </StaggerItem>
                )
              })}
            </StaggerContainer>

            <FadeIn delay={0.6}>
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-body font-semibold text-green-700 dark:text-green-400 text-sm">
                    Available for new projects
                  </span>
                </div>
                <p className="font-body text-muted-foreground text-sm">
                  Currently accepting projects starting in Q2 2024
                </p>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-3">
            <FadeIn direction="right">
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                <Card className="border-2 border-primary/20 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-md shadow-2xl hover:shadow-3xl transition-all duration-300 hover:border-primary/40">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Send className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className={`${getHeadingClass()} text-2xl text-foreground`}>
                          Send a Message
                        </CardTitle>
                        <CardDescription className="font-body text-muted-foreground">
                          Tell me about your project and I'll get back to you within 24 hours
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <label htmlFor="name" className="text-sm font-body font-medium">
                            Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </motion.div>
                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <label htmlFor="email" className="text-sm font-body font-medium">
                            Email *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <label htmlFor="budget" className="text-sm font-body font-medium">
                            Budget Range
                          </label>
                          <Input
                            id="budget"
                            name="budget"
                            placeholder="$5k - $10k"
                            value={formData.budget}
                            onChange={handleInputChange}
                          />
                        </motion.div>
                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <label htmlFor="timeline" className="text-sm font-body font-medium">
                            Timeline
                          </label>
                          <Input
                            id="timeline"
                            name="timeline"
                            placeholder="2-3 months"
                            value={formData.timeline}
                            onChange={handleInputChange}
                          />
                        </motion.div>
                      </div>

                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <label htmlFor="subject" className="text-sm font-body font-medium">
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Project inquiry"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                        />
                      </motion.div>

                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <label htmlFor="message" className="text-sm font-body font-medium">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell me about your project, goals, and any specific requirements..."
                          className="min-h-[120px] resize-none"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          className={`w-full font-body relative overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 ${
                            isSubmitted
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                          }`}
                          disabled={isSubmitting}
                          size="lg"
                        >
                          <div
                            className={`absolute inset-0 bg-gradient-to-r transition-opacity duration-300 ${
                              isSubmitted
                                ? "from-green-600 to-green-700 opacity-100"
                                : "from-primary to-secondary opacity-0 group-hover:opacity-100"
                            }`}
                          />
                          <div className="relative flex items-center justify-center">
                            {isSubmitting ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="mr-2"
                              >
                                <Send className="h-4 w-4" />
                              </motion.div>
                            ) : isSubmitted ? (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mr-2">
                                ✓
                              </motion.div>
                            ) : (
                              <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                            )}
                            {isSubmitting ? "Sending..." : isSubmitted ? "Message Sent!" : "Send Message"}
                          </div>
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
