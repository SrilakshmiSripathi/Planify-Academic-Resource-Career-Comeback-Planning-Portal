import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { AcademicMilestones } from './calendar/components/AcademicMilestones'
import { DayView } from './calendar/components/DayView'
import { EventLegend } from './calendar/components/EventLegend'
import { Header } from './calendar/components/Header'
import { MonthView } from './calendar/components/MonthView'
import { StatsBanner } from './calendar/components/StatsBanner'
import { TargetDeadlineTracker } from './calendar/components/TargetDeadlineTracker'
import { TimeControls } from './calendar/components/TimeControls'
import { YearView } from './calendar/components/YearView'
import type { ViewMode } from './calendar/types'
import {
  calculateAcademicYearHours,
  calculateDeadlineTimeRemaining,
  calculateDayHours,
  calculateMonthHours
} from './calendar/workHoursUtils'

export function App() {
  // View mode: 'day' | 'month' | 'year'
  const [viewMode, setViewMode] = useState<ViewMode>('month')

  // Selected date for viewing details (Default: Aug 20, 2026)
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-20')

  // Reference cutoff date and time for calculating Future Available Time
  const [referenceDate, setReferenceDate] = useState<string>('2026-08-20')
  const [referenceTimeMinutes, setReferenceTimeMinutes] = useState<number>(15 * 60 + 29) // 3:29 PM
  const [isLiveTime, setIsLiveTime] = useState<boolean>(true)

  // Target Deadline Date (Default: Oct 2, 2026 End of Q1, or custom date)
  const [deadlineDate, setDeadlineDate] = useState<string>('2026-10-02')

  // Live timer interval to keep current clock up to date
  useEffect(() => {
    if (!isLiveTime) return

    const updateClock = () => {
      const now = new Date()
      // If today is within 2026-2027, use real system time
      const y = now.getFullYear()
      const m = String(now.getMonth() + 1).padStart(2, '0')
      const d = String(now.getDate()).padStart(2, '0')
      const sysDateStr = `${y}-${m}-${d}`

      const currentMins = now.getHours() * 60 + now.getMinutes()

      // If user is in 2026-2027 range
      if (sysDateStr >= '2026-07-01' && sysDateStr <= '2027-06-30') {
        setReferenceDate(sysDateStr)
      }
      setReferenceTimeMinutes(currentMins)
    }

    updateClock()
    const timer = setInterval(updateClock, 30000)
    return () => clearInterval(timer)
  }, [isLiveTime])

  // Parse active month from selectedDate
  const [selectedYear, selectedMonth] = useMemo(() => {
    const [y, m] = selectedDate.split('-').map(Number)
    return [y, m - 1]
  }, [selectedDate])

  // Compute Working Hours for Selected Day
  const dayCalc = useMemo(() => {
    return calculateDayHours(selectedDate, referenceDate, referenceTimeMinutes)
  }, [selectedDate, referenceDate, referenceTimeMinutes])

  // Compute Working Hours for Selected Month
  const monthCalc = useMemo(() => {
    return calculateMonthHours(selectedYear, selectedMonth, referenceDate, referenceTimeMinutes)
  }, [selectedYear, selectedMonth, referenceDate, referenceTimeMinutes])

  // Compute Working Hours for Academic Year (2026-2027)
  const yearCalc = useMemo(() => {
    return calculateAcademicYearHours(2026, referenceDate, referenceTimeMinutes)
  }, [referenceDate, referenceTimeMinutes])

  // Compute Remaining Time & Work for Target Deadline
  const deadlineCalc = useMemo(() => {
    return calculateDeadlineTimeRemaining(referenceDate, referenceTimeMinutes, deadlineDate)
  }, [referenceDate, referenceTimeMinutes, deadlineDate])

  // Navigation Handlers
  const handleNavigatePrev = () => {
    if (viewMode === 'day') {
      const [y, m, d] = selectedDate.split('-').map(Number)
      const prevDate = new Date(y, m - 1, d - 1, 12, 0, 0)
      const prevStr = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}-${String(
        prevDate.getDate()
      ).padStart(2, '0')}`
      if (prevStr >= '2026-07-01') setSelectedDate(prevStr)
    } else if (viewMode === 'month') {
      let newMonth = selectedMonth - 1
      let newYear = selectedYear
      if (newMonth < 0) {
        newMonth = 11
        newYear -= 1
      }
      const newStr = `${newYear}-${String(newMonth + 1).padStart(2, '0')}-01`
      if (newStr >= '2026-07-01' && newStr <= '2027-06-30') {
        setSelectedDate(newStr)
      }
    }
  }

  const handleNavigateNext = () => {
    if (viewMode === 'day') {
      const [y, m, d] = selectedDate.split('-').map(Number)
      const nextDate = new Date(y, m - 1, d + 1, 12, 0, 0)
      const nextStr = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}-${String(
        nextDate.getDate()
      ).padStart(2, '0')}`
      if (nextStr <= '2027-06-30') setSelectedDate(nextStr)
    } else if (viewMode === 'month') {
      let newMonth = selectedMonth + 1
      let newYear = selectedYear
      if (newMonth > 11) {
        newMonth = 0
        newYear += 1
      }
      const newStr = `${newYear}-${String(newMonth + 1).padStart(2, '0')}-01`
      if (newStr >= '2026-07-01' && newStr <= '2027-06-30') {
        setSelectedDate(newStr)
      }
    }
  }

  const handleJumpToday = () => {
    setSelectedDate('2026-08-20')
    setReferenceDate('2026-08-20')
    setReferenceTimeMinutes(15 * 60 + 29)
  }

  const handleSelectDay = (dateStr: string) => {
    setSelectedDate(dateStr)
  }

  const handleOpenDayView = (dateStr: string) => {
    setSelectedDate(dateStr)
    setViewMode('day')
  }

  const handleSelectMonthFromYear = (year: number, month: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-01`
    setSelectedDate(dateStr)
    setViewMode('month')
  }

  return (
    <div className="portal-app">
      {/* Top Header */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        referenceDate={referenceDate}
        referenceTimeMinutes={referenceTimeMinutes}
        isLiveTime={isLiveTime}
        setIsLiveTime={setIsLiveTime}
        onNavigatePrev={handleNavigatePrev}
        onNavigateNext={handleNavigateNext}
        onJumpToday={handleJumpToday}
        academicYearLabel="2026-2027"
      />

      {/* Main Content Area */}
      <main className="portal-main-content">
        {/* Key Academic Milestones Quick Jump Bar */}
        <AcademicMilestones
          selectedDate={selectedDate}
          onSelectDate={(date) => {
            setSelectedDate(date)
          }}
        />

        {/* Dynamic Future Working Hours & Statistics Banner */}
        <StatsBanner
          viewMode={viewMode}
          dayCalc={dayCalc}
          monthCalc={monthCalc}
          yearCalc={yearCalc}
        />

        {/* Target Deadline Interactive Calculator & Time Remaining Engine */}
        <TargetDeadlineTracker
          deadlineDate={deadlineDate}
          setDeadlineDate={setDeadlineDate}
          deadlineCalc={deadlineCalc}
          referenceDate={referenceDate}
        />

        {/* Time Cutoff Scrubber / Future Available Simulator */}
        <TimeControls
          referenceDate={referenceDate}
          setReferenceDate={setReferenceDate}
          selectedDate={selectedDate}
          referenceTimeMinutes={referenceTimeMinutes}
          setReferenceTimeMinutes={setReferenceTimeMinutes}
          isLiveTime={isLiveTime}
          setIsLiveTime={setIsLiveTime}
        />

        {/* Active Calendar View Content */}
        <div className="calendar-views-wrapper">
          {viewMode === 'day' && (
            <DayView
              dayCalc={dayCalc}
              referenceDate={referenceDate}
              referenceTimeMinutes={referenceTimeMinutes}
              deadlineDate={deadlineDate}
              onSelectDate={handleSelectDay}
              onNavigatePrevDay={handleNavigatePrev}
              onNavigateNextDay={handleNavigateNext}
              onSetDeadline={setDeadlineDate}
            />
          )}

          {viewMode === 'month' && (
            <MonthView
              monthCalc={monthCalc}
              selectedDate={selectedDate}
              referenceDate={referenceDate}
              referenceTimeMinutes={referenceTimeMinutes}
              deadlineDate={deadlineDate}
              onSelectDay={handleSelectDay}
              onOpenDayView={handleOpenDayView}
              onSetDeadline={setDeadlineDate}
            />
          )}

          {viewMode === 'year' && (
            <YearView
              yearCalc={yearCalc}
              selectedDate={selectedDate}
              referenceDate={referenceDate}
              deadlineDate={deadlineDate}
              onSelectMonth={handleSelectMonthFromYear}
              onSelectDay={handleSelectDay}
            />
          )}
        </div>

        {/* Official Calendar Key & Working Hours Rules */}
        <EventLegend />
      </main>
    </div>
  )
}

export default App
