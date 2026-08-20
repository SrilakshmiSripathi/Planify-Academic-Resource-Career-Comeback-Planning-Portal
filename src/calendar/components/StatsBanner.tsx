import React from 'react'
import type {
  DayHoursCalculation,
  MonthHoursCalculation,
  ViewMode,
  YearHoursCalculation
} from '../types'
import { formatDecimalHours, formatHoursMinutes } from '../workHoursUtils'

interface StatsBannerProps {
  viewMode: ViewMode
  dayCalc: DayHoursCalculation
  monthCalc: MonthHoursCalculation
  yearCalc: YearHoursCalculation
}

export const StatsBanner: React.FC<StatsBannerProps> = ({
  viewMode,
  dayCalc,
  monthCalc,
  yearCalc
}) => {
  let futureMin = 0
  let totalMin = 0
  let pastMin = 0
  let primaryTitle = ''
  let schoolDays = 0
  let nonSchoolDays = 0

  if (viewMode === 'day') {
    futureMin = dayCalc.futureMinutes
    totalMin = dayCalc.totalMinutes
    pastMin = dayCalc.pastMinutes
    primaryTitle = 'Selected Day Working Hours'
    schoolDays = dayCalc.dayInfo.isSchoolDay ? 1 : 0
    nonSchoolDays = dayCalc.dayInfo.isSchoolDay ? 0 : 1
  } else if (viewMode === 'month') {
    futureMin = monthCalc.futureMinutes
    totalMin = monthCalc.totalMinutes
    pastMin = monthCalc.pastMinutes
    primaryTitle = `${monthCalc.monthName} Working Hours`
    schoolDays = monthCalc.schoolDaysCount
    nonSchoolDays = monthCalc.nonSchoolDaysCount
  } else {
    futureMin = yearCalc.futureMinutes
    totalMin = yearCalc.totalMinutes
    pastMin = yearCalc.pastMinutes
    primaryTitle = `Academic Year ${yearCalc.academicYearLabel}`
    schoolDays = yearCalc.totalSchoolDays
    nonSchoolDays = yearCalc.totalNonSchoolDays
  }

  const futurePercentage = totalMin > 0 ? Math.round((futureMin / totalMin) * 100) : 0
  const pastPercentage = totalMin > 0 ? Math.round((pastMin / totalMin) * 100) : 0

  return (
    <div className="stats-banner-container">
      {/* Primary Highlight Card: Future Available Working Hours */}
      <div className="stat-card primary-future-card">
        <div className="stat-card-header">
          <div className="stat-icon-wrapper future-icon">⚡</div>
          <div>
            <span className="stat-card-badge">Available Ahead</span>
            <h3 className="stat-card-label">Future Working Hours</h3>
          </div>
        </div>
        <div className="stat-card-body">
          <div className="stat-value-large text-emerald">
            {formatHoursMinutes(futureMin)}
          </div>
          <div className="stat-subtext">
            <span className="decimal-chip">{formatDecimalHours(futureMin)}</span>
            <span className="percentage-chip">{futurePercentage}% of period remaining</span>
          </div>
        </div>
        <div className="stat-progress-bar">
          <div
            className="stat-progress-fill future-fill"
            style={{ width: `${futurePercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Card 2: Total Working Hours */}
      <div className="stat-card">
        <div className="stat-card-header">
          <div className="stat-icon-wrapper total-icon">⏱️</div>
          <div>
            <span className="stat-card-badge neutral">Scheduled Base</span>
            <h3 className="stat-card-label">Total Working Hours</h3>
          </div>
        </div>
        <div className="stat-card-body">
          <div className="stat-value-large text-slate">{formatHoursMinutes(totalMin)}</div>
          <div className="stat-subtext">
            <span className="decimal-chip">{formatDecimalHours(totalMin)}</span>
            <span className="stat-note">{primaryTitle}</span>
          </div>
        </div>
      </div>

      {/* Card 3: Elapsed / Past Time */}
      <div className="stat-card">
        <div className="stat-card-header">
          <div className="stat-icon-wrapper past-icon">⌛</div>
          <div>
            <span className="stat-card-badge muted">Completed</span>
            <h3 className="stat-card-label">Past Working Hours</h3>
          </div>
        </div>
        <div className="stat-card-body">
          <div className="stat-value-large text-amber">{formatHoursMinutes(pastMin)}</div>
          <div className="stat-subtext">
            <span className="decimal-chip">{formatDecimalHours(pastMin)}</span>
            <span className="percentage-chip muted">{pastPercentage}% elapsed</span>
          </div>
        </div>
      </div>

      {/* Card 4: School Days Breakdown */}
      <div className="stat-card school-breakdown-card">
        <div className="stat-card-header">
          <div className="stat-icon-wrapper school-icon">🎒</div>
          <div>
            <span className="stat-card-badge school-badge">Calendar Breakdown</span>
            <h3 className="stat-card-label">School vs Non-School</h3>
          </div>
        </div>
        <div className="stat-card-body days-split-body">
          <div className="day-metric-col">
            <div className="day-metric-val text-green">{schoolDays}</div>
            <div className="day-metric-lbl">School Days</div>
            <div className="day-metric-sub">11h 35m / day</div>
          </div>
          <div className="day-metric-divider"></div>
          <div className="day-metric-col">
            <div className="day-metric-val text-indigo">{nonSchoolDays}</div>
            <div className="day-metric-lbl">Non-School Days</div>
            <div className="day-metric-sub">5h 00m / day</div>
          </div>
        </div>
      </div>
    </div>
  )
}
