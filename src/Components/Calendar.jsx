import React, { useState, useEffect } from 'react'
import './calendar.css'

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getDaysInMonth = (date) => {
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

  const isToday = (day) => {
    if (!day) return false
    const today = new Date()
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    )
  }

  const days = getDaysInMonth(currentMonth)

  return (
    <div className='calendar'>
      <div className='calendar-header'>
        <h3>Calendar</h3>
        <i className='fa-solid fa-calendar-days'></i>
      </div>
      
      <div className='current-date'>
        <div className='date-display'>
          <span className='day'>{currentDate.getDate()}</span>
          <div className='month-year'>
            <span className='month'>{monthNames[currentDate.getMonth()]}</span>
            <span className='year'>{currentDate.getFullYear()}</span>
          </div>
        </div>
      </div>

      <div className='mini-calendar'>
        <div className='calendar-nav'>
          <span>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
        </div>
        
        <div className='calendar-grid'>
          {dayNames.map(day => (
            <div key={day} className='day-header'>{day}</div>
          ))}
          
          {days.map((day, index) => (
            <div 
              key={index} 
              className={`calendar-day ${day ? 'active' : 'inactive'} ${isToday(day) ? 'today' : ''}`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Calendar
