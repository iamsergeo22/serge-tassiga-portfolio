// app/components/ContactSection.tsx
'use client'

import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'

export function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize EmailJS once when component mounts
  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init('7UxOgw10-8-4Desnt')
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Please fill in all required fields')
      }

      // Template variables that match your EmailJS template
      const templateParams = {
        name: String(formData.name),
        email: String(formData.email),
        phone: String(formData.phone || 'Not provided'),
        service: String(formData.service || 'Not specified'),
        message: String(formData.message)
      }

      console.log('=== EMAILJS DEBUG ===')
      console.log('Service ID:', 'service_ktot1wd')
      console.log('Template ID:', 'template_j804y2e')
      console.log('Public Key:', '7UxOgw10-8-4Desnt')
      console.log('Params:', templateParams)
      console.log('=====================')

      // Send email
      const response = await emailjs.send(
        'service_ktot1wd',
        'template_j804y2e',
        templateParams
      )

      console.log('Success response:', response)

      setIsSubmitted(true)
      setFormData({ name: '', email: '', phone: '', service: '', message: '' })
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (err: any) {
      console.error('=== EMAILJS ERROR ===')
      console.error('Error object:', err)
      console.error('Error status:', err?.status)
      console.error('Error text:', err?.text)
      console.error('Error message:', err?.message)
      console.error('=====================')

      // Display more specific error message
      let errorMessage = 'Something went wrong. '
      if (err?.text) {
        errorMessage += err.text
      } else if (err?.message) {
        errorMessage += err.message
      } else {
        errorMessage += 'Please try again or contact me directly via email.'
      }

      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: '📞',
      title: 'Call Me',
      info: '+250 785 658 174',
      action: 'Call Now',
      link: 'tel:+250785658174',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: '✉️',
      title: 'Email Me',
      info: 'sergetassiga22@gmail.com',
      action: 'Send Email',
      link: 'mailto:sergetassiga22@gmail.com',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: '💬',
      title: 'Skype',
      info: 'Serge Tassiga',
      action: 'Chat Now',
      link: 'skype:live:sergetassiga?chat',
      color: 'from-indigo-500 to-cyan-500'
    },
    {
      icon: '🔗',
      title: 'LinkedIn',
      info: 'Serge Anan Tassiga',
      action: 'Connect',
      link: 'https://linkedin.com/in/serge-tassiga',
      color: 'from-blue-500 to-indigo-600'
    }
  ]

  const serviceOptions = [
    'Backend Development (Node.js/NestJS)',
    'Full Stack Development',
    'Cloud Architecture & DevOps',
    'Database Architecture & Optimization',
    'Technical Consulting',
    'Legacy System Modernization',
    'Other'
  ]

  const availability = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM (CAT)', icon: '💼' },
    { day: 'Saturday', hours: '10:00 AM - 2:00 PM (CAT)', icon: '🌤️' },
    { day: 'Sunday', hours: 'Closed', icon: '😴' },
    { day: 'Response Time', hours: 'Within 24 hours', icon: '⚡' }
  ]

  return (
    <section ref={ref} className="relative bg-slate-950 py-24 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4F46E5" strokeWidth="0.5" strokeOpacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>

        {/* Animated Gradient Blobs */}
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
          className="absolute top-20 right-20 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl opacity-20"
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
          className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-20"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 bg-slate-800 text-cyan-400 px-6 py-2 rounded-full mb-6 border border-cyan-500/30"
            >
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Get In Touch</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Let's Work
              <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Together
              </span>
            </h2>

            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Have a project in mind? Looking for a backend engineer or full-stack developer?
              I'm always open to discussing new opportunities and innovative ideas.
            </p>

            {/* Contact Methods */}
            <div className="space-y-4 mb-8">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-all duration-300 group border border-slate-700 hover:border-cyan-500/50"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">{method.title}</div>
                    <div className="text-slate-400 text-sm">{method.info}</div>
                  </div>
                  <div className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {method.action} →
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Availability & Response Time */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">⏰</span>
                <h3 className="font-bold text-white">Availability & Response Time</h3>
              </div>
              <div className="space-y-2">
                {availability.map((item, index) => (
                  <div key={item.day} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span className="text-slate-300">{item.day}</span>
                    </div>
                    <span className="text-cyan-400">{item.hours}</span>
                  </div>
                ))}
              </div>

              {/* Quick Note */}
              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-400">✓</span>
                  <span className="text-slate-400">I typically respond within 24 hours</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <span className="text-green-400">✓</span>
                  <span className="text-slate-400">Available for remote work worldwide</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-slate-800 rounded-3xl shadow-2xl p-8 border border-slate-700"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>

            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-green-400 mb-2">Message Sent!</h4>
                <p className="text-slate-300">Thank you for reaching out. I'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder-slate-500"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder-slate-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder-slate-500"
                      placeholder="+250 785 658 174 (Optional)"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Service Interested In</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white"
                  >
                    <option value="">Select a service (Optional)</option>
                    {serviceOptions.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none text-white placeholder-slate-500"
                    placeholder="Tell me about your project, requirements, or how I can help..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-slate-400 text-center">
                  🔒 Your information is safe and will only be used to respond to your inquiry.
                </p>
              </form>
            )}
          </motion.div>
        </div>

        {/* Additional CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 text-center"
        >
          <div className="bg-gradient-to-r from-indigo-600/10 to-cyan-600/10 rounded-3xl p-8 border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-3">
              Prefer a Quick Call?
            </h3>
            <p className="text-slate-300 mb-6">
              I'm available for a quick chat to discuss your project requirements.
            </p>
            <a href="tel:+250785658174">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-3 bg-slate-800 text-cyan-400 rounded-full font-semibold hover:bg-slate-700 transition-all duration-300 border border-cyan-500/30"
              >
                <span>📞</span>
                Call Me Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}