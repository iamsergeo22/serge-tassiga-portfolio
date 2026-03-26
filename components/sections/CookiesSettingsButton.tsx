// app/components/CookiesSettingsButton.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function CookiesSettingsButton() {
  const [showTooltip, setShowTooltip] = useState(false)

  const openCookiesSettings = () => {
    // Réafficher la bannière des cookies
    localStorage.removeItem('cookies-consent')
    window.location.reload()
  }

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <button
        onClick={openCookiesSettings}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-600 group"
        aria-label="Paramètres des cookies"
      >
        🍪
      </button>
      
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute left-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm py-2 px-3 rounded-lg whitespace-nowrap"
          >
            Paramètres des cookies
            <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-900 transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}