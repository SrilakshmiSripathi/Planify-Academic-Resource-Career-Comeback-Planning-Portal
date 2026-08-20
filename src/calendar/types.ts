export type ViewMode = 'day' | 'month' | 'year'

export type DayClassification =
  | 'school_day'
  | 'teacher_day'
  | 'break'
  | 'holiday'
  | 'weekend'
  | 'summer'
  | 'graduation'
  | 'preschool_start'

export interface TimeShift {
  id: string
  name: string
  startHour: number
  startMinute: number
  endHour: number
  endMinute: number
  durationMinutes: number
  isSchoolHours?: boolean
}

export interface CalendarEvent {
  id: string
  title: string
  date: string // YYYY-MM-DD
  endDate?: string // YYYY-MM-DD for ranges
  type: 'semester_boundary' | 'preschool' | 'grading_period' | 'teacher_day' | 'no_school' | 'graduation'
  description?: string
  color: string
  textColor?: string
}

export interface DayInfo {
  dateStr: string // YYYY-MM-DD
  date: Date
  dayOfWeek: number // 0 = Sun, 6 = Sat
  isSchoolDay: boolean
  isWeekend: boolean
  isTeacherDay: boolean
  isBreak: boolean
  isHoliday: boolean
  isSummer: boolean
  isGradingPeriodEnd: boolean
  isSemesterBoundary: boolean
  isPreschoolStart: boolean
  isGraduation: boolean
  events: CalendarEvent[]
  primaryCategory: DayClassification
  categoryLabel: string
  colorBadge: {
    bg: string
    text: string
    border: string
  }
}

export interface ShiftTimeStatus {
  shift: TimeShift
  status: 'past' | 'active' | 'upcoming'
  elapsedMinutes: number
  remainingMinutes: number
  totalMinutes: number
}

export interface DayHoursCalculation {
  dayInfo: DayInfo
  shifts: TimeShift[]
  totalMinutes: number
  pastMinutes: number
  futureMinutes: number
  shiftStatuses: ShiftTimeStatus[]
}

export interface MonthHoursCalculation {
  year: number
  month: number // 0-indexed (0 = Jan, 6 = Jul)
  monthName: string
  daysCount: number
  schoolDaysCount: number
  nonSchoolDaysCount: number
  teacherDaysCount: number
  holidayBreakDaysCount: number
  totalMinutes: number
  pastMinutes: number
  futureMinutes: number
  days: DayHoursCalculation[]
}

export interface SemesterCalculation {
  name: string
  period: string
  schoolDays: number
  nonSchoolDays: number
  teacherDays: number
  totalWorkingMinutes: number
  futureWorkingMinutes: number
}

export interface YearHoursCalculation {
  academicYearLabel: string // "2026-2027"
  totalMinutes: number
  pastMinutes: number
  futureMinutes: number
  totalSchoolDays: number
  totalNonSchoolDays: number
  totalTeacherDays: number
  semesters: {
    sem1: SemesterCalculation
    sem2: SemesterCalculation
  }
  months: MonthHoursCalculation[]
}

export interface TimeReference {
  selectedDate: string // YYYY-MM-DD
  selectedTimeMinutes: number // 0 to 1439 (minutes from midnight)
  isLiveTime: boolean
}

export interface DeadlineCalculation {
  deadlineDateStr: string
  refDateStr: string
  refTimeMinutes: number
  isPassed: boolean
  isToday: boolean

  // Calendar countdown
  calendarDaysRemaining: number
  calendarHoursRemaining: number
  calendarMinutesRemaining: number
  totalCalendarMinutes: number
  calendarCountdownFormatted: string // e.g. "43 days, 2 hours"

  // Working Hours countdown
  totalWorkingMinutesRemaining: number
  workingHoursFormatted: string // e.g. "485h 15m"
  workingDecimalHours: string // e.g. "485.25 hrs"
  workingDaysEquivalentFormatted: string // e.g. "41 working days, 10h 35m"

  // Calendar breakdown
  schoolDaysRemaining: number
  nonSchoolDaysRemaining: number
  teacherDaysRemaining: number
  holidayBreakDaysRemaining: number
  totalDaysInRange: number

  // Progress metrics
  percentageElapsed: number

  // Milestone info if matches one
  matchedMilestone?: CalendarEvent
}

