// app/components/AboutSection.tsx
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeTimeline, setActiveTimeline] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])

  // Your professional timeline
  const timelineEvents = [
    {
      year: '2024 - Present',
      title: 'CTO Level - Full Stack Engineer',
      company: 'Conta A-Z',
      description: 'Leading development of accounting SaaS modules, architected PostgreSQL databases, and implemented CI/CD pipelines.',
      achievements: ['45% faster deployments', '30% improved request performance']
    },
    {
      year: '2024 - Present',
      title: 'Team Lead & Administrative Manager',
      company: 'NS Global Expertise',
      description: 'Delivered full-stack applications and led digital transformation projects for World Bank-funded initiatives.',
      achievements: ['40% reduced API latency', 'Led recruitment & mentoring']
    },
    {
      year: '2023 - 2024',
      title: 'Backend Engineer',
      company: 'US FinTech & HR-Tech Startups',
      description: 'Built scalable microservices for high-volume transactions and payroll management systems.',
      achievements: ['35% reduced API latency', 'Optimized database indexing']
    },
    {
      year: '2023 - 2024',
      title: 'Data Scientist',
      company: 'International Institute of Tropical Agriculture',
      description: 'Developed ML models for crop disease forecasting and agricultural optimization.',
      achievements: ['35% improved prediction accuracy', '15% better actionable insights']
    }
  ]

  const skills = [
    { category: 'Backend', items: ['Node.js', 'NestJS', 'GraphQL', 'Microservices', 'REST APIs'], level: 95 },
    { category: 'Frontend', items: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'], level: 90 },
    { category: 'Cloud & DevOps', items: ['AWS', 'Docker', 'CI/CD', 'GitHub Actions'], level: 85 },
    { category: 'Databases', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'], level: 90 }
  ]

  const achievements = [
    { value: '4+', label: 'Years Experience', icon: '💼' },
    { value: '45%', label: 'Faster Deployments', icon: '🚀' },
    { value: '35%', label: 'API Improvement', icon: '⚡' },
    { value: '40%', label: 'Response Time', icon: '🎯' },
    { value: '50+', label: 'Clients Served', icon: '🤝' },
    { value: '98%', label: 'Satisfaction Rate', icon: '⭐' }
  ]

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'African Leadership University',
      location: 'Kigali, Rwanda',
      period: '2019 - 2024',
      highlights: ['Full Stack Development', 'Cloud Computing', 'Data Science']
    }
  ]

  const certifications = [
    { name: 'Microsoft Learn Student Ambassador', issuer: 'Microsoft', year: '2023-2024', icon: '🎓' },
    { name: 'Google Africa Developer Scholar', issuer: 'Google', year: '2021-2022', icon: '🌍' },
    { name: 'Africa CEO Forum 2024 Volunteer', issuer: 'Africa CEO Forum', year: '2024', icon: '👥' }
  ]

  return (
    <section ref={containerRef} className="relative bg-slate-950">
      {/* Hero with Parallax */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-cyan-900/90 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format"
            alt="Software development team"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        
        <div className="relative z-20 text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              Full Stack &
              <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Backend Engineer
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Building scalable backend systems and high-performance APIs that power modern businesses
            </p>
          </motion.div>
        </div>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-cyan-400 rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </div>

      {/* Stats with Animation */}
      <div className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {achievements.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="text-center bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section with Professional Background */}
      <div className="py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">My Journey</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
                From Computer Science
                <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  to Full Stack Excellence
                </span>
              </h2>
              <div className="space-y-6">
                <p className="text-slate-300 leading-relaxed">
                  With a Bachelor's degree in Computer Science from African Leadership University, 
                  I've dedicated my career to mastering backend architectures and scalable systems.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Over 4+ years of experience, I've specialized in Node.js/NestJS for building high-performance 
                  APIs and microservices. My work spans across startups and enterprise clients globally, 
                  delivering measurable improvements in performance and efficiency.
                </p>
                <blockquote className="border-l-4 border-cyan-500 pl-4 italic text-slate-300">
                  "I believe in writing clean, scalable code that solves real business problems while maintaining 
                  the highest standards of performance and security."
                </blockquote>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                <Image
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format"
                  alt="Coding workspace"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">4+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Skills Section with Progress Bars */}
      <div className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Technical Expertise
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Specialized in modern technologies and best practices
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
              >
                <h3 className="text-xl font-bold text-white mb-4">{skill.category}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {skill.items.map((item) => (
                    <span key={item} className="px-3 py-1 bg-slate-700 rounded-full text-sm text-cyan-400">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="absolute h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"
                  />
                </div>
                <div className="text-right text-sm text-slate-400 mt-1">{skill.level}% Proficiency</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Professional Journey
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Experience that shaped my expertise
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-indigo-500 to-cyan-500" />
            
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="flex-1">
                  <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300">
                    <div className="text-cyan-400 text-sm mb-2">{event.year}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-cyan-400 text-sm mb-3">{event.company}</p>
                    <p className="text-slate-300 mb-4">{event.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {event.achievements.map((achievement, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-700 rounded-full text-xs text-cyan-400">
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-slate-900" />
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Education & Certifications */}
      <div className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-3xl">🎓</span> Education
              </h3>
              {education.map((edu, index) => (
                <div key={index} className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <div className="text-cyan-400 text-sm mb-2">{edu.period}</div>
                  <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                  <p className="text-slate-300 mb-2">{edu.school}</p>
                  <p className="text-slate-400 text-sm mb-4">{edu.location}</p>
                  <div className="flex flex-wrap gap-2">
                    {edu.highlights.map((highlight, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-700 rounded-full text-xs text-cyan-400">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-3xl">🏆</span> Certifications & Achievements
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-800 rounded-2xl p-5 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{cert.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white mb-1">{cert.name}</h4>
                        <p className="text-cyan-400 text-sm">{cert.issuer}</p>
                        <p className="text-slate-400 text-xs mt-1">{cert.year}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Build Something Amazing Together
            </h2>
            <p className="text-xl text-white/90 mb-10">
              I'm always open to discussing new projects, innovative ideas, and opportunities to collaborate.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:shadow-2xl transition-all duration-300"
              >
                Get in Touch
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}