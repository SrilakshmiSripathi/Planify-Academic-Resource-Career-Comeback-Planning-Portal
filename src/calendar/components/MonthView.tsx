import React from 'react'
import type { DayHoursCalculation, MonthHoursCalculation } from '../types'
import { formatDecimalHours, formatHoursMinutes } from '../workHoursUtils'

interface MonthViewProps {
  monthCalc: MonthHoursCalculation
  selectedDate: string
  referenceDate: string
  referenceTimeMinutes: number
  deadlineDate?: string
  onSelectDay: (dateStr: string) => void
  onOpenDayView: (dateStr: string) => void
  onSetDeadline?: (dateStr: string) => void
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const MonthView: React.FC<MonthViewProps> = ({
  monthCalc,
  selectedDate,
  referenceDate,
  deadlineDate,
  onSelectDay,
  onOpenDayView,
  onSetDeadline
}) => {
  const { year, month, days } = monthCalc

  // Find day of week for 1st day of the month
  const firstDayOfWeek = new Date(year, month, 1).getDay() // 0 = Sun

  // Create empty slots for days before 1st
  const paddingSlots = Array.from({ length: firstDayOfWeek }, (_, i) => i)

  return (
    <div className="month-view-container">
      {/* Month Working Hours Summary Banner */}
      <div className="month-summary-bar">
        <div className="summary-stat-item highlight-emerald">
          <span className="summary-stat-label">⚡ Month Future Available Hours</span>
          <span className="summary-stat-val text-emerald">
            {formatHoursMinutes(monthCalc.futureMinutes)}
          </span>
          <span className="summary-stat-sub">
            ({formatDecimalHours(monthCalc.futureMinutes)})
          </span>
        </div>

        <div className="summary-stat-item">
          <span className="summary-stat-label">⏱️ Total Scheduled Month Hours</span>
          <span className="summary-stat-val text-slate">
            {formatHoursMinutes(monthCalc.totalMinutes)}
          </span>
          <span className="summary-stat-sub">
            ({formatDecimalHours(monthCalc.totalMinutes)})
          </span>
        </div>

        <div className="summary-stat-item">
          <span className="summary-stat-label">⌛ Past Elapsed Hours</span>
          <span className="summary-stat-val text-amber">
            {formatHoursMinutes(monthCalc.pastMinutes)}
          </span>
        </div>

        <div className="summary-stat-item">
          <span className="summary-stat-label">🎒 School Days</span>
          <span className="summary-stat-val text-green">{monthCalc.schoolDaysCount} days</span>
          <span className="summary-stat-sub">
            + {monthCalc.nonSchoolDaysCount} non-school days
          </span>
        </div>
      </div>

      {/* Weekday Header */}
      <div className="month-grid-header">
        {WEEKDAYS.map((w, idx) => (
          <div
            key={w}
            className={`weekday-col-header ${idx === 0 || idx === 6 ? 'weekend-header' : ''}`}
          >
            {w}
          </div>
        ))}
      </div>

      {/* 7-column Calendar Grid */}
      <div className="month-grid-body">
        {/* Padding cells */}
        {paddingSlots.map((p) => (
          <div key={`pad-${p}`} className="calendar-cell padding-cell" />
        ))}

        {/* Actual Days */}
        {days.map((dayCalc: DayHoursCalculation) => {
          const { dayInfo, totalMinutes, futureMinutes } = dayCalc
          const dayNum = parseInt(dayInfo.dateStr.split('-')[2], 10)
          const isSelected = dayInfo.dateStr === selectedDate
          const isRefDate = dayInfo.dateStr === referenceDate
          const isDeadline = dayInfo.dateStr === deadlineDate
          const isPastDay = dayInfo.dateStr < referenceDate

          let cellClass = 'calendar-cell day-cell'
          if (isSelected) cellClass += ' cell-selected'
          if (isRefDate) cellClass += ' cell-ref-today'
          if (isDeadline) cellClass += ' cell-deadline-target'
          if (dayInfo.isWeekend) cellClass += ' cell-weekend'
          if (dayInfo.isSchoolDay) cellClass += ' cell-school-day'
          if (dayInfo.isTeacherDay) cellClass += ' cell-teacher-day'
          if (dayInfo.isBreak) cellClass += ' cell-break'
          if (dayInfo.isGradingPeriodEnd) cellClass += ' cell-grading'
          if (dayInfo.isGraduation) cellClass += ' cell-graduation'

          return (
            <div
              key={dayInfo.dateStr}
              className={cellClass}
              onClick={() => onSelectDay(dayInfo.dateStr)}
              onDoubleClick={() => onOpenDayView(dayInfo.dateStr)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectDay(dayInfo.dateStr)
                }
              }}
            >
              {/* Day Top Bar: Date Number + Primary Category Badge */}
              <div className="cell-top-bar">
                <span className={`cell-day-num ${isSelected ? 'selected-num' : ''}`}>
                  {dayNum}
                </span>

                {isDeadline && (
                  <span className="cell-deadline-badge" title="Target Deadline Date">
                    🎯 Deadline
                  </span>
                )}

                {dayInfo.events.length > 0 ? (
                  <span
                    className="cell-event-badge"
                    style={{
                      backgroundColor: dayInfo.events[0].color,
                      color: '#ffffff'
                    }}
                    title={dayInfo.events.map((e) => e.title).join(' | ')}
                  >
                    {dayInfo.events[0].title.length > 18
                      ? dayInfo.events[0].title.substring(0, 16) + '…'
                      : dayInfo.events[0].title}
                  </span>
                ) : (
                  <span
                    className="cell-type-tag"
                    style={{
                      color: dayInfo.colorBadge.text,
                      backgroundColor: dayInfo.colorBadge.bg
                    }}
                  >
                    {dayInfo.isSchoolDay ? 'School' : dayInfo.isWeekend ? 'Wknd' : 'Off'}
                  </span>
                )}
              </div>

              {/* Working Hours Badge */}
              <div className="cell-hours-box">
                <div className="cell-hours-main">
                  <span className="hours-icon">🕒</span>
                  <span
                    className={`hours-text ${
                      dayInfo.isSchoolDay ? 'text-green font-bold' : 'text-slate'
                    }`}
                  >
                    {formatHoursMinutes(totalMinutes)}
                  </span>
                </div>

                {/* Dynamic Future Available Breakdown */}
                <div className="cell-future-sub">
                  {isRefDate ? (
                    <span className="future-live-chip" title="Remaining today from current cutoff">
                      Avail: {formatHoursMinutes(futureMinutes)}
                    </span>
                  ) : isPastDay ? (
                    <span className="past-chip">Completed</span>
                  ) : (
                    <span className="future-chip">Full Avail</span>
                  )}
                </div>
              </div>

              {/* Action Buttons: Day View & Target Deadline */}
              <div className="cell-actions-row">
                <button
                  className="cell-quick-jump-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    onOpenDayView(dayInfo.dateStr)
                  }}
                  title="View hourly schedule breakdown"
                >
                  Schedule ↗
                </button>
                {onSetDeadline && (
                  <button
                    className={`cell-deadline-toggle-btn ${isDeadline ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      onSetDeadline(isDeadline ? '' : dayInfo.dateStr)
                    }}
                    title={isDeadline ? 'Clear target deadline' : 'Set as target deadline'}
                  >
                    🎯
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
