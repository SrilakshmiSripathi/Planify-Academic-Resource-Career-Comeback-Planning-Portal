import React from 'react'
import type { DayHoursCalculation } from '../types'
import {
  formatDecimalHours,
  formatFullDate,
  formatHoursMinutes,
  formatMinutesTo12h,
  toMinutesFromMidnight
} from '../workHoursUtils'

interface DayViewProps {
  dayCalc: DayHoursCalculation
  referenceDate: string
  referenceTimeMinutes: number
  deadlineDate?: string
  onSelectDate: (date: string) => void
  onNavigatePrevDay: () => void
  onNavigateNextDay: () => void
  onSetDeadline?: (dateStr: string) => void
}

export const DayView: React.FC<DayViewProps> = ({
  dayCalc,
  referenceDate,
  referenceTimeMinutes,
  deadlineDate,
  onNavigatePrevDay,
  onNavigateNextDay,
  onSetDeadline
}) => {
  const { dayInfo, shifts, totalMinutes, shiftStatuses } = dayCalc

  // Timeline hours from 4:00 AM (240) to 7:00 PM (1140)
  const timelineHours = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

  const isTodayRef = dayInfo.dateStr === referenceDate
  const isDeadline = dayInfo.dateStr === deadlineDate

  return (
    <div className="day-view-container">
      {/* Day Header Banner */}
      <div className={`day-header-card ${isDeadline ? 'is-deadline-day' : ''}`}>
        <div className="day-title-row">
          <button className="btn-icon-nav" onClick={onNavigatePrevDay} title="Previous Day">
            ◀
          </button>
          <div className="day-main-info">
            <div className="day-title-badge-flex">
              <h2 className="day-heading">{formatFullDate(dayInfo.dateStr)}</h2>
              {isDeadline && (
                <span className="deadline-indicator-badge">
                  🎯 Target Deadline
                </span>
              )}
            </div>
            <div className="day-badges-row">
              <span
                className="category-pill"
                style={{
                  backgroundColor: dayInfo.colorBadge.bg,
                  color: dayInfo.colorBadge.text,
                  borderColor: dayInfo.colorBadge.border
                }}
              >
                {dayInfo.categoryLabel}
              </span>
              <span className="hours-stat-pill">
                Standard Day Hours: {formatHoursMinutes(totalMinutes)} ({formatDecimalHours(totalMinutes)})
              </span>
              {isTodayRef && (
                <span className="current-ref-pill">
                  📍 Active Cutoff Target ({formatMinutesTo12h(referenceTimeMinutes)})
                </span>
              )}
              {onSetDeadline && (
                <button
                  type="button"
                  className={`btn-set-deadline-chip ${isDeadline ? 'active' : ''}`}
                  onClick={() => onSetDeadline(isDeadline ? '' : dayInfo.dateStr)}
                >
                  {isDeadline ? '✕ Remove Target Deadline' : '🎯 Set as Target Deadline'}
                </button>
              )}
            </div>
          </div>
          <button className="btn-icon-nav" onClick={onNavigateNextDay} title="Next Day">
            ▶
          </button>
        </div>

        {/* Any Special Calendar Events */}
        {dayInfo.events.length > 0 && (
          <div className="day-events-banner">
            <span className="events-icon">📌</span>
            <div className="events-content">
              {dayInfo.events.map((e) => (
                <div key={e.id} className="event-item-tag">
                  <strong>{e.title}</strong>
                  {e.description && <span className="event-desc"> — {e.description}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Shifts Breakdown Grid */}
      <div className="shifts-breakdown-section">
        <h3 className="section-title">
          <span>Working Shifts Breakdown</span>
          <span className="section-hint">
            {dayInfo.isSchoolDay
              ? '3 Scheduled Shifts (Early Morning, School Hours, Late Afternoon)'
              : '2 Scheduled Shifts (Early Morning, Late Afternoon)'}
          </span>
        </h3>

        <div className="shifts-cards-grid">
          {shiftStatuses.map((item, idx) => {
            const shift = item.shift
            const startTimeStr = formatMinutesTo12h(
              toMinutesFromMidnight(shift.startHour, shift.startMinute)
            )
            const endTimeStr = formatMinutesTo12h(
              toMinutesFromMidnight(shift.endHour, shift.endMinute)
            )

            let statusClass = 'status-upcoming'
            let statusText = 'Upcoming (Future Available)'
            if (item.status === 'past') {
              statusClass = 'status-past'
              statusText = 'Completed (Past)'
            } else if (item.status === 'active') {
              statusClass = 'status-active'
              statusText = 'Active In-Progress'
            }

            return (
              <div key={shift.id} className={`shift-card ${statusClass}`}>
                <div className="shift-card-header">
                  <div className="shift-index-badge">Shift {idx + 1}</div>
                  <span className={`shift-status-pill ${statusClass}`}>{statusText}</span>
                </div>

                <div className="shift-card-title">{shift.name}</div>
                <div className="shift-card-time">
                  🕒 {startTimeStr} – {endTimeStr}
                </div>

                <div className="shift-metrics-box">
                  <div className="metric-row">
                    <span className="metric-label">Total Duration:</span>
                    <span className="metric-value font-semibold">
                      {formatHoursMinutes(item.totalMinutes)}
                    </span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-label">Future Available:</span>
                    <span className="metric-value text-emerald font-bold">
                      {formatHoursMinutes(item.remainingMinutes)}
                    </span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-label">Past / Elapsed:</span>
                    <span className="metric-value text-amber">
                      {formatHoursMinutes(item.elapsedMinutes)}
                    </span>
                  </div>
                </div>

                {/* Micro Progress Bar */}
                <div className="shift-progress-track">
                  <div
                    className="shift-progress-elapsed"
                    style={{
                      width: `${(item.elapsedMinutes / item.totalMinutes) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Visual Hourly Timeline */}
      <div className="hourly-timeline-section">
        <div className="timeline-header">
          <h3 className="section-title">Visual Schedule Timeline</h3>
          <div className="timeline-legend">
            <span className="legend-sample future-work"></span> Future Working Available
            <span className="legend-sample past-work"></span> Past Elapsed
            <span className="legend-sample non-work"></span> Off-Hours / Break
          </div>
        </div>

        <div className="hourly-grid-container">
          {timelineHours.map((hour) => {
            const hourStartMin = hour * 60
            const hourEndMin = (hour + 1) * 60
            const hourLabel = formatMinutesTo12h(hourStartMin)

            // Check overlap with any shift
            const activeShift = shifts.find((s) => {
              const sStart = toMinutesFromMidnight(s.startHour, s.startMinute)
              const sEnd = toMinutesFromMidnight(s.endHour, s.endMinute)
              return hourStartMin < sEnd && hourEndMin > sStart
            })

            let cellType = 'off-hours'
            if (activeShift) {
              if (dayInfo.dateStr < referenceDate) {
                cellType = 'past-work'
              } else if (dayInfo.dateStr > referenceDate) {
                cellType = 'future-work'
              } else {
                if (referenceTimeMinutes >= hourEndMin) {
                  cellType = 'past-work'
                } else if (referenceTimeMinutes <= hourStartMin) {
                  cellType = 'future-work'
                } else {
                  cellType = 'partial-work'
                }
              }
            }

            return (
              <div key={hour} className={`hour-row ${cellType}`}>
                <div className="hour-time-col">{hourLabel}</div>
                <div className="hour-content-col">
                  {activeShift ? (
                    <div className="hour-block-pill">
                      <span className="block-name">{activeShift.name}</span>
                      <span className="block-time">
                        {formatMinutesTo12h(toMinutesFromMidnight(activeShift.startHour, activeShift.startMinute))} -{' '}
                        {formatMinutesTo12h(toMinutesFromMidnight(activeShift.endHour, activeShift.endMinute))}
                      </span>
                    </div>
                  ) : (
                    <span className="off-hours-text">Off-Shift / Personal Time</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
