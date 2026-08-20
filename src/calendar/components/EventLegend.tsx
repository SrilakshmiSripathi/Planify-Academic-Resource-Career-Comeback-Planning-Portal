import React, { useState } from 'react'

export const EventLegend: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="legend-container">
      <div className="legend-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="legend-title-group">
          <span className="legend-icon">🏷️</span>
          <span className="legend-title">Center Grove Official Calendar Key & Working Hours Rules</span>
        </div>
        <button className="legend-toggle-btn">
          {isOpen ? '▲ Hide Rules & Legend' : '▼ Show Rules & Legend'}
        </button>
      </div>

      {isOpen && (
        <div className="legend-content">
          {/* Rules Banner */}
          <div className="rules-cards-row">
            <div className="rule-card school-rule-card">
              <div className="rule-card-header">
                <span className="rule-badge green-badge">School Day Formula</span>
                <span className="rule-hours-total">11h 35m / day</span>
              </div>
              <ul className="rule-shifts-list">
                <li>
                  <span className="shift-bullet">●</span> <strong>Shift 1:</strong> 5:00 AM – 8:00 AM (3h 00m)
                </li>
                <li>
                  <span className="shift-bullet">●</span> <strong>Shift 2:</strong> 9:15 AM – 3:50 PM (6h 35m)
                </li>
                <li>
                  <span className="shift-bullet">●</span> <strong>Shift 3:</strong> 4:00 PM – 6:00 PM (2h 00m)
                </li>
              </ul>
            </div>

            <div className="rule-card non-school-rule-card">
              <div className="rule-card-header">
                <span className="rule-badge blue-badge">Weekend & Non-School Day Formula</span>
                <span className="rule-hours-total">5h 00m / day</span>
              </div>
              <ul className="rule-shifts-list">
                <li>
                  <span className="shift-bullet">●</span> <strong>Shift 1:</strong> 5:00 AM – 8:00 AM (3h 00m)
                </li>
                <li>
                  <span className="shift-bullet">●</span> <strong>Shift 2:</strong> 4:00 PM – 6:00 PM (2h 00m)
                </li>
                <li className="text-muted">
                  <span className="shift-bullet">○</span> Includes Teacher Days, Breaks, Holidays & Weekends
                </li>
              </ul>
            </div>
          </div>

          {/* Color Key Badges */}
          <div className="legend-badges-grid">
            <div className="legend-item">
              <span className="color-swatch swatch-green"></span>
              <span className="legend-label">First / Last Day of Semester & Regular School Day</span>
            </div>
            <div className="legend-item">
              <span className="color-swatch swatch-blue"></span>
              <span className="legend-label">Teacher Work Day / Professional Development (No Students)</span>
            </div>
            <div className="legend-item">
              <span className="color-swatch swatch-yellow"></span>
              <span className="legend-label">No School (Holidays / Fall, Thanksgiving, Winter, Spring Breaks)</span>
            </div>
            <div className="legend-item">
              <span className="color-swatch swatch-red"></span>
              <span className="legend-label">End of Grading Period (Q1 Oct 2, Q2 Dec 18, Q3 Mar 10, Q4 May 27)</span>
            </div>
            <div className="legend-item">
              <span className="color-swatch swatch-purple"></span>
              <span className="legend-label">Graduation Ceremony / Preschool First Day</span>
            </div>
            <div className="legend-item">
              <span className="color-swatch swatch-gray"></span>
              <span className="legend-label">Weekend / Summer Recess</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
