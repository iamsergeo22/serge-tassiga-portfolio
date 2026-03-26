// app/components/CookiesConsent.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export function CookiesConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true - cannot be disabled
    functional: false,
    analytics: false,
    marketing: false
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('serge-tassiga-cookies-consent')
    if (!consent) {
      // Show banner after 1.5 seconds for better user experience
      const timer = setTimeout(() => {
        setShowConsent(true)
      }, 1500)
      return () => clearTimeout(timer)
    } else {
      // Load saved preferences
      try {
        const savedPreferences = JSON.parse(consent)
        setPreferences(savedPreferences)
        // Initialize scripts with saved preferences
        initializeScripts(savedPreferences)
      } catch (e) {
        // If error, use default preferences
      }
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    }
    setPreferences(allAccepted)
    localStorage.setItem('serge-tassiga-cookies-consent', JSON.stringify(allAccepted))
    setShowConsent(false)
    
    // Initialize third-party scripts
    initializeScripts(allAccepted)
    
    // Track acceptance event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'cookie_consent_update', {
        'consent_type': 'all',
        'consent_status': 'accepted'
      })
    }
  }

  const handleRefuseAll = () => {
    const allRefused = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false
    }
    setPreferences(allRefused)
    localStorage.setItem('serge-tassiga-cookies-consent', JSON.stringify(allRefused))
    setShowConsent(false)
    
    // Disable third-party scripts
    initializeScripts(allRefused)
    
    // Track refusal event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'cookie_consent_update', {
        'consent_type': 'all',
        'consent_status': 'refused'
      })
    }
  }

  const handleSavePreferences = () => {
    localStorage.setItem('serge-tassiga-cookies-consent', JSON.stringify(preferences))
    setShowConsent(false)
    setShowDetails(false)
    
    // Initialize scripts according to preferences
    initializeScripts(preferences)
    
    // Track preferences event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'cookie_consent_update', {
        'consent_type': 'custom',
        'consent_status': 'saved'
      })
    }
  }

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    if (key === 'necessary') return // Cannot change necessary
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  // Function to initialize/disable scripts based on preferences
  const initializeScripts = (prefs: typeof preferences) => {
    if (typeof window !== 'undefined') {
      // Google Analytics
      if (prefs.analytics) {
        // Initialize Google Analytics
        console.log('Serge Tassiga: Google Analytics activated')
        // Example: gtag('consent', 'update', { analytics_storage: 'granted' })
        if ((window as any).gtag) {
          (window as any).gtag('consent', 'update', {
            analytics_storage: 'granted'
          })
        }
      } else {
        // Disable Google Analytics
        console.log('Serge Tassiga: Google Analytics disabled')
        if ((window as any).gtag) {
          (window as any).gtag('consent', 'update', {
            analytics_storage: 'denied'
          })
        }
      }
      
      // Marketing scripts (LinkedIn Insights, etc.)
      if (prefs.marketing) {
        // Initialize marketing scripts
        console.log('Serge Tassiga: Marketing scripts activated')
        if ((window as any).gtag) {
          (window as any).gtag('consent', 'update', {
            ad_storage: 'granted'
          })
        }
      } else {
        // Disable marketing scripts
        console.log('Serge Tassiga: Marketing scripts disabled')
        if ((window as any).gtag) {
          (window as any).gtag('consent', 'update', {
            ad_storage: 'denied'
          })
        }
      }
      
      // Functional cookies (theme preferences, etc.)
      if (prefs.functional) {
        // Initialize functional features
        console.log('Serge Tassiga: Functional cookies activated')
        if ((window as any).gtag) {
          (window as any).gtag('consent', 'update', {
            functionality_storage: 'granted'
          })
        }
      } else {
        // Disable functional features
        console.log('Serge Tassiga: Functional cookies disabled')
        if ((window as any).gtag) {
          (window as any).gtag('consent', 'update', {
            functionality_storage: 'denied'
          })
        }
      }
    }
  }

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden backdrop-blur-sm">
              {/* Main Banner */}
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl flex-shrink-0 shadow-lg"
                  >
                    🍪
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      Privacy Matters
                    </h3>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                      I use cookies to enhance your experience, analyze site traffic, 
                      and provide features tailored to your needs. Your privacy is respected.
                    </p>
                  </div>
                </div>

                {!showDetails ? (
                  <>
                    {/* Main Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAcceptAll}
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                      >
                        Accept All Cookies
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleRefuseAll}
                        className="flex-1 bg-slate-800 text-slate-300 px-6 py-3 rounded-xl font-semibold hover:bg-slate-700 transition-all duration-300 border border-slate-700"
                      >
                        Reject All
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowDetails(true)}
                        className="sm:flex-none px-6 py-3 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors border border-cyan-500/30 rounded-xl hover:border-cyan-500/50 hover:bg-cyan-500/10"
                      >
                        Customize
                      </motion.button>
                    </div>

                    {/* Legal Links */}
                    <div className="flex flex-wrap gap-4 mt-4 text-xs text-slate-500">
                      <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
                        Privacy Policy
                      </Link>
                      <span className="text-slate-700">•</span>
                      <Link href="/terms" className="hover:text-cyan-400 transition-colors">
                        Terms of Use
                      </Link>
                      <span className="text-slate-700">•</span>
                      <Link href="/legal" className="hover:text-cyan-400 transition-colors">
                        Legal Notice
                      </Link>
                    </div>
                  </>
                ) : (
                  /* Preferences Details */
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 pt-6 border-t border-slate-800"
                  >
                    <h4 className="font-bold text-white mb-4 text-lg">
                      Customize Your Preferences
                    </h4>
                    
                    <div className="space-y-4 mb-6">
                      {/* Necessary Cookies - Always Enabled */}
                      <motion.div 
                        whileHover={{ x: 5 }}
                        className="flex items-start justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-white">Necessary Cookies</span>
                            <span className="bg-indigo-500/20 text-indigo-400 text-xs px-2 py-1 rounded-full font-medium border border-indigo-500/30">
                              Always Active
                            </span>
                          </div>
                          <p className="text-sm text-slate-400">
                            Essential for the website to function properly. These cannot be disabled.
                          </p>
                        </div>
                        <div className="ml-4">
                          <div className="w-10 h-6 bg-indigo-600 rounded-full flex items-center justify-end px-1">
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Functional Cookies */}
                      <motion.div 
                        whileHover={{ x: 5 }}
                        className="flex items-start justify-between p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-white">Functional Cookies</span>
                            <span className="text-xs text-slate-500">Enhanced Experience</span>
                          </div>
                          <p className="text-sm text-slate-400">
                            Remember your preferences and provide enhanced features.
                          </p>
                        </div>
                        <button
                          onClick={() => handlePreferenceChange('functional')}
                          className={`ml-4 w-12 h-6 rounded-full transition-all duration-300 flex items-center ${
                            preferences.functional 
                              ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 justify-end' 
                              : 'bg-slate-600 justify-start'
                          } px-1 shadow-inner`}
                          aria-label="Toggle functional cookies"
                        >
                          <motion.div 
                            layout
                            transition={{ type: "spring", stiffness: 700, damping: 30 }}
                            className="w-5 h-5 bg-white rounded-full shadow-md"
                          />
                        </button>
                      </motion.div>

                      {/* Analytics Cookies */}
                      <motion.div 
                        whileHover={{ x: 5 }}
                        className="flex items-start justify-between p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-white">Analytics Cookies</span>
                            <span className="text-xs text-slate-500">Performance & Improvement</span>
                          </div>
                          <p className="text-sm text-slate-400">
                            Help me understand how you use my portfolio to improve your experience.
                          </p>
                        </div>
                        <button
                          onClick={() => handlePreferenceChange('analytics')}
                          className={`ml-4 w-12 h-6 rounded-full transition-all duration-300 flex items-center ${
                            preferences.analytics 
                              ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 justify-end' 
                              : 'bg-slate-600 justify-start'
                          } px-1 shadow-inner`}
                          aria-label="Toggle analytics cookies"
                        >
                          <motion.div 
                            layout
                            transition={{ type: "spring", stiffness: 700, damping: 30 }}
                            className="w-5 h-5 bg-white rounded-full shadow-md"
                          />
                        </button>
                      </motion.div>

                      {/* Marketing Cookies */}
                      <motion.div 
                        whileHover={{ x: 5 }}
                        className="flex items-start justify-between p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-white">Marketing Cookies</span>
                            <span className="text-xs text-slate-500">Personalized Content</span>
                          </div>
                          <p className="text-sm text-slate-400">
                            Used to deliver relevant content and marketing communications.
                          </p>
                        </div>
                        <button
                          onClick={() => handlePreferenceChange('marketing')}
                          className={`ml-4 w-12 h-6 rounded-full transition-all duration-300 flex items-center ${
                            preferences.marketing 
                              ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 justify-end' 
                              : 'bg-slate-600 justify-start'
                          } px-1 shadow-inner`}
                          aria-label="Toggle marketing cookies"
                        >
                          <motion.div 
                            layout
                            transition={{ type: "spring", stiffness: 700, damping: 30 }}
                            className="w-5 h-5 bg-white rounded-full shadow-md"
                          />
                        </button>
                      </motion.div>
                    </div>

                    {/* Save Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSavePreferences}
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                      >
                        Save My Preferences
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowDetails(false)}
                        className="px-6 py-3 border border-slate-700 rounded-xl text-slate-400 hover:bg-slate-800 hover:border-cyan-500/50 transition-colors"
                      >
                        Back
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Elegant Progress Bar */}
              <motion.div 
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 25, ease: "linear" }}
                className="h-1 bg-gradient-to-r from-indigo-500 to-cyan-500"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}