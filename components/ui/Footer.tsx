// components/Footer.tsx
'use client'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')

  const footerSections = [
    {
      title: 'Navigation',
      links: [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Contact', href: '/contact' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms & Conditions', href: '/terms' },
        { name: 'FAQ', href: '/faq' },
      ]
    }
  ]

  const socialLinks = [
    {
      name: 'GitHub',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
      href: 'https://github.com/sergetassiga'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      href: 'https://linkedin.com/in/serge-tassiga'
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.335-11.401c0-.21-.003-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      href: 'https://twitter.com/sergetassiga'
    }
  ]

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Newsletter email:', email)
    setEmail('')
  }

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Brand & Contact Section */}
          <div className="lg:col-span-4">
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center space-x-3">
                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  Serge Tassiga
                </span>
              </Link>

              <p className="text-slate-300 leading-relaxed text-sm max-w-md">
                Full Stack & Backend Engineer specializing in scalable backend systems, 
                high-performance APIs, and cloud-native architectures.
              </p>

              <div className="space-y-3 pt-2">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 text-slate-300 group"
                >
                  <span className="text-cyan-400 bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-slate-900 transition-colors duration-300">
                    📍
                  </span>
                  <span className="text-sm">Kigali, Rwanda</span>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 text-slate-300 group"
                >
                  <span className="text-cyan-400 bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-slate-900 transition-colors duration-300">
                    📞
                  </span>
                  <span className="text-sm">+250 785 658 174</span>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 text-slate-300 group"
                >
                  <span className="text-cyan-400 bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-slate-900 transition-colors duration-300">
                    📧
                  </span>
                  <span className="text-sm">sergetassiga22@gmail.com</span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 md:gap-8">
              {footerSections.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h3 className="text-white font-semibold text-base md:text-lg">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-slate-300 hover:text-cyan-400 text-sm transition-colors duration-300 flex items-center group"
                        >
                          <span className="w-1 h-1 bg-cyan-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="lg:col-span-3 space-y-6">
            {/* Newsletter */}
            <div className="space-y-4 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h4 className="text-white font-semibold">Stay Updated</h4>
              <p className="text-sm text-slate-300">
                Get the latest updates on my projects and tech insights
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-sm text-white placeholder-slate-500"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-cyan-700 transition-all duration-300 text-sm shadow-lg"
                >
                  Subscribe
                </motion.button>
              </form>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Connect With Me</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ y: -3 }}
                    className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-300 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-cyan-600 hover:text-white transition-all duration-300 shadow-lg border border-slate-700"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-slate-400 text-sm text-center lg:text-left">
              © {currentYear} Serge Anan Tassiga. All rights reserved.
              <span className="mx-2 text-slate-600">•</span>
              <span className="text-cyan-400 font-medium">Full Stack & Backend Engineer</span>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
                Privacy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer