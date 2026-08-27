import React from 'react'
import type { DeadlineCalculation } from '../types'
import { formatFullDate } from '../workHoursUtils'

interface TargetDeadlineTrackerProps {
  deadlineDate: string
  setDeadlineDate: (date: string) => void
  deadlineCalc: DeadlineCalculation | null
  referenceDate: string
}

const DEADLINE_PRESETS = [
  { label: 'CKA', date: '2026-10-30', desc: 'Oct 30, 2026' },
  { label: 'PCA', date: '2026-11-27', desc: 'Nov 27, 2026' },
]

export const TargetDeadlineTracker: React.FC<TargetDeadlineTrackerProps> = ({
  deadlineDate,
  setDeadlineDate,
  deadlineCalc,
  referenceDate
}) => {
  return (
    <div className="target-deadline-panel">
      {/* Panel Header & Date Picker */}
      <div className="deadline-panel-header">
        <div className="deadline-title-group">
          <div className="deadline-icon-wrapper">🎯</div>
          <div>
            <span className="deadline-badge">Goal Planning & Countdown</span>
            <h3 className="deadline-heading">Target Deadline Calculator</h3>
            <p className="deadline-subtext">
              Select a target deadline date to instantly calculate real-time remaining calendar days & hours, plus upcoming working shifts.
            </p>
          </div>
        </div>

        {/* Date Selector with Placeholder & Clear */}
        <div className="deadline-input-container">
          <div className="deadline-input-wrapper">
            <label htmlFor="deadline-date-picker" className="deadline-input-label">
              Target Deadline Date:
            </label>
            <div className="deadline-input-row">
              <input
                id="deadline-date-picker"
                type="date"
                className="deadline-date-input"
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
                placeholder="YYYY-MM-DD (e.g. 2026-10-02)"
                min="2026-07-01"
                max="2027-06-30"
                aria-label="Target deadline date selector"
              />
              {deadlineDate && (
                <button
                  type="button"
                  className="btn-clear-deadline"
                  onClick={() => setDeadlineDate('')}
                  title="Clear target deadline"
                >
                  ✕ Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preset Milestone Shortcuts */}
      <div className="deadline-presets-row">
        <span className="presets-caption">Quick Milestone Presets:</span>
        <div className="deadline-presets-chips">
          {DEADLINE_PRESETS.map((preset) => {
            const isSelected = deadlineDate === preset.date
            return (
              <button
                key={preset.date}
                type="button"
                className={`deadline-preset-chip ${isSelected ? 'active' : ''}`}
                onClick={() => setDeadlineDate(preset.date)}
              >
                <span className="preset-name">{preset.label}</span>
                <span className="preset-date">({preset.desc})</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Calculation Readout or Placeholder State */}
      {deadlineCalc && deadlineDate ? (
        <div className="deadline-results-grid">
          {/* Card 1: Time Remaining in Days and Hours (Primary Request) */}
          <div className={`deadline-card primary-countdown-card ${deadlineCalc.isPassed ? 'passed' : ''}`}>
            <div className="dcard-header">
              <span className="dcard-tag">
                {deadlineCalc.isPassed
                  ? '⚠️ Status'
                  : deadlineCalc.isToday
                  ? '⚡ Due Today'
                  : '⏳ Time Remaining'}
              </span>
              <span className="dcard-deadline-target">
                Target: {formatFullDate(deadlineDate)}
              </span>
            </div>

            <div className="dcard-body">
              <div className="countdown-highlight">
                {deadlineCalc.isPassed ? (
                  <div className="countdown-value text-red">Deadline Passed</div>
                ) : (
                  <>
                    <div className="countdown-value text-cyan">
                      <span className="num-emphasis">{deadlineCalc.calendarDaysRemaining}</span>{' '}
                      <span className="unit-label">Days</span>{' '}
                      <span className="num-emphasis">{deadlineCalc.calendarHoursRemaining}</span>{' '}
                      <span className="unit-label">Hours</span>
                      {deadlineCalc.calendarDaysRemaining === 0 && (
                        <>
                          {' '}
                          <span className="num-emphasis">{deadlineCalc.calendarMinutesRemaining}</span>{' '}
                          <span className="unit-label">Mins</span>
                        </>
                      )}
                    </div>
                    <div className="countdown-sub">
                      {deadlineCalc.calendarCountdownFormatted} until 11:59 PM on deadline
                    </div>
                  </>
                )}
              </div>

              {deadlineCalc.matchedMilestone && (
                <div className="matched-milestone-pill" style={{ borderColor: deadlineCalc.matchedMilestone.color }}>
                  <span className="milestone-dot" style={{ backgroundColor: deadlineCalc.matchedMilestone.color }} />
                  <span>{deadlineCalc.matchedMilestone.title}</span>
                </div>
              )}
            </div>

            {!deadlineCalc.isPassed && (
              <div className="dcard-progress">
                <div className="progress-label-row">
                  <span>Year Timeline Progress</span>
                  <span>{deadlineCalc.percentageElapsed}% elapsed</span>
                </div>
                <div className="dcard-progress-bar">
                  <div
                    className="dcard-progress-fill"
                    style={{ width: `${deadlineCalc.percentageElapsed}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Card 2: Future Working Hours to Deadline */}
          <div className="deadline-card">
            <div className="dcard-header">
              <span className="dcard-tag emerald-tag">⚡ Work Capacity</span>
              <span className="dcard-sub">Shift Hours Scheduled</span>
            </div>
            <div className="dcard-body">
              <div className="dcard-metric-val text-emerald">
                {deadlineCalc.workingHoursFormatted}
              </div>
              <div className="dcard-metric-sub">
                <span className="decimal-chip">{deadlineCalc.workingDecimalHours}</span>
                <span className="equiv-chip">{deadlineCalc.workingDaysEquivalentFormatted}</span>
              </div>
              <div className="dcard-note">
                Working time available between {referenceDate} cutoff and deadline.
              </div>
            </div>
          </div>

          {/* Card 3: School vs Non-School Days Split */}
          <div className="deadline-card">
            <div className="dcard-header">
              <span className="dcard-tag school-tag">🎒 Calendar Distribution</span>
              <span className="dcard-sub">{deadlineCalc.totalDaysInRange} Total Days</span>
            </div>
            <div className="dcard-body days-split-grid">
              <div className="split-metric">
                <span className="split-val text-green">{deadlineCalc.schoolDaysRemaining}</span>
                <span className="split-label">School Days</span>
                <span className="split-rate">11h 35m / day</span>
              </div>
              <div className="split-divider" />
              <div className="split-metric">
                <span className="split-val text-indigo">{deadlineCalc.nonSchoolDaysRemaining}</span>
                <span className="split-label">Non-School</span>
                <span className="split-rate">5h 00m / day</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State with Helpful Placeholder Guidance */
        <div className="deadline-empty-placeholder">
          <div className="placeholder-icon">📅</div>
          <div className="placeholder-text">
            <h4>No Target Deadline Selected</h4>
            <p>
              Choose a date using the picker above or click one of the quick milestone presets to calculate remaining days, hours, and available working capacity.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
