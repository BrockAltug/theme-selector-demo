"use client"

import { useTheme } from "@/contexts/theme-context"
import { motion, useScroll, useTransform } from "framer-motion"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { useState } from "react"
import { Calendar, Award, Coffee, Users } from "lucide-react"

const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React/Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Framer Motion", level: 85 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 92 },
      { name: "Python", level: 88 },
      { name: "PostgreSQL", level: 85 },
      { name: "GraphQL", level: 82 },
    ],
  },
  {
    category: "Tools & Cloud",
    items: [
      { name: "AWS/Vercel", level: 90 },
      { name: "Docker", level: 85 },
      { name: "Git/GitHub", level: 95 },
      { name: "Figma", level: 80 },
    ],
  },
  {
    category: "Emerging Tech",
    items: [
      { name: "AI/ML Integration", level: 78 },
      { name: "Web3/Blockchain", level: 70 },
      { name: "AR/VR", level: 65 },
      { name: "IoT", level: 60 },
    ],
  },
]

const stats = [
  { label: "Years Experience", value: "5+", icon: Calendar, color: "text-blue-500" },
  { label: "Projects Completed", value: "50+", icon: Award, color: "text-green-500" },
  { label: "Happy Clients", value: "30+", icon: Users, color: "text-purple-500" },
  { label: "Cups of Coffee", value: "2000+", icon: Coffee, color: "text-orange-500" },
]

const timeline = [
  {
    year: "2024",
    title: "Senior Full-Stack Developer",
    company: "TechCorp",
    description: "Leading development of AI-powered applications",
  },
  {
    year: "2022",
    title: "Full-Stack Developer",
    company: "StartupXYZ",
    description: "Built scalable e-commerce platforms",
  },
  {
    year: "2020",
    title: "Frontend Developer",
    company: "DesignStudio",
    description: "Created responsive web applications",
  },
  { year: "2019", title: "Junior Developer", company: "WebAgency", description: "Started journey in web development" },
]

export function About() {
  const { theme } = useTheme()
  const { scrollYProgress } = useScroll()
  const x = useTransform(scrollYProgress, [0.2, 0.6], [-100, 0])

  const [skillsVisible, setSkillsVisible] = useState(false)

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
    <section id="about" className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/20 relative overflow-hidden">
      <motion.div className="absolute inset-0 opacity-30" style={{ x }}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-2xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative">
        <FadeIn>
          <div className="text-center mb-10">
            <h2 className={`text-4xl sm:text-5xl lg:text-6xl ${getHeadingClass()} text-foreground mb-3`}>About Me</h2>
            <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto">
              Passionate about creating digital experiences that make a difference
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <FadeIn direction="left">
              <motion.div
                className="aspect-square overflow-hidden rounded-2xl relative group"
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/cartoon-developer-john-doe.png"
                  alt="John Doe - Full Stack Developer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </FadeIn>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <FadeIn direction="right">
              <div className="space-y-4">
                <p className="text-lg font-body text-foreground leading-relaxed">
                  I'm a full-stack developer with over 5 years of experience building web applications that users love.
                  My journey started with curiosity about how things work, leading me to explore both technical and
                  creative sides of development.
                </p>
                <p className="text-base font-body text-muted-foreground leading-relaxed">
                  When I'm not coding, you'll find me exploring new design trends, contributing to open-source projects,
                  or mentoring aspiring developers. I believe in writing clean, maintainable code and creating inclusive
                  digital experiences.
                </p>
              </div>

              <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <StaggerItem key={index}>
                      <motion.div
                        className="text-center p-4 rounded-xl bg-background/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                        <motion.div
                          className={`text-2xl font-bold ${getHeadingClass()} text-primary mb-1`}
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-xs font-body text-muted-foreground">{stat.label}</div>
                      </motion.div>
                    </StaggerItem>
                  )
                })}
              </StaggerContainer>
            </FadeIn>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className={`${getHeadingClass()} text-2xl font-semibold mb-6 text-foreground`}>Technical Skills</h3>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skillGroup, index) => (
                <StaggerItem key={index}>
                  <motion.div className="space-y-3" onViewportEnter={() => setSkillsVisible(true)}>
                    <h4 className={`${getHeadingClass()} text-lg font-semibold text-primary mb-3`}>
                      {skillGroup.category}
                    </h4>
                    <div className="space-y-3">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <div key={skillIndex} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-body text-foreground">{skill.name}</span>
                            <span className="font-body text-muted-foreground">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: skillsVisible ? `${skill.level}%` : 0 }}
                              transition={{ duration: 1, delay: skillIndex * 0.1 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <div>
            <h3 className={`${getHeadingClass()} text-2xl font-semibold mb-6 text-foreground`}>Experience Timeline</h3>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4 group"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"
                      whileHover={{ scale: 1.2 }}
                    />
                    {index < timeline.length - 1 && <div className="w-0.5 h-16 bg-border mt-2" />}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-body text-primary font-semibold">{item.year}</span>
                      <span className="text-sm font-body text-muted-foreground">•</span>
                      <span className="text-sm font-body text-muted-foreground">{item.company}</span>
                    </div>
                    <h4 className={`${getHeadingClass()} text-lg font-semibold text-foreground mb-1`}>{item.title}</h4>
                    <p className="text-sm font-body text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
