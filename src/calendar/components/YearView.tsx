import React from 'react'
import type { YearHoursCalculation } from '../types'
import { formatDecimalHours, formatHoursMinutes } from '../workHoursUtils'

interface YearViewProps {
  yearCalc: YearHoursCalculation
  selectedDate: string
  referenceDate: string
  deadlineDate?: string
  onSelectMonth: (year: number, month: number) => void
  onSelectDay: (dateStr: string) => void
}

const MINI_WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export const YearView: React.FC<YearViewProps> = ({
  yearCalc,
  selectedDate,
  referenceDate,
  deadlineDate,
  onSelectMonth,
  onSelectDay
}) => {
  const { semesters, months, academicYearLabel, totalMinutes, futureMinutes } = yearCalc

  return (
    <div className="year-view-container">
      {/* Semester Breakdown Summary Banner */}
      <div className="semesters-banner-grid">
        {/* Semester 1 Card */}
        <div className="semester-summary-card sem1-card">
          <div className="semester-card-header">
            <span className="semester-pill sem1-pill">Semester 1</span>
            <span className="semester-dates">{semesters.sem1.period}</span>
          </div>
          <div className="semester-metrics">
            <div className="sem-metric-item">
              <span className="sem-label">Student Days:</span>
              <span className="sem-val font-bold text-green">
                {semesters.sem1.schoolDays} days
              </span>
            </div>
            <div className="sem-metric-item">
              <span className="sem-label">Total Work Hours:</span>
              <span className="sem-val font-semibold">
                {formatHoursMinutes(semesters.sem1.totalWorkingMinutes)}
              </span>
            </div>
            <div className="sem-metric-item">
              <span className="sem-label">Future Available:</span>
              <span className="sem-val font-bold text-emerald">
                {formatHoursMinutes(semesters.sem1.futureWorkingMinutes)}
              </span>
            </div>
          </div>
        </div>

        {/* Semester 2 Card */}
        <div className="semester-summary-card sem2-card">
          <div className="semester-card-header">
            <span className="semester-pill sem2-pill">Semester 2</span>
            <span className="semester-dates">{semesters.sem2.period}</span>
          </div>
          <div className="semester-metrics">
            <div className="sem-metric-item">
              <span className="sem-label">Student Days:</span>
              <span className="sem-val font-bold text-green">
                {semesters.sem2.schoolDays} days
              </span>
            </div>
            <div className="sem-metric-item">
              <span className="sem-label">Total Work Hours:</span>
              <span className="sem-val font-semibold">
                {formatHoursMinutes(semesters.sem2.totalWorkingMinutes)}
              </span>
            </div>
            <div className="sem-metric-item">
              <span className="sem-label">Future Available:</span>
              <span className="sem-val font-bold text-emerald">
                {formatHoursMinutes(semesters.sem2.futureWorkingMinutes)}
              </span>
            </div>
          </div>
        </div>

        {/* Full Year Summary Card */}
        <div className="semester-summary-card total-year-card">
          <div className="semester-card-header">
            <span className="semester-pill total-pill">Academic Year {academicYearLabel}</span>
            <span className="semester-dates">365 Calendar Days</span>
          </div>
          <div className="semester-metrics">
            <div className="sem-metric-item">
              <span className="sem-label">Total School Days:</span>
              <span className="sem-val font-bold text-green">
                {yearCalc.totalSchoolDays} Days (180 Official)
              </span>
            </div>
            <div className="sem-metric-item">
              <span className="sem-label">Annual Work Hours:</span>
              <span className="sem-val font-semibold">
                {formatHoursMinutes(totalMinutes)} ({formatDecimalHours(totalMinutes)})
              </span>
            </div>
            <div className="sem-metric-item">
              <span className="sem-label">Future Available:</span>
              <span className="sem-val font-bold text-emerald">
                {formatHoursMinutes(futureMinutes)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 12-Month Grid */}
      <div className="year-months-grid">
        {months.map((mCalc) => {
          const { year, month, monthName, days, schoolDaysCount, totalMinutes, futureMinutes } = mCalc
          const firstDayOfWeek = new Date(year, month, 1).getDay()
          const paddingSlots = Array.from({ length: firstDayOfWeek }, (_, i) => i)

          return (
            <div
              key={`${year}-${month}`}
              className="mini-month-card"
              onClick={() => onSelectMonth(year, month)}
              role="button"
              tabIndex={0}
            >
              {/* Mini Month Header */}
              <div className="mini-month-header">
                <div className="mini-month-title-group">
                  <h4 className="mini-month-title">
                    {monthName} {year}
                  </h4>
                  <span className="mini-school-count">{schoolDaysCount} school days</span>
                </div>
                <div className="mini-month-hours-group">
                  <span className="mini-total-hours">{formatHoursMinutes(totalMinutes)}</span>
                  <span className="mini-future-hours" title="Future Available Hours">
                    ⚡ {formatHoursMinutes(futureMinutes)} avail
                  </span>
                </div>
              </div>

              {/* Weekday Row */}
              <div className="mini-weekday-row">
                {MINI_WEEKDAYS.map((w, idx) => (
                  <span key={idx} className="mini-weekday-cell">
                    {w}
                  </span>
                ))}
              </div>

              {/* Days Heatmap Grid */}
              <div className="mini-days-grid">
                {paddingSlots.map((p) => (
                  <span key={`p-${p}`} className="mini-day-cell mini-pad" />
                ))}

                {days.map((dCalc) => {
                  const { dayInfo } = dCalc
                  const isSelected = dayInfo.dateStr === selectedDate
                  const isRef = dayInfo.dateStr === referenceDate
                  const isDeadline = dayInfo.dateStr === deadlineDate
                  const dayNum = parseInt(dayInfo.dateStr.split('-')[2], 10)

                  let miniClass = 'mini-day-cell'
                  if (dayInfo.isSchoolDay) miniClass += ' mini-school'
                  else if (dayInfo.isTeacherDay) miniClass += ' mini-teacher'
                  else if (dayInfo.isBreak) miniClass += ' mini-break'
                  else if (dayInfo.isGraduation) miniClass += ' mini-graduation'
                  else miniClass += ' mini-off'

                  if (isSelected) miniClass += ' mini-selected'
                  if (isRef) miniClass += ' mini-ref'
                  if (isDeadline) miniClass += ' mini-deadline'

                  return (
                    <button
                      key={dayInfo.dateStr}
                      className={miniClass}
                      title={`${dayInfo.dateStr} (${dayInfo.categoryLabel})${
                        isDeadline ? ' 🎯 [TARGET DEADLINE]' : ''
                      } - ${formatHoursMinutes(dCalc.totalMinutes)}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectDay(dayInfo.dateStr)
                      }}
                    >
                      {dayNum}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
