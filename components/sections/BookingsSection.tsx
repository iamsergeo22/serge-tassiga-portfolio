// app/components/sections/BookingsSection.tsx
'use client'

import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import emailjs from '@emailjs/browser'

export function AppointmentSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [availableTimes, setAvailableTimes] = useState<string[]>([])

  const services = [
    { id: 'web', name: 'Web Development Consultation', duration: '60 min', icon: '💻' },
    { id: 'marketing', name: 'Digital Marketing Strategy', duration: '45 min', icon: '📱' },
    { id: 'seo', name: 'SEO Audit & Strategy', duration: '60 min', icon: '🔍' },
    { id: 'general', name: 'General Consultation', duration: '30 min', icon: '🤝' }
  ]

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ]

  // Generate available times based on selected date
  useEffect(() => {
    if (selectedDate) {
      const day = selectedDate.getDay()
      const isWeekend = day === 0 || day === 6
      
      if (!isWeekend) {
        const available = timeSlots.filter((_, index) => 
          index % 2 === 0 || Math.random() > 0.5
        )
        setAvailableTimes(available)
      } else {
        setAvailableTimes([])
      }
    }
  }, [selectedDate])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleNextStep = () => {
    if (step === 1 && selectedDate && selectedTime) {
      setStep(2)
    }
  }

  const handlePrevStep = () => {
    setStep(1)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Initialize EmailJS - Replace with your actual keys
      emailjs.init('YOUR_PUBLIC_KEY')
      
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          to_name: 'JumbaSoft Team',
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          company: formData.company || 'Not specified',
          service: formData.service || 'Not specified',
          message: formData.message,
          appointment_date: selectedDate?.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          appointment_time: selectedTime,
          reply_to: formData.email,
        }
      )
      
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        setStep(1)
        setSelectedDate(null)
        setSelectedTime(null)
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        })
      }, 3000)
    } catch (error) {
      console.error('Error:', error)
      alert('Something went wrong. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days: (Date | null)[] = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const changeMonth = (increment: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + increment, 1))
  }

  const isDateAvailable = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today
  }

  const days = getDaysInMonth(currentMonth)

  return (
    <section ref={ref} className="relative bg-white py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="appointment-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="2" fill="#EA580C" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#appointment-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-6 py-2 rounded-full mb-6"
          >
            <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" />
            <span className="text-sm font-medium">Book Your Free Consultation</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Schedule Your
            <span className="text-orange-600 block">Free Strategy Call</span>
          </h2>
          <p className="text-xl text-gray-600">
            Let's discuss your goals and how we can help you achieve them. Choose a time that works for you.
          </p>
        </motion.div>

        {/* Booking Form */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Progress Steps */}
            <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-6">
              <div className="flex justify-between items-center max-w-md mx-auto">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                      step >= s ? 'bg-white text-orange-600' : 'bg-orange-400 text-white'
                    }`}>
                      {s}
                    </div>
                    {s < 2 && (
                      <div className={`w-16 h-0.5 mx-2 ${
                        step > s ? 'bg-white' : 'bg-orange-400'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between max-w-md mx-auto mt-2">
                <span className="text-white text-sm">Select Time</span>
                <span className="text-white text-sm">Your Details</span>
              </div>
            </div>

            {/* Step 1: Date & Time Selection */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 md:p-12"
                >
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Calendar */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Select Date</h3>
                      <div className="bg-gray-50 rounded-2xl p-4">
                        {/* Calendar Header */}
                        <div className="flex justify-between items-center mb-4">
                          <button
                            onClick={() => changeMonth(-1)}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                            type="button"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <h4 className="font-semibold text-gray-900">
                            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                          </h4>
                          <button
                            onClick={() => changeMonth(1)}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                            type="button"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>

                        {/* Week Days */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                              {day}
                            </div>
                          ))}
                        </div>

                        {/* Days */}
                        <div className="grid grid-cols-7 gap-1">
                          {days.map((date, index) => (
                            <div key={index}>
                              {date && (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleDateSelect(date)}
                                  disabled={!isDateAvailable(date)}
                                  className={`w-full aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all ${
                                    selectedDate?.toDateString() === date.toDateString()
                                      ? 'bg-orange-600 text-white shadow-lg'
                                      : isDateAvailable(date)
                                      ? 'hover:bg-orange-100 text-gray-700'
                                      : 'text-gray-300 cursor-not-allowed'
                                  }`}
                                  type="button"
                                >
                                  {date.getDate()}
                                </motion.button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Select Time</h3>
                      {selectedDate ? (
                        <div className="bg-gray-50 rounded-2xl p-4">
                          <p className="text-sm text-gray-600 mb-4">
                            {selectedDate.toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          {availableTimes.length > 0 ? (
                            <div className="grid grid-cols-3 gap-2">
                              {availableTimes.map(time => (
                                <motion.button
                                  key={time}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleTimeSelect(time)}
                                  className={`py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                                    selectedTime === time
                                      ? 'bg-orange-600 text-white shadow-lg'
                                      : 'bg-white border border-gray-200 text-gray-700 hover:border-orange-600'
                                  }`}
                                  type="button"
                                >
                                  {time}
                                </motion.button>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <p className="text-gray-500">No available times for this date</p>
                              <p className="text-sm text-gray-400 mt-2">Please select another date</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="bg-gray-50 rounded-2xl p-8 text-center">
                          <p className="text-gray-500">Select a date to see available times</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextStep}
                      disabled={!selectedDate || !selectedTime}
                      className="px-8 py-3 bg-orange-600 text-white rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                      type="button"
                    >
                      Continue
                      <svg className="w-5 h-5 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Personal Details */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 md:p-12"
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          placeholder="+250 788 123 456"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          placeholder="Your Company"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Interested In *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select a service</option>
                        {services.map(service => (
                          <option key={service.id} value={service.name}>
                            {service.icon} {service.name} ({service.duration})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tell us about your project
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                        placeholder="What would you like to discuss?"
                      />
                    </div>

                    {/* Appointment Summary */}
                    <div className="bg-orange-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Appointment Summary</h4>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-600">
                          <span className="font-medium">Date:</span>{' '}
                          {selectedDate?.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Time:</span> {selectedTime}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Duration:</span> 45-60 minutes
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={handlePrevStep}
                        className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all"
                      >
                        Back
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-orange-600 text-white rounded-full font-semibold disabled:opacity-50 hover:shadow-lg transition-all"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Scheduling...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            Schedule Appointment
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Message */}
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center z-20"
              >
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h3>
                  <p className="text-gray-600 mb-4">
                    We've sent a confirmation email with all the details.
                  </p>
                  <p className="text-sm text-orange-600">
                    We look forward to speaking with you!
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500">
              📅 Free consultation • No obligation • Virtual or in-person available
            </p>
            <p className="text-sm text-gray-500 mt-2">
              ⏰ Need a different time? Call us at <a href="tel:+250788123456" className="text-orange-600">+250 788 123 456</a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}