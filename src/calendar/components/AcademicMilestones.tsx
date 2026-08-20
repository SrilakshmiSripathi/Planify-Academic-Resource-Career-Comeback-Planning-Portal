import React from 'react'
import { ACADEMIC_EVENTS_2026_2027 } from '../academicData'

interface AcademicMilestonesProps {
  selectedDate: string
  onSelectDate: (dateStr: string) => void
}

export const AcademicMilestones: React.FC<AcademicMilestonesProps> = ({
  selectedDate,
  onSelectDate
}) => {
  return (
    <div className="milestones-bar">
      <span className="milestones-title">📍 Key Academic Milestones:</span>
      <div className="milestones-scroll">
        {ACADEMIC_EVENTS_2026_2027.map((event) => {
          const isSelected = event.date === selectedDate
          return (
            <button
              key={event.id}
              className={`milestone-chip ${isSelected ? 'active' : ''}`}
              style={{
                borderColor: event.color,
                backgroundColor: isSelected ? event.color : undefined,
                color: isSelected ? '#ffffff' : undefined
              }}
              onClick={() => onSelectDate(event.date)}
              title={`${event.date}: ${event.title}`}
            >
              <span className="milestone-date">{event.date.substring(5)}</span>
              <span className="milestone-name">{event.title}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
