import React from 'react'
import type { ViewMode } from '../types'
import { formatFullDate, formatMinutesTo12h } from '../workHoursUtils'

interface HeaderProps {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  selectedDate: string
  setSelectedDate: (date: string) => void
  referenceDate: string
  referenceTimeMinutes: number
  isLiveTime: boolean
  setIsLiveTime: (val: boolean) => void
  onNavigatePrev: () => void
  onNavigateNext: () => void
  onJumpToday: () => void
  academicYearLabel: string
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  selectedDate,
  setSelectedDate,
  referenceDate,
  referenceTimeMinutes,
  isLiveTime,
  setIsLiveTime,
  onNavigatePrev,
  onNavigateNext,
  onJumpToday,
  academicYearLabel
}) => {
  const [y, m] = selectedDate.split('-').map(Number)
  const currentMonthDate = new Date(y, m - 1, 1)
  const monthName = currentMonthDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })

  return (
    <header className="portal-header">
      {/* Top Banner / District Badge */}
      <div className="header-top">
        <div className="brand-group">
          <div className="logo-badge">
            <span className="logo-icon">🏫</span>
            <div className="logo-text">
              <span className="district-title">Center Grove Community Schools</span>
              <span className="portal-subtitle">
                Academic Calendar & Working Hours Engine ({academicYearLabel})
              </span>
            </div>
          </div>
        </div>

        {/* Live Clock & Reference Indicator */}
        <div className="header-controls-right">
          <div className="ref-time-badge">
            <span className="ref-dot pulse"></span>
            <div className="ref-info">
              <span className="ref-label">Reference Time</span>
              <span className="ref-value">
                {referenceDate} @ {formatMinutesTo12h(referenceTimeMinutes)}
              </span>
            </div>
            <button
              className={`live-toggle-btn ${isLiveTime ? 'active' : ''}`}
              onClick={() => setIsLiveTime(!isLiveTime)}
              title={isLiveTime ? 'Tracking System Clock' : 'Custom Simulation Mode'}
            >
              {isLiveTime ? '● LIVE' : '⚙️ Custom'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation & View Selector */}
      <div className="header-nav-bar">
        {/* Date Navigation */}
        <div className="nav-controls">
          <button className="btn-nav" onClick={onNavigatePrev} aria-label="Previous">
            ◀
          </button>
          <button className="btn-today" onClick={onJumpToday}>
            Today
          </button>
          <button className="btn-nav" onClick={onNavigateNext} aria-label="Next">
            ▶
          </button>

          <div className="active-period-display">
            {viewMode === 'day' && (
              <h2 className="current-period-title">{formatFullDate(selectedDate)}</h2>
            )}
            {viewMode === 'month' && (
              <h2 className="current-period-title">{monthName}</h2>
            )}
            {viewMode === 'year' && (
              <h2 className="current-period-title">Academic Year {academicYearLabel}</h2>
            )}
          </div>
        </div>

        {/* Quick Date Picker */}
        <div className="quick-date-selector">
          <label htmlFor="quick-date-input" className="quick-date-label">
            Jump to:
          </label>
          <input
            id="quick-date-input"
            type="date"
            className="date-input"
            value={selectedDate}
            onChange={(e) => {
              if (e.target.value) setSelectedDate(e.target.value)
            }}
            min="2026-07-01"
            max="2027-06-30"
          />
        </div>

        {/* View Switcher Tabs */}
        <div className="view-switcher" role="tablist">
          <button
            role="tab"
            aria-selected={viewMode === 'day'}
            className={`view-tab ${viewMode === 'day' ? 'active' : ''}`}
            onClick={() => setViewMode('day')}
          >
            <span className="tab-icon">📅</span> Day View
          </button>
          <button
            role="tab"
            aria-selected={viewMode === 'month'}
            className={`view-tab ${viewMode === 'month' ? 'active' : ''}`}
            onClick={() => setViewMode('month')}
          >
            <span className="tab-icon">🗓️</span> Month View
          </button>
          <button
            role="tab"
            aria-selected={viewMode === 'year'}
            className={`view-tab ${viewMode === 'year' ? 'active' : ''}`}
            onClick={() => setViewMode('year')}
          >
            <span className="tab-icon">📊</span> Year View
          </button>
        </div>
      </div>
    </header>
  )
}
