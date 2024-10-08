import React, { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'

function App() {
  const [startDate, setStartDate] = useState('')
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const calculateDuration = () => {
      if (startDate) {
        const start = new Date(startDate)
        const today = new Date()
        const diffTime = Math.abs(today.getTime() - start.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        setDuration(diffDays)
      }
    }

    calculateDuration()
    const timer = setInterval(calculateDuration, 1000 * 60 * 60) // Update every hour

    return () => clearInterval(timer)
  }, [startDate])

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center flex items-center justify-center">
          <Heart className="mr-2" /> Love Calculator
        </h1>
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-sm font-medium text-pink-600 mb-1">
            When did your love story begin?
          </label>
          <input
            type="date"
            id="startDate"
            className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        {duration > 0 && (
          <div className="text-center">
            <p className="text-lg font-semibold text-pink-700">
              You've been in love for:
            </p>
            <p className="text-4xl font-bold text-pink-600 mt-2">
              {duration} days
            </p>
            <p className="text-sm text-pink-500 mt-1">
              ({Math.floor(duration / 365)} years, {duration % 365} days)
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App