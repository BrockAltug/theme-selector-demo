"use client"

import { useTheme } from "@/contexts/theme-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExternalLink, Github, Search, Filter, Star, Eye } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { FadeIn } from "@/components/animations/fade-in"
import { useState, useMemo } from "react"

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with AI-powered recommendations",
    image: "/modern-ecommerce-interface.png",
    tech: ["Next.js", "TypeScript", "Stripe", "Supabase", "AI"],
    github: "https://github.com/johndoe/ecommerce-platform",
    live: "https://ecommerce-demo.vercel.app",
    featured: true,
    category: "Full-Stack",
    stats: { stars: 124, views: 2300 },
  },
  {
    title: "Task Management App",
    description: "Real-time collaborative workspace with advanced analytics",
    image: "/task-management-dashboard.png",
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "D3.js"],
    github: "https://github.com/johndoe/task-manager",
    live: "https://taskflow-demo.vercel.app",
    featured: true,
    category: "Full-Stack",
    stats: { stars: 89, views: 1800 },
  },
  {
    title: "AI Content Generator",
    description: "Multi-modal AI tool with custom model fine-tuning",
    image: "/ai-content-generator-interface.png",
    tech: ["Next.js", "OpenAI API", "Python", "TensorFlow"],
    github: "https://github.com/johndoe/ai-content-gen",
    live: "https://ai-content-demo.vercel.app",
    featured: false,
    category: "AI/ML",
    stats: { stars: 156, views: 3200 },
  },
  {
    title: "React Component Library",
    description: "Comprehensive UI library with 50+ customizable components",
    image: "/react-component-library.png",
    tech: ["React", "TypeScript", "Storybook", "Tailwind CSS"],
    github: "https://github.com/johndoe/react-ui-lib",
    live: "https://ui-lib-demo.vercel.app",
    featured: false,
    category: "Frontend",
    stats: { stars: 203, views: 4100 },
  },
  {
    title: "Microservices API Gateway",
    description: "Scalable API gateway with load balancing and monitoring",
    image: "/api-gateway-dashboard.png",
    tech: ["Node.js", "Docker", "Kubernetes", "Redis", "PostgreSQL"],
    github: "https://github.com/johndoe/api-gateway",
    live: "https://api-gateway-demo.vercel.app",
    featured: false,
    category: "Backend",
    stats: { stars: 78, views: 1500 },
  },
  {
    title: "Machine Learning Pipeline",
    description: "End-to-end ML pipeline for predictive analytics",
    image: "/ml-pipeline-dashboard.png",
    tech: ["Python", "TensorFlow", "Apache Airflow", "MLflow"],
    github: "https://github.com/johndoe/ml-pipeline",
    live: "https://ml-pipeline-demo.vercel.app",
    featured: true,
    category: "AI/ML",
    stats: { stars: 167, views: 2800 },
  },
  {
    title: "Real-time Chat Application",
    description: "Secure messaging platform with end-to-end encryption",
    image: "/modern-dark-chat-ui.png",
    tech: ["Next.js", "Socket.io", "WebRTC", "Prisma", "PostgreSQL"],
    github: "https://github.com/johndoe/secure-chat",
    live: "https://secure-chat-demo.vercel.app",
    featured: false,
    category: "Full-Stack",
    stats: { stars: 145, views: 2200 },
  },
  {
    title: "Data Visualization Dashboard",
    description: "Interactive analytics dashboard with real-time updates",
    image: "/data-visualization-dashboard.png",
    tech: ["React", "D3.js", "Chart.js", "WebSocket", "Express"],
    github: "https://github.com/johndoe/data-viz",
    live: "https://data-viz-demo.vercel.app",
    featured: false,
    category: "Frontend",
    stats: { stars: 92, views: 1700 },
  },
  {
    title: "Blockchain Voting System",
    description: "Decentralized voting platform with smart contracts",
    image: "/ethereum-voting-interface.png",
    tech: ["Solidity", "Web3.js", "React", "Ethereum", "IPFS"],
    github: "https://github.com/johndoe/blockchain-voting",
    live: "https://voting-demo.vercel.app",
    featured: false,
    category: "Full-Stack",
    stats: { stars: 234, views: 3500 },
  },
  {
    title: "GraphQL API Server",
    description: "High-performance GraphQL server with caching and subscriptions",
    image: "/graphql-api-playground.png",
    tech: ["Node.js", "GraphQL", "Apollo Server", "Redis", "MongoDB"],
    github: "https://github.com/johndoe/graphql-server",
    live: "https://graphql-demo.vercel.app",
    featured: false,
    category: "Backend",
    stats: { stars: 118, views: 1900 },
  },
  {
    title: "Mobile App with React Native",
    description: "Cross-platform mobile app with offline capabilities",
    image: "/react-native-mobile-app.png",
    tech: ["React Native", "Expo", "AsyncStorage", "Firebase"],
    github: "https://github.com/johndoe/mobile-app",
    live: "https://mobile-demo.vercel.app",
    featured: false,
    category: "Frontend",
    stats: { stars: 76, views: 1400 },
  },
  {
    title: "Computer Vision Platform",
    description: "AI-powered image recognition and processing platform",
    image: "/computer-vision-platform.png",
    tech: ["Python", "OpenCV", "PyTorch", "FastAPI", "Docker"],
    github: "https://github.com/johndoe/cv-platform",
    live: "https://cv-demo.vercel.app",
    featured: false,
    category: "AI/ML",
    stats: { stars: 189, views: 2900 },
  },
  {
    title: "DevOps Automation Suite",
    description: "Complete CI/CD pipeline with monitoring and deployment",
    image: "/devops-automation-dashboard.png",
    tech: ["Jenkins", "Docker", "Kubernetes", "Terraform", "AWS"],
    github: "https://github.com/johndoe/devops-suite",
    live: "https://devops-demo.vercel.app",
    featured: false,
    category: "Backend",
    stats: { stars: 134, views: 2100 },
  },
]

const categories = ["All", "Full-Stack", "AI/ML", "Frontend", "Backend"]

export function Projects() {
  const { theme } = useTheme()
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0.1, 0.4], [0.8, 1])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({})

  const filteredProjects = useMemo(() => {
    let filtered = [...projects] // Always start fresh

    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((project) => project.category === selectedCategory)
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.tech.some((tech) => tech.toLowerCase().includes(searchLower)),
      )
    }

    return filtered
  }, [searchTerm, selectedCategory])

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

  const handleLinkClick = (url: string, type: "github" | "demo", projectTitle: string) => {
    const key = `${projectTitle}-${type}`
    setLoadingStates((prev) => ({ ...prev, [key]: true }))

    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, [key]: false }))
      window.open(url, "_blank", "noopener,noreferrer")
    }, 800)
  }

  return (
    <section id="projects" className="py-3 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />

      <motion.div className="max-w-7xl mx-auto relative" style={{ scale }}>
        <FadeIn>
          <div className="text-center mb-8">
            <h2 className={`text-4xl sm:text-5xl lg:text-6xl ${getHeadingClass()} text-foreground mb-2`}>
              Featured Projects
            </h2>
            <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto">
              Innovative solutions that push the boundaries of technology
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 mb-6 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects, technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  <Filter className="mr-1 h-3 w-3" />
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={`${project.title}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="h-full"
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 h-full overflow-hidden border-0 bg-background/50 backdrop-blur-sm">
                <div className="relative aspect-video overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute bottom-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-1 bg-black/70 rounded-full px-2 py-1 text-xs text-white">
                      <Star className="h-3 w-3" />
                      {project.stats.stars}
                    </div>
                    <div className="flex items-center gap-1 bg-black/70 rounded-full px-2 py-1 text-xs text-white">
                      <Eye className="h-3 w-3" />
                      {project.stats.views}
                    </div>
                  </div>

                  {project.featured && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </div>
                  )}
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className={`${getHeadingClass()} text-xl group-hover:text-primary transition-colors`}>
                      {project.title}
                    </CardTitle>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                      {project.category}
                    </span>
                  </div>
                  <CardDescription className="font-body text-sm leading-relaxed">{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="px-2 py-1 text-xs font-body bg-primary/10 text-primary rounded-md border border-primary/20"
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "hsl(var(--primary))",
                          color: "hsl(var(--primary-foreground))",
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full group/btn bg-transparent"
                        onClick={() => handleLinkClick(project.github, "github", project.title)}
                        disabled={loadingStates[`${project.title}-github`]}
                      >
                        {loadingStates[`${project.title}-github`] ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="h-4 w-4 mr-2"
                          >
                            <Github className="h-4 w-4" />
                          </motion.div>
                        ) : (
                          <Github className="h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                        )}
                        {loadingStates[`${project.title}-github`] ? "Loading..." : "Code"}
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                      <Button
                        size="sm"
                        className="w-full group/btn"
                        onClick={() => handleLinkClick(project.live, "demo", project.title)}
                        disabled={loadingStates[`${project.title}-demo`]}
                      >
                        {loadingStates[`${project.title}-demo`] ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="h-4 w-4 mr-2"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </motion.div>
                        ) : (
                          <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        )}
                        {loadingStates[`${project.title}-demo`] ? "Loading..." : "Live Demo"}
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <FadeIn>
            <div className="text-center py-8">
              <p className="text-muted-foreground font-body text-lg">No projects found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
                className="mt-4 bg-transparent"
              >
                Clear All Filters
              </Button>
            </div>
          </FadeIn>
        )}
      </motion.div>
    </section>
  )
}
