'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'

interface CalendarProps {
  onDateSelect: (date: string, time: string) => void
}

const Calendar = ({ onDateSelect }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(() => {
    // Use a stable initial date to avoid hydration mismatch
    // Use a fixed date instead of current date to prevent hydration issues
    return new Date(2024, 0, 1) // January 2024 as default
  })
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [availableSlots, setAvailableSlots] = useState<string[]>([])

  // Initialize with current date on client side to avoid hydration mismatch
  useEffect(() => {
    const now = new Date()
    setCurrentDate(new Date(now.getFullYear(), now.getMonth(), 1))
  }, [])

  // Business hours: 9 AM - 5 PM EST, Monday to Friday
  const businessHours = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00'
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }

  const isDateAvailable = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Reset time to start of day
    const dayOfWeek = date.getDay()
    
    // Only allow weekdays (Monday = 1, Friday = 5)
    return date >= today && dayOfWeek >= 1 && dayOfWeek <= 5
  }

  const handleDateClick = (day: number) => {
    const selectedDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dateString = selectedDateObj.toISOString().split('T')[0]
    
    if (isDateAvailable(selectedDateObj)) {
      setSelectedDate(dateString)
      setAvailableSlots(businessHours)
    }
  }

  const handleTimeSelect = (time: string) => {
    if (selectedDate) {
      onDateSelect(selectedDate, time)
    }
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
    setSelectedDate(null)
    setAvailableSlots([])
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Select a Date</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>
          <span className="text-lg font-medium text-white min-w-[140px] text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {dayNames.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            if (day === null) {
              return <div key={index} className="h-10" />
            }

            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
            const isAvailable = isDateAvailable(date)
            const isSelected = selectedDate === date.toISOString().split('T')[0]
            const isToday = date.toDateString() === new Date().toDateString()

            return (
              <motion.button
                key={day}
                whileHover={isAvailable ? { scale: 1.05 } : {}}
                whileTap={isAvailable ? { scale: 0.95 } : {}}
                onClick={() => isAvailable && handleDateClick(day)}
                disabled={!isAvailable}
                className={`
                  h-10 rounded-lg text-sm font-medium transition-all duration-200
                  ${isAvailable 
                    ? 'hover:bg-blue-500/20 text-white cursor-pointer' 
                    : 'text-gray-500 cursor-not-allowed'
                  }
                  ${isSelected 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : ''
                  }
                  ${isToday && isAvailable 
                    ? 'ring-2 ring-blue-400' 
                    : ''
                  }
                `}
              >
                {day}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && availableSlots.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <h4 className="text-lg font-semibold text-white">Available Times</h4>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {availableSlots.map(time => (
              <motion.button
                key={time}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTimeSelect(time)}
                className="px-4 py-2 bg-white/10 hover:bg-blue-500/20 border border-white/20 hover:border-blue-400/50 rounded-lg text-white text-sm font-medium transition-all duration-200"
              >
                {time}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Calendar
