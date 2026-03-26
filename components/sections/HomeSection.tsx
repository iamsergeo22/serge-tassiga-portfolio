// app/components/HomeSection.tsx
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'

export function HomeSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Stats based on your achievements
  const stats = [
    { value: '4+', label: 'Years Experience', icon: '💼' },
    { value: '45%', label: 'Faster Deployments', icon: '🚀' },
    { value: '35%', label: 'API Improvement', icon: '⚡' },
    { value: '40%', label: 'Response Time', icon: '🎯' },
  ]

  const technologies = [
    { name: 'Node.js', icon: '🟢', color: 'from-green-500/20 to-green-600/20' },
    { name: 'NestJS', icon: '🔴', color: 'from-red-500/20 to-red-600/20' },
    { name: 'React', icon: '⚛️', color: 'from-cyan-500/20 to-cyan-600/20' },
    { name: 'TypeScript', icon: '📘', color: 'from-blue-500/20 to-blue-600/20' },
    { name: 'AWS', icon: '☁️', color: 'from-yellow-500/20 to-yellow-600/20' },
    { name: 'PostgreSQL', icon: '🐘', color: 'from-indigo-500/20 to-indigo-600/20' },
  ]

  const testimonials = [
    { 
      name: 'John Smith', 
      company: 'US FinTech Startup', 
      text: 'Serge delivered exceptional backend architecture for our payment processing system. His expertise in NestJS and microservices was invaluable.', 
      rating: 5 
    },
    { 
      name: 'Yann Cedric', 
      company: 'Conta A-Z', 
      text: 'Working with Serge transformed our accounting SaaS platform. His attention to detail and system design skills are outstanding.', 
      rating: 5 
    },
    { 
      name: 'David Wilson', 
      company: 'US HR-Tech Startup', 
      text: 'Serge built our payroll management system from scratch. The performance optimization and clean code exceeded our expectations.', 
      rating: 5 
    }
  ]

  const featuredProjects = [
    {
      title: 'Multi-Tenant Billing System',
      tech: 'NestJS, PostgreSQL, Redis, AWS',
      description: 'Scalable subscription management APIs serving multiple SaaS clients with automated billing and analytics.',
      metrics: '45% faster deployment cycles',
      gradient: 'from-indigo-500 to-cyan-500'
    },
    {
      title: 'Accounting Management System',
      tech: 'Next.js, NestJS, PostgreSQL',
      description: 'Full-featured accounting platform for SMEs to track financial statements and business performance.',
      metrics: '30% improved request performance',
      gradient: 'from-cyan-500 to-indigo-500'
    },
    {
      title: 'HR Management Platform',
      tech: 'React, NestJS, PostgreSQL',
      description: 'Comprehensive platform for payroll, leave management, and employee lifecycle tracking.',
      metrics: '40% reduced API latency',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ]

  return (
    <section ref={containerRef} className="relative bg-slate-950 overflow-hidden">
      {/* Hero Section with Parallax */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-cyan-950">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-20 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl opacity-20"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-20"
          />
        </div>

        {/* Floating Particles */}
        {isMounted && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => {
              const randomX = Math.random() * 100
              const randomY = Math.random() * 100
              const randomDuration = 3 + Math.random() * 2
              const randomDelay = Math.random() * 5
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full"
                  initial={{
                    left: `${randomX}%`,
                    top: `${randomY}%`,
                    opacity: 0
                  }}
                  animate={{
                    top: [`${randomY}%`, `${randomY - 20}%`, `${randomY - 40}%`],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{
                    duration: randomDuration,
                    repeat: Infinity,
                    delay: randomDelay,
                    ease: "linear"
                  }}
                />
              )
            })}
          </div>
        )}

        <motion.div 
          style={{ y: heroY }}
          className="relative z-10 container mx-auto px-6"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm shadow-lg px-4 py-2 rounded-full mb-8 border border-cyan-500/30"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  <span className="text-sm font-medium text-cyan-400">🚀 Full Stack & Backend Engineer</span>
                </motion.div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              >
                <span className="text-white">Serge Anan</span>
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                    Tassiga
                  </span>
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 20"
                  >
                    <path
                      d="M0 10 L300 10"
                      stroke="url(#underlineGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <defs>
                      <linearGradient id="underlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4F46E5" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-slate-300 mb-8 leading-relaxed max-w-xl"
              >
                Full Stack Engineer specializing in scalable backend systems, high-performance APIs, 
                and cloud-native architectures. 4+ years of experience delivering impactful solutions.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(6, 182, 212, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-full font-semibold overflow-hidden shadow-xl"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Hire Me
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-cyan-700"
                      initial={{ x: '100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>
                
                <Link href="/services">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-cyan-500 text-cyan-400 rounded-full font-semibold hover:bg-cyan-500/10 transition-all duration-300"
                  >
                    View Work
                  </motion.button>
                </Link>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-12 pt-8 border-t border-slate-800"
              >
                <p className="text-slate-400 text-sm mb-4">Tech Stack & Expertise</p>
                <div className="flex flex-wrap gap-3">
                  {technologies.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                      whileHover={{ y: -2 }}
                      className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${tech.color} border border-slate-700 backdrop-blur-sm`}
                    >
                      <span className="text-sm text-slate-300">
                        {tech.icon} {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Animated Profile Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative perspective-1000">
                <motion.div
                  whileHover={{ rotateY: 5, rotateX: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 z-10" />
                  <div className="relative p-8 text-center">
                    {/* Profile Image Placeholder */}
                    <div className="relative w-48 h-48 mx-auto mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full opacity-75 blur-xl animate-pulse" />
                      <div className="relative w-full h-full bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-full flex items-center justify-center overflow-hidden">
                        <span className="text-6xl font-bold text-white">ST</span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">Serge Anan Tassiga</h3>
                    <p className="text-cyan-400 mb-4">Full Stack & Backend Engineer</p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      {stats.map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="bg-slate-800/50 rounded-xl p-3 border border-slate-700"
                        >
                          <div className="text-2xl mb-1">{stat.icon}</div>
                          <div className="text-xl font-bold text-white">{stat.value}</div>
                          <div className="text-xs text-slate-400">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <span className="text-xs text-slate-400 uppercase tracking-wider mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Featured Projects Section */}
      <div className="py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Featured Projects</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
              Building Scalable Solutions
            </h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
              Real-world projects delivering measurable impact and performance improvements
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 h-full">
                  <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-cyan-400 text-sm mb-3">{project.tech}</p>
                    <p className="text-slate-400 mb-4">{project.description}</p>
                    <div className="inline-flex items-center gap-2 bg-slate-700/50 rounded-full px-3 py-1">
                      <span className="text-green-400 text-sm">📊</span>
                      <span className="text-sm text-slate-300">{project.metrics}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Client Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
              What Clients Say
            </h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <AnimatedTestimonial
              testimonial={testimonials[activeTestimonial]}
              key={activeTestimonial}
            />

            {/* Carousel Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeTestimonial === index ? 'w-8 bg-cyan-500' : 'w-2 bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-cyan-600">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl opacity-20"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl opacity-20"
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Build Something Great?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Let's collaborate on your next project. I'm available for freelance work and full-time opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:shadow-2xl transition-all duration-300"
                >
                  Get in Touch
                </motion.button>
              </Link>
              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  View Services
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Animated Testimonial Component
function AnimatedTestimonial({ testimonial }: { testimonial: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-700"
    >
      <div className="flex gap-1 mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
      <p className="text-xl text-slate-300 mb-8 leading-relaxed">"{testimonial.text}"</p>
      <div>
        <p className="font-bold text-white">{testimonial.name}</p>
        <p className="text-cyan-400">{testimonial.company}</p>
      </div>
    </motion.div>
  )
}