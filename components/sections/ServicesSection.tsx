// app/components/ServicesSection.tsx
'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export function ServicesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const services = [
    {
      id: 1,
      title: 'Backend Development',
      icon: '🔧',
      gradient: 'from-indigo-500 to-cyan-500',
      description: 'Scalable server-side solutions that power your business',
      longDescription: 'Build robust, high-performance backend systems with Node.js and NestJS. I create scalable APIs, microservices, and serverless architectures that handle high-volume transactions with ease.',
      price: 'From $2,000/project',
      features: ['RESTful APIs', 'GraphQL', 'Microservices', 'Serverless', 'Authentication', 'Caching Strategies'],
      metrics: ['45% faster deployments', '35% improved performance'],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format'
    },
    {
      id: 2,
      title: 'Full Stack Development',
      icon: '⚛️',
      gradient: 'from-cyan-500 to-indigo-500',
      description: 'End-to-end web applications with modern frameworks',
      longDescription: 'Complete web solutions combining powerful backend systems with responsive, user-friendly frontends. Using Next.js, React, and TypeScript for optimal performance and developer experience.',
      price: 'From $3,000/project',
      features: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'State Management', 'Responsive Design'],
      metrics: ['40% reduced API latency', '98% satisfaction rate'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format'
    },
    {
      id: 3,
      title: 'Cloud Architecture & DevOps',
      icon: '☁️',
      gradient: 'from-indigo-500 to-purple-500',
      description: 'Scalable cloud solutions with automated deployments',
      longDescription: 'Design and implement cloud infrastructure on AWS, Azure, and GCP. Automated CI/CD pipelines, containerization with Docker, and infrastructure as code for reliable, scalable deployments.',
      price: 'From $2,500/month',
      features: ['AWS/Azure/GCP', 'Docker', 'CI/CD Pipelines', 'GitHub Actions', 'Monitoring', 'Auto-scaling'],
      metrics: ['45% faster releases', '99.9% uptime'],
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format'
    },
    {
      id: 4,
      title: 'Database Architecture & Optimization',
      icon: '🗄️',
      gradient: 'from-purple-500 to-indigo-500',
      description: 'High-performance database solutions for scale',
      longDescription: 'Design and optimize database schemas for maximum performance. PostgreSQL and MongoDB expertise with advanced indexing, query optimization, and caching strategies using Redis.',
      price: 'From $1,500/project',
      features: ['PostgreSQL', 'MongoDB', 'Query Optimization', 'Redis Caching', 'Data Migration', 'Backup Strategies'],
      metrics: ['40% faster queries', '35% reduced latency'],
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format'
    },
    {
      id: 5,
      title: 'Technical Consulting',
      icon: '💡',
      gradient: 'from-cyan-500 to-teal-500',
      description: 'Expert guidance for technical decisions',
      longDescription: 'Strategic consulting for system architecture, technology stack selection, and performance optimization. Help your team adopt best practices and modern development methodologies.',
      price: 'From $150/hour',
      features: ['Architecture Review', 'Code Audit', 'Performance Optimization', 'Team Training', 'Best Practices', 'Tech Stack Planning'],
      metrics: ['35% better performance', 'Reduced technical debt'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format'
    },
    {
      id: 6,
      title: 'Legacy System Modernization',
      icon: '🔄',
      gradient: 'from-teal-500 to-cyan-500',
      description: 'Transform outdated systems to modern architectures',
      longDescription: 'Migrate legacy applications to modern frameworks and architectures. Improve maintainability, performance, and scalability while preserving business logic and data integrity.',
      price: 'From $5,000/project',
      features: ['Code Migration', 'API Modernization', 'Cloud Migration', 'Refactoring', 'Testing Strategy', 'Documentation'],
      metrics: ['Improved maintainability', 'Reduced operational costs'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format'
    }
  ]

  const techStack = [
    { name: 'Node.js', icon: '🟢', level: 95 },
    { name: 'NestJS', icon: '🔴', level: 92 },
    { name: 'TypeScript', icon: '📘', level: 90 },
    { name: 'React', icon: '⚛️', level: 88 },
    { name: 'Next.js', icon: '▲', level: 85 },
    { name: 'PostgreSQL', icon: '🐘', level: 90 },
    { name: 'MongoDB', icon: '🍃', level: 85 },
    { name: 'AWS', icon: '☁️', level: 85 },
    { name: 'Docker', icon: '🐳', level: 88 },
    { name: 'Redis', icon: '🔴', level: 82 }
  ]

  const processes = [
    { step: '01', title: 'Discovery & Analysis', desc: 'Understand your goals and requirements', icon: '🎯', duration: '1-2 weeks' },
    { step: '02', title: 'Architecture Design', desc: 'Plan scalable system architecture', icon: '📐', duration: '1 week' },
    { step: '03', title: 'Development', desc: 'Build with best practices and testing', icon: '⚡', duration: '2-8 weeks' },
    { step: '04', title: 'Deployment & Monitoring', desc: 'Deploy with CI/CD and monitoring', icon: '🚀', duration: '1 week' },
    { step: '05', title: 'Optimization', desc: 'Continuous improvement and scaling', icon: '📈', duration: 'Ongoing' }
  ]

  return (
    <section ref={ref} className="relative bg-slate-950 py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <circle cx="200" cy="200" r="300" fill="url(#grad)">
              <animate attributeName="r" values="300;400;300" dur="10s" repeatCount="indefinite" />
            </circle>
            <circle cx="800" cy="700" r="250" fill="url(#grad)">
              <animate attributeName="r" values="250;350;250" dur="8s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 bg-slate-800 text-cyan-400 px-6 py-2 rounded-full mb-6 border border-cyan-500/30"
          >
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium">What I Offer</span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Technical <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Specialized backend and full-stack engineering solutions for modern businesses
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setSelectedService(service.id)}
              onHoverEnd={() => setSelectedService(null)}
              className="group relative bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden cursor-pointer hover:border-cyan-500/50 transition-all duration-300"
            >
              {/* Gradient Bar */}
              <div className={`h-1 bg-gradient-to-r ${service.gradient}`} />
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <span className="text-3xl">{service.icon}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-cyan-400">{service.price}</p>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{service.description}</p>
                
                {/* Metrics */}
                <div className="flex gap-2 mb-4">
                  {service.metrics.map((metric, idx) => (
                    <span key={idx} className="px-2 py-1 bg-slate-700 rounded-full text-xs text-cyan-400">
                      {metric}
                    </span>
                  ))}
                </div>
                
                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.slice(0, 4).map((feature, idx) => (
                    <span key={idx} className="bg-slate-700/50 text-slate-300 px-2 py-1 rounded-full text-xs">
                      {feature}
                    </span>
                  ))}
                  {service.features.length > 4 && (
                    <span className="text-xs text-slate-500">+{service.features.length - 4} more</span>
                  )}
                </div>
                
                <Link href="/contact">
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-cyan-400 font-semibold group"
                  >
                    Get Started
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Tech Stack Expertise
            </h3>
            <p className="text-slate-400">Technologies I specialize in</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-slate-800 rounded-2xl p-4 text-center border border-slate-700 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="text-3xl mb-2">{tech.icon}</div>
                <div className="text-white font-medium mb-2">{tech.name}</div>
                <div className="relative h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${tech.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full`}
                  />
                </div>
                <div className="text-xs text-slate-400 mt-1">{tech.level}%</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-slate-800 rounded-3xl border border-slate-700 p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
              My Development Process
            </h3>
            <p className="text-slate-400">A systematic approach to delivering excellence</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-indigo-500 to-cyan-500 hidden md:block" />
            
            {processes.map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-6 mb-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="flex-1">
                  <div className="bg-slate-700/50 rounded-2xl p-5 border border-slate-600 hover:border-cyan-500/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{process.icon}</span>
                      <h4 className="text-lg font-bold text-white">{process.title}</h4>
                    </div>
                    <p className="text-slate-300 text-sm mb-2">{process.desc}</p>
                    <p className="text-cyan-400 text-xs">⏱️ {process.duration}</p>
                  </div>
                </div>
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center z-10">
                  <span className="text-xs font-bold text-white">{process.step}</span>
                </div>
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Project Examples Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Featured Projects
            </h3>
            <p className="text-slate-400">Real-world solutions I've delivered</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Multi-Tenant Billing System',
                description: 'Scalable subscription management API for SaaS clients',
                tech: 'NestJS, PostgreSQL, Redis, AWS',
                metric: '45% faster deployments'
              },
              {
                title: 'Accounting Management System',
                description: 'Full-featured accounting platform for SMEs',
                tech: 'Next.js, NestJS, PostgreSQL',
                metric: '30% improved performance'
              },
              {
                title: 'HR Management Platform',
                description: 'Payroll and employee lifecycle management system',
                tech: 'React, NestJS, PostgreSQL',
                metric: '40% reduced latency'
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="text-cyan-400 text-3xl mb-3">📊</div>
                <h4 className="text-lg font-bold text-white mb-2">{project.title}</h4>
                <p className="text-slate-400 text-sm mb-3">{project.description}</p>
                <p className="text-xs text-cyan-400 mb-2">{project.tech}</p>
                <span className="inline-block px-2 py-1 bg-slate-700 rounded-full text-xs text-green-400">
                  {project.metric}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-24 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-3xl p-12 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Something Great?
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create a solution that exceeds expectations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Start Your Project
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all"
              >
                Free Consultation
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}