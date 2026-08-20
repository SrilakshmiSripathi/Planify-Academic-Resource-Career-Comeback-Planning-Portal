import type { CalendarEvent, DayClassification, DayInfo, TimeShift } from './types'

export const SCHOOL_DAY_SHIFTS: TimeShift[] = [
  {
    id: 'morning_early',
    name: 'Early Morning Block',
    startHour: 5,
    startMinute: 0,
    endHour: 8,
    endMinute: 0,
    durationMinutes: 180, // 3 hours
    isSchoolHours: false
  },
  {
    id: 'school_hours',
    name: 'School Hours Block',
    startHour: 9,
    startMinute: 15,
    endHour: 15,
    endMinute: 50,
    durationMinutes: 395, // 6h 35m
    isSchoolHours: true
  },
  {
    id: 'afternoon_block',
    name: 'Late Afternoon Block',
    startHour: 16,
    startMinute: 0,
    endHour: 18,
    endMinute: 0,
    durationMinutes: 120, // 2 hours
    isSchoolHours: false
  }
]

export const NON_SCHOOL_DAY_SHIFTS: TimeShift[] = [
  {
    id: 'weekend_morning',
    name: 'Early Morning Block',
    startHour: 5,
    startMinute: 0,
    endHour: 8,
    endMinute: 0,
    durationMinutes: 180, // 3 hours
    isSchoolHours: false
  },
  {
    id: 'weekend_afternoon',
    name: 'Late Afternoon Block',
    startHour: 16,
    startMinute: 0,
    endHour: 18,
    endMinute: 0,
    durationMinutes: 120, // 2 hours
    isSchoolHours: false
  }
]

// All official Center Grove 2026-2027 Calendar Events
export const ACADEMIC_EVENTS_2026_2027: CalendarEvent[] = [
  // July 2026
  {
    id: 'event-2026-07-31',
    title: 'Teacher Day - No Students',
    date: '2026-07-31',
    type: 'teacher_day',
    description: 'Teacher Work Day before start of school year.',
    color: '#0284c7'
  },
  // August 2026
  {
    id: 'event-2026-08-03',
    title: 'Teacher Work Day',
    date: '2026-08-03',
    type: 'teacher_day',
    description: 'Staff preparation & setup day - no students.',
    color: '#0284c7'
  },
  {
    id: 'event-2026-08-04',
    title: 'Teacher Work Day',
    date: '2026-08-04',
    type: 'teacher_day',
    description: 'Staff preparation & setup day - no students.',
    color: '#0284c7'
  },
  {
    id: 'event-2026-08-05',
    title: 'First Student Day (Semester 1)',
    date: '2026-08-05',
    type: 'semester_boundary',
    description: 'First official day of instruction for K-12 students.',
    color: '#16a34a'
  },
  {
    id: 'event-2026-08-12',
    title: 'First Day for Preschool',
    date: '2026-08-12',
    type: 'preschool',
    description: 'First day of school for preschool students.',
    color: '#8b5cf6'
  },
  // September 2026
  {
    id: 'event-2026-09-07',
    title: 'Labor Day - No School',
    date: '2026-09-07',
    type: 'no_school',
    description: 'Federal holiday - school corporation closed.',
    color: '#d97706'
  },
  // October 2026
  {
    id: 'event-2026-10-02',
    title: 'End of 1st Grading Period',
    date: '2026-10-02',
    type: 'grading_period',
    description: 'Quarter 1 grading period ends (regular school day).',
    color: '#dc2626'
  },
  {
    id: 'event-2026-10-12',
    title: 'Fall Break Begins',
    date: '2026-10-12',
    endDate: '2026-10-16',
    type: 'no_school',
    description: 'Annual Fall Break week - No School for students/staff.',
    color: '#d97706'
  },
  {
    id: 'event-2026-10-19',
    title: 'Classes Resume',
    date: '2026-10-19',
    type: 'semester_boundary',
    description: 'School resumes after Fall Break.',
    color: '#16a34a'
  },
  // November 2026
  {
    id: 'event-2026-11-23',
    title: 'Thanksgiving Break Begins',
    date: '2026-11-23',
    endDate: '2026-11-27',
    type: 'no_school',
    description: 'Thanksgiving Break week - No School.',
    color: '#d97706'
  },
  {
    id: 'event-2026-11-30',
    title: 'Classes Resume',
    date: '2026-11-30',
    type: 'semester_boundary',
    description: 'School resumes after Thanksgiving Break.',
    color: '#16a34a'
  },
  // December 2026
  {
    id: 'event-2026-12-18',
    title: 'End of 2nd Grading Period; Semester 1',
    date: '2026-12-18',
    type: 'semester_boundary',
    description: 'End of Quarter 2 and Semester 1 (Last student day before Winter Break).',
    color: '#16a34a'
  },
  {
    id: 'event-2026-12-21',
    title: 'Winter Break Begins',
    date: '2026-12-21',
    endDate: '2027-01-01',
    type: 'no_school',
    description: 'Winter holiday break - No school.',
    color: '#d97706'
  },
  // January 2027
  {
    id: 'event-2027-01-04',
    title: 'Professional Development - No Students',
    date: '2027-01-04',
    type: 'teacher_day',
    description: 'Staff Professional Development Day - No students.',
    color: '#0284c7'
  },
  {
    id: 'event-2027-01-05',
    title: 'Classes Resume (Semester 2 Begins)',
    date: '2027-01-05',
    type: 'semester_boundary',
    description: 'First student day of Semester 2.',
    color: '#16a34a'
  },
  {
    id: 'event-2027-01-18',
    title: 'MLK Day - No School',
    date: '2027-01-18',
    type: 'no_school',
    description: 'Martin Luther King Jr. Day - School closed.',
    color: '#d97706'
  },
  // February 2027
  {
    id: 'event-2027-02-15',
    title: 'Presidents Day - No School',
    date: '2027-02-15',
    type: 'no_school',
    description: 'Presidents Day - School closed.',
    color: '#d97706'
  },
  // March 2027
  {
    id: 'event-2027-03-10',
    title: 'End of 3rd Grading Period',
    date: '2027-03-10',
    type: 'grading_period',
    description: 'Quarter 3 grading period ends (regular school day).',
    color: '#dc2626'
  },
  {
    id: 'event-2027-03-22',
    title: 'Spring Break Begins',
    date: '2027-03-22',
    endDate: '2027-04-02',
    type: 'no_school',
    description: 'Two-week Spring Break - No school.',
    color: '#d97706'
  },
  // April 2027
  {
    id: 'event-2027-04-05',
    title: 'Classes Resume',
    date: '2027-04-05',
    type: 'semester_boundary',
    description: 'School resumes after Spring Break.',
    color: '#16a34a'
  },
  // May 2027
  {
    id: 'event-2027-05-27',
    title: 'End of 4th Grading Period; Semester 2',
    date: '2027-05-27',
    type: 'semester_boundary',
    description: 'Last student day of school year & Semester 2.',
    color: '#16a34a'
  },
  {
    id: 'event-2027-05-28',
    title: 'Teacher Day - No Students',
    date: '2027-05-28',
    type: 'teacher_day',
    description: 'Final teacher records & closing day - no students.',
    color: '#0284c7'
  },
  {
    id: 'event-2027-05-31',
    title: 'Memorial Day - No School',
    date: '2027-05-31',
    type: 'no_school',
    description: 'Memorial Day holiday.',
    color: '#d97706'
  },
  // June 2027
  {
    id: 'event-2027-06-06',
    title: 'High School Graduation Ceremony',
    date: '2027-06-06',
    type: 'graduation',
    description: 'Center Grove High School Commencement Ceremony.',
    color: '#9333ea'
  }
]

// Explicit Set of Holiday/Break Date Strings
export const NO_SCHOOL_DATES = new Set<string>([
  '2026-09-07', // Labor Day
  // Fall Break
  '2026-10-12', '2026-10-13', '2026-10-14', '2026-10-15', '2026-10-16',
  // Thanksgiving Break
  '2026-11-23', '2026-11-24', '2026-11-25', '2026-11-26', '2026-11-27',
  // Winter Break
  '2026-12-21', '2026-12-22', '2026-12-23', '2026-12-24', '2026-12-25',
  '2026-12-28', '2026-12-29', '2026-12-30', '2026-12-31',
  '2027-01-01',
  // MLK Day
  '2027-01-18',
  // Presidents Day
  '2027-02-15',
  // Spring Break (2 weeks)
  '2027-03-22', '2027-03-23', '2027-03-24', '2027-03-25', '2027-03-26',
  '2027-03-29', '2027-03-30', '2027-03-31', '2027-04-01', '2027-04-02',
  // Memorial Day
  '2027-05-31'
])

// Teacher Days (No students)
export const TEACHER_DAYS = new Set<string>([
  '2026-07-31',
  '2026-08-03',
  '2026-08-04',
  '2027-01-04',
  '2027-05-28'
])

export const GRADING_PERIOD_ENDS = new Set<string>([
  '2026-10-02',
  '2026-12-18',
  '2027-03-10',
  '2027-05-27'
])

export const SEMESTER_BOUNDARIES = new Set<string>([
  '2026-08-05', // First Student Day
  '2026-10-19', // Fall classes resume
  '2026-11-30', // Thanksgiving classes resume
  '2026-12-18', // Semester 1 End
  '2027-01-05', // Semester 2 Start
  '2027-04-05', // Spring classes resume
  '2027-05-27'  // Semester 2 End
])

/**
 * Classifies any date string (YYYY-MM-DD) into DayInfo
 */
export function classifyDate(dateInput: string | Date): DayInfo {
  let dateStr: string
  let date: Date

  if (typeof dateInput === 'string') {
    dateStr = dateInput
    const [y, m, d] = dateInput.split('-').map(Number)
    date = new Date(y, m - 1, d, 12, 0, 0)
  } else {
    date = dateInput
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    dateStr = `${y}-${m}-${d}`
  }

  const dayOfWeek = date.getDay() // 0 = Sun, 6 = Sat
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

  // Matching events
  const events = ACADEMIC_EVENTS_2026_2027.filter((e) => {
    if (e.endDate) {
      return dateStr >= e.date && dateStr <= e.endDate
    }
    return e.date === dateStr
  })

  const isTeacherDay = TEACHER_DAYS.has(dateStr)
  const isHolidayOrBreak = NO_SCHOOL_DATES.has(dateStr)
  const isGradingPeriodEnd = GRADING_PERIOD_ENDS.has(dateStr)
  const isSemesterBoundary = SEMESTER_BOUNDARIES.has(dateStr)
  const isPreschoolStart = dateStr === '2026-08-12'
  const isGraduation = dateStr === '2027-06-06'

  // Summer range:
  // Before school starts: up to 2026-08-04 (except teacher days)
  // After school ends: from 2027-05-29 onwards (except teacher day / graduation)
  const isSummerBefore = dateStr < '2026-08-05' && !isTeacherDay
  const isSummerAfter = dateStr > '2027-05-28' && !isHolidayOrBreak && !isGraduation
  const isSummer = isSummerBefore || isSummerAfter

  // School Day Logic:
  // A weekday between 2026-08-05 and 2027-05-27 that is NOT in NO_SCHOOL_DATES and NOT in TEACHER_DAYS
  let isSchoolDay = false
  if (!isWeekend && !isSummer) {
    if (dateStr >= '2026-08-05' && dateStr <= '2027-05-27') {
      if (!isHolidayOrBreak && !isTeacherDay) {
        isSchoolDay = true
      }
    }
  }

  // Determine Primary Category & Labels
  let primaryCategory: DayClassification = 'school_day'
  let categoryLabel = 'School Day'
  let colorBadge = {
    bg: 'rgba(22, 163, 74, 0.15)',
    text: '#16a34a',
    border: 'rgba(22, 163, 74, 0.4)'
  }

  if (isGraduation) {
    primaryCategory = 'graduation'
    categoryLabel = 'Graduation Ceremony'
    colorBadge = {
      bg: 'rgba(147, 51, 234, 0.18)',
      text: '#9333ea',
      border: 'rgba(147, 51, 234, 0.45)'
    }
  } else if (isTeacherDay) {
    primaryCategory = 'teacher_day'
    categoryLabel = 'Teacher Work Day (No Students)'
    colorBadge = {
      bg: 'rgba(2, 132, 199, 0.15)',
      text: '#0284c7',
      border: 'rgba(2, 132, 199, 0.4)'
    }
  } else if (isHolidayOrBreak) {
    primaryCategory = 'break'
    categoryLabel = events[0]?.title || 'No School / Holiday Break'
    colorBadge = {
      bg: 'rgba(217, 119, 6, 0.15)',
      text: '#d97706',
      border: 'rgba(217, 119, 6, 0.4)'
    }
  } else if (isWeekend) {
    primaryCategory = 'weekend'
    categoryLabel = 'Weekend'
    colorBadge = {
      bg: 'rgba(100, 116, 139, 0.12)',
      text: '#64748b',
      border: 'rgba(100, 116, 139, 0.25)'
    }
  } else if (isSummer) {
    primaryCategory = 'summer'
    categoryLabel = 'Summer Recess'
    colorBadge = {
      bg: 'rgba(148, 163, 184, 0.15)',
      text: '#64748b',
      border: 'rgba(148, 163, 184, 0.3)'
    }
  } else if (isPreschoolStart) {
    primaryCategory = 'preschool_start'
    categoryLabel = 'First Day Preschool & School Day'
    colorBadge = {
      bg: 'rgba(139, 92, 246, 0.15)',
      text: '#8b5cf6',
      border: 'rgba(139, 92, 246, 0.4)'
    }
  }

  return {
    dateStr,
    date,
    dayOfWeek,
    isSchoolDay,
    isWeekend,
    isTeacherDay,
    isBreak: isHolidayOrBreak,
    isHoliday: isHolidayOrBreak,
    isSummer,
    isGradingPeriodEnd,
    isSemesterBoundary,
    isPreschoolStart,
    isGraduation,
    events,
    primaryCategory,
    categoryLabel,
    colorBadge
  }
}
