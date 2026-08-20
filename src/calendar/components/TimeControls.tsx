import React from 'react'
import { formatMinutesTo12h } from '../workHoursUtils'

interface TimeControlsProps {
  referenceDate: string
  setReferenceDate: (date: string) => void
  selectedDate: string
  referenceTimeMinutes: number
  setReferenceTimeMinutes: (minutes: number) => void
  isLiveTime: boolean
  setIsLiveTime: (val: boolean) => void
}

const PRESET_TIMES = [
  { label: '5:00 AM (Start Shift 1)', minutes: 5 * 60 },
  { label: '8:00 AM (End Shift 1)', minutes: 8 * 60 },
  { label: '9:15 AM (Start School Shift)', minutes: 9 * 60 + 15 },
  { label: '12:00 PM (Noon)', minutes: 12 * 60 },
  { label: '3:29 PM (Current Ref)', minutes: 15 * 60 + 29 },
  { label: '3:50 PM (End School Shift)', minutes: 15 * 60 + 50 },
  { label: '4:00 PM (Start Shift 3)', minutes: 16 * 60 },
  { label: '6:00 PM (End Day Shifts)', minutes: 18 * 60 }
]

export const TimeControls: React.FC<TimeControlsProps> = ({
  referenceDate,
  setReferenceDate,
  selectedDate,
  referenceTimeMinutes,
  setReferenceTimeMinutes,
  setIsLiveTime
}) => {
  const syncWithSelectedDate = () => {
    setReferenceDate(selectedDate)
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLiveTime(false)
    setReferenceTimeMinutes(Number(e.target.value))
  }

  const handlePresetClick = (minutes: number) => {
    setIsLiveTime(false)
    setReferenceTimeMinutes(minutes)
  }

  return (
    <div className="time-scrubber-panel">
      <div className="scrubber-header">
        <div className="scrubber-title-group">
          <span className="scrubber-badge">Interactive Timeline Cutoff</span>
          <h4 className="scrubber-heading">Future Available Time Simulator</h4>
          <p className="scrubber-subtext">
            Calculates remaining working hours strictly *after* this cutoff date & time. Past time is excluded.
          </p>
        </div>

        <div className="scrubber-actions">
          {referenceDate !== selectedDate && (
            <button className="btn-sync-date" onClick={syncWithSelectedDate}>
              📅 Align Cutoff to Selected Day ({selectedDate})
            </button>
          )}
          <div className="time-readout-pill">
            <span className="readout-clock">🕒</span>
            <span className="readout-val">{formatMinutesTo12h(referenceTimeMinutes)}</span>
            <span className="readout-date">({referenceDate})</span>
          </div>
        </div>
      </div>

      {/* Slider Bar */}
      <div className="slider-wrapper">
        <div className="slider-track-container">
          <input
            type="range"
            min="0"
            max="1439"
            step="5"
            value={referenceTimeMinutes}
            onChange={handleSliderChange}
            className="time-slider"
            aria-label="Time scrubber slider"
          />
          {/* Shift Markers on Track */}
          <div className="slider-markers">
            <span className="slider-marker" style={{ left: '0%' }}>
              00:00
            </span>
            <span className="slider-marker highlight" style={{ left: `${(300 / 1440) * 100}%` }}>
              5 AM
            </span>
            <span className="slider-marker highlight" style={{ left: `${(480 / 1440) * 100}%` }}>
              8 AM
            </span>
            <span className="slider-marker school" style={{ left: `${(555 / 1440) * 100}%` }}>
              9:15 AM
            </span>
            <span className="slider-marker school" style={{ left: `${(950 / 1440) * 100}%` }}>
              3:50 PM
            </span>
            <span className="slider-marker highlight" style={{ left: `${(960 / 1440) * 100}%` }}>
              4 PM
            </span>
            <span className="slider-marker highlight" style={{ left: `${(1080 / 1440) * 100}%` }}>
              6 PM
            </span>
            <span className="slider-marker" style={{ left: '100%' }}>
              24:00
            </span>
          </div>
        </div>
      </div>

      {/* Quick Preset Buttons */}
      <div className="presets-row">
        <span className="presets-label">Quick Cutoff:</span>
        <div className="presets-button-group">
          {PRESET_TIMES.map((preset) => {
            const isSelected = referenceTimeMinutes === preset.minutes
            return (
              <button
                key={preset.label}
                className={`btn-preset ${isSelected ? 'active' : ''}`}
                onClick={() => handlePresetClick(preset.minutes)}
              >
                {preset.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
