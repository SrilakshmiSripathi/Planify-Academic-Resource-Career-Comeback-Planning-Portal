import { ACADEMIC_EVENTS_2026_2027, classifyDate, NON_SCHOOL_DAY_SHIFTS, SCHOOL_DAY_SHIFTS } from './academicData'
import type {
  DayHoursCalculation,
  DayInfo,
  DeadlineCalculation,
  MonthHoursCalculation,
  SemesterCalculation,
  ShiftTimeStatus,
  TimeShift,
  YearHoursCalculation
} from './types'

/**
 * Converts hours and minutes into total minutes from midnight (0-1439)
 */
export function toMinutesFromMidnight(hour: number, minute: number): number {
  return hour * 60 + minute
}

/**
 * Formats minutes into human-readable "Xh Ym" string (e.g. 695 -> "11h 35m")
 */
export function formatHoursMinutes(totalMinutes: number): string {
  const isNegative = totalMinutes < 0
  const absMin = Math.round(Math.abs(totalMinutes))
  const hours = Math.floor(absMin / 60)
  const minutes = absMin % 60

  const str = `${hours}h ${minutes.toString().padStart(2, '0')}m`
  return isNegative ? `-${str}` : str
}

/**
 * Formats minutes into decimal hours string (e.g. 695 -> "11.58 hrs")
 */
export function formatDecimalHours(totalMinutes: number, decimals: number = 2): string {
  const hours = totalMinutes / 60
  return `${hours.toFixed(decimals)} hrs`
}

/**
 * Converts minutes from midnight to a 12-hour formatted time (e.g. 555 -> "9:15 AM", 950 -> "3:50 PM")
 */
export function formatMinutesTo12h(totalMinutes: number): string {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440
  const hours24 = Math.floor(normalized / 60)
  const mins = normalized % 60
  const period = hours24 >= 12 ? 'PM' : 'AM'
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12
  return `${hours12}:${mins.toString().padStart(2, '0')} ${period}`
}

/**
 * Formats YYYY-MM-DD into readable date (e.g. "Wednesday, Aug 5, 2026")
 */
export function formatFullDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d, 12, 0, 0)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

/**
 * Returns the working shifts applicable for a given day (School day vs Weekend/Non-school day)
 */
export function getDayShifts(dayInfo: DayInfo): TimeShift[] {
  return dayInfo.isSchoolDay ? SCHOOL_DAY_SHIFTS : NON_SCHOOL_DAY_SHIFTS
}

/**
 * Calculates working hours and status for a single day relative to a reference date and time
 */
export function calculateDayHours(
  dateInput: string | DayInfo,
  refDateStr: string,
  refTimeMinutes: number
): DayHoursCalculation {
  const dayInfo = typeof dateInput === 'string' ? classifyDate(dateInput) : dateInput
  const dateStr = dayInfo.dateStr
  const shifts = getDayShifts(dayInfo)

  let pastMinutes = 0
  let futureMinutes = 0
  const shiftStatuses: ShiftTimeStatus[] = []

  // Check temporal relation to reference date
  if (dateStr < refDateStr) {
    // Past day: all shifts are elapsed
    for (const shift of shifts) {
      pastMinutes += shift.durationMinutes
      shiftStatuses.push({
        shift,
        status: 'past',
        elapsedMinutes: shift.durationMinutes,
        remainingMinutes: 0,
        totalMinutes: shift.durationMinutes
      })
    }
  } else if (dateStr > refDateStr) {
    // Future day: all shifts are future available
    for (const shift of shifts) {
      futureMinutes += shift.durationMinutes
      shiftStatuses.push({
        shift,
        status: 'upcoming',
        elapsedMinutes: 0,
        remainingMinutes: shift.durationMinutes,
        totalMinutes: shift.durationMinutes
      })
    }
  } else {
    // Today / selected reference date: calculate based on refTimeMinutes
    for (const shift of shifts) {
      const shiftStartMin = toMinutesFromMidnight(shift.startHour, shift.startMinute)
      const shiftEndMin = toMinutesFromMidnight(shift.endHour, shift.endMinute)
      const shiftDuration = shift.durationMinutes

      if (refTimeMinutes <= shiftStartMin) {
        // Shift hasn't started yet
        futureMinutes += shiftDuration
        shiftStatuses.push({
          shift,
          status: 'upcoming',
          elapsedMinutes: 0,
          remainingMinutes: shiftDuration,
          totalMinutes: shiftDuration
        })
      } else if (refTimeMinutes >= shiftEndMin) {
        // Shift is fully completed
        pastMinutes += shiftDuration
        shiftStatuses.push({
          shift,
          status: 'past',
          elapsedMinutes: shiftDuration,
          remainingMinutes: 0,
          totalMinutes: shiftDuration
        })
      } else {
        // Shift is currently active
        const elapsed = refTimeMinutes - shiftStartMin
        const remaining = shiftEndMin - refTimeMinutes
        pastMinutes += elapsed
        futureMinutes += remaining
        shiftStatuses.push({
          shift,
          status: 'active',
          elapsedMinutes: elapsed,
          remainingMinutes: remaining,
          totalMinutes: shiftDuration
        })
      }
    }
  }

  const totalMinutes = shifts.reduce((sum, s) => sum + s.durationMinutes, 0)

  return {
    dayInfo,
    shifts,
    totalMinutes,
    pastMinutes,
    futureMinutes,
    shiftStatuses
  }
}

/**
 * Calculates working hours statistics for an entire month
 */
export function calculateMonthHours(
  year: number,
  month: number, // 0 = Jan, 11 = Dec
  refDateStr: string,
  refTimeMinutes: number
): MonthHoursCalculation {
  const monthName = new Date(year, month, 1).toLocaleString('en-US', { month: 'long' })
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const days: DayHoursCalculation[] = []
  let schoolDaysCount = 0
  let nonSchoolDaysCount = 0
  let teacherDaysCount = 0
  let holidayBreakDaysCount = 0
  let totalMinutes = 0
  let pastMinutes = 0
  let futureMinutes = 0

  for (let d = 1; d <= daysInMonth; d++) {
    const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const dayCalc = calculateDayHours(dayStr, refDateStr, refTimeMinutes)
    days.push(dayCalc)

    if (dayCalc.dayInfo.isSchoolDay) {
      schoolDaysCount++
    } else {
      nonSchoolDaysCount++
    }

    if (dayCalc.dayInfo.isTeacherDay) {
      teacherDaysCount++
    }
    if (dayCalc.dayInfo.isBreak || dayCalc.dayInfo.isHoliday) {
      holidayBreakDaysCount++
    }

    totalMinutes += dayCalc.totalMinutes
    pastMinutes += dayCalc.pastMinutes
    futureMinutes += dayCalc.futureMinutes
  }

  return {
    year,
    month,
    monthName,
    daysCount: daysInMonth,
    schoolDaysCount,
    nonSchoolDaysCount,
    teacherDaysCount,
    holidayBreakDaysCount,
    totalMinutes,
    pastMinutes,
    futureMinutes,
    days
  }
}

/**
 * Calculates academic year working hours from July 2026 through June 2027
 */
export function calculateAcademicYearHours(
  academicStartYear: number = 2026,
  refDateStr: string,
  refTimeMinutes: number
): YearHoursCalculation {
  // Academic calendar order: July to Dec of startYear, then Jan to June of startYear + 1
  const monthSequence = [
    { year: academicStartYear, month: 6 }, // July
    { year: academicStartYear, month: 7 }, // August
    { year: academicStartYear, month: 8 }, // September
    { year: academicStartYear, month: 9 }, // October
    { year: academicStartYear, month: 10 }, // November
    { year: academicStartYear, month: 11 }, // December
    { year: academicStartYear + 1, month: 0 }, // January
    { year: academicStartYear + 1, month: 1 }, // February
    { year: academicStartYear + 1, month: 2 }, // March
    { year: academicStartYear + 1, month: 3 }, // April
    { year: academicStartYear + 1, month: 4 }, // May
    { year: academicStartYear + 1, month: 5 } // June
  ]

  const months: MonthHoursCalculation[] = []
  let totalMinutes = 0
  let pastMinutes = 0
  let futureMinutes = 0
  let totalSchoolDays = 0
  let totalNonSchoolDays = 0
  let totalTeacherDays = 0

  // Semesters breakdown
  let sem1SchoolDays = 0
  let sem1NonSchoolDays = 0
  let sem1TeacherDays = 0
  let sem1TotalMinutes = 0
  let sem1FutureMinutes = 0

  let sem2SchoolDays = 0
  let sem2NonSchoolDays = 0
  let sem2TeacherDays = 0
  let sem2TotalMinutes = 0
  let sem2FutureMinutes = 0

  for (let i = 0; i < monthSequence.length; i++) {
    const { year, month } = monthSequence[i]
    const mCalc = calculateMonthHours(year, month, refDateStr, refTimeMinutes)
    months.push(mCalc)

    totalMinutes += mCalc.totalMinutes
    pastMinutes += mCalc.pastMinutes
    futureMinutes += mCalc.futureMinutes
    totalSchoolDays += mCalc.schoolDaysCount
    totalNonSchoolDays += mCalc.nonSchoolDaysCount
    totalTeacherDays += mCalc.teacherDaysCount

    // First 6 months (July - Dec) = Semester 1 context
    if (i < 6) {
      sem1SchoolDays += mCalc.schoolDaysCount
      sem1NonSchoolDays += mCalc.nonSchoolDaysCount
      sem1TeacherDays += mCalc.teacherDaysCount
      sem1TotalMinutes += mCalc.totalMinutes
      sem1FutureMinutes += mCalc.futureMinutes
    } else {
      // Last 6 months (Jan - June) = Semester 2 context
      sem2SchoolDays += mCalc.schoolDaysCount
      sem2NonSchoolDays += mCalc.nonSchoolDaysCount
      sem2TeacherDays += mCalc.teacherDaysCount
      sem2TotalMinutes += mCalc.totalMinutes
      sem2FutureMinutes += mCalc.futureMinutes
    }
  }

  const sem1: SemesterCalculation = {
    name: 'Semester 1',
    period: 'Aug 5, 2026 – Dec 18, 2026',
    schoolDays: sem1SchoolDays,
    nonSchoolDays: sem1NonSchoolDays,
    teacherDays: sem1TeacherDays,
    totalWorkingMinutes: sem1TotalMinutes,
    futureWorkingMinutes: sem1FutureMinutes
  }

  const sem2: SemesterCalculation = {
    name: 'Semester 2',
    period: 'Jan 5, 2027 – May 27, 2027',
    schoolDays: sem2SchoolDays,
    nonSchoolDays: sem2NonSchoolDays,
    teacherDays: sem2TeacherDays,
    totalWorkingMinutes: sem2TotalMinutes,
    futureWorkingMinutes: sem2FutureMinutes
  }

  return {
    academicYearLabel: `${academicStartYear}-${academicStartYear + 1}`,
    totalMinutes,
    pastMinutes,
    futureMinutes,
    totalSchoolDays,
    totalNonSchoolDays,
    totalTeacherDays,
    semesters: { sem1, sem2 },
    months
  }
}

/**
 * Calculates remaining calendar time (days, hours, minutes) and working hours from reference point to target deadline
 */
export function calculateDeadlineTimeRemaining(
  refDateStr: string,
  refTimeMinutes: number,
  deadlineDateStr: string,
  deadlineEndHour: number = 23,
  deadlineEndMinute: number = 59
): DeadlineCalculation | null {
  if (!deadlineDateStr || !/^\d{4}-\d{2}-\d{2}$/.test(deadlineDateStr)) {
    return null
  }

  const [refY, refM, refD] = refDateStr.split('-').map(Number)
  const refHours = Math.floor(refTimeMinutes / 60)
  const refMins = refTimeMinutes % 60
  const refDateTime = new Date(refY, refM - 1, refD, refHours, refMins, 0, 0)

  const [deadY, deadM, deadD] = deadlineDateStr.split('-').map(Number)
  const deadlineDateTime = new Date(deadY, deadM - 1, deadD, deadlineEndHour, deadlineEndMinute, 59, 999)

  const diffMs = deadlineDateTime.getTime() - refDateTime.getTime()
  const isPassed = diffMs < 0 || deadlineDateStr < refDateStr
  const isToday = deadlineDateStr === refDateStr

  let totalCalendarMinutes = 0
  let calendarDaysRemaining = 0
  let calendarHoursRemaining = 0
  let calendarMinutesRemaining = 0
  let calendarCountdownFormatted = ''

  if (isPassed) {
    calendarCountdownFormatted = 'Deadline Passed'
  } else {
    totalCalendarMinutes = Math.max(0, Math.floor(diffMs / (1000 * 60)))
    calendarDaysRemaining = Math.floor(totalCalendarMinutes / (24 * 60))
    calendarHoursRemaining = Math.floor((totalCalendarMinutes % (24 * 60)) / 60)
    calendarMinutesRemaining = totalCalendarMinutes % 60

    if (calendarDaysRemaining > 0) {
      calendarCountdownFormatted = `${calendarDaysRemaining} day${
        calendarDaysRemaining === 1 ? '' : 's'
      }, ${calendarHoursRemaining} hr${calendarHoursRemaining === 1 ? '' : 's'}`
    } else {
      calendarCountdownFormatted = `${calendarHoursRemaining} hr${
        calendarHoursRemaining === 1 ? '' : 's'
      }, ${calendarMinutesRemaining} min${calendarMinutesRemaining === 1 ? '' : 's'}`
    }
  }

  // Calculate working hours between refDate and deadlineDate
  let totalWorkingMinutesRemaining = 0
  let schoolDaysRemaining = 0
  let nonSchoolDaysRemaining = 0
  let teacherDaysRemaining = 0
  let holidayBreakDaysRemaining = 0
  let totalDaysInRange = 0

  if (!isPassed) {
    // Generate dates from refDateStr to deadlineDateStr
    const cur = new Date(refY, refM - 1, refD, 12, 0, 0)
    const end = new Date(deadY, deadM - 1, deadD, 12, 0, 0)

    while (cur.getTime() <= end.getTime()) {
      const y = cur.getFullYear()
      const m = String(cur.getMonth() + 1).padStart(2, '0')
      const d = String(cur.getDate()).padStart(2, '0')
      const dateStr = `${y}-${m}-${d}`

      const dayCalc = calculateDayHours(
        dateStr,
        refDateStr,
        dateStr === refDateStr ? refTimeMinutes : 0
      )

      if (dateStr === refDateStr) {
        totalWorkingMinutesRemaining += dayCalc.futureMinutes
      } else {
        totalWorkingMinutesRemaining += dayCalc.totalMinutes
      }

      if (dayCalc.dayInfo.isSchoolDay) {
        schoolDaysRemaining++
      } else {
        nonSchoolDaysRemaining++
      }

      if (dayCalc.dayInfo.isTeacherDay) {
        teacherDaysRemaining++
      }
      if (dayCalc.dayInfo.isBreak || dayCalc.dayInfo.isHoliday) {
        holidayBreakDaysRemaining++
      }
      totalDaysInRange++

      cur.setDate(cur.getDate() + 1)
    }
  }

  const workingHoursFormatted = formatHoursMinutes(totalWorkingMinutesRemaining)
  const workingDecimalHours = formatDecimalHours(totalWorkingMinutesRemaining)

  // Working days equivalent
  const schoolDayEquiv = (totalWorkingMinutesRemaining / 695).toFixed(1)
  const workingDaysEquivalentFormatted = `${schoolDayEquiv} school shifts equiv`

  // Matched milestone
  const matchedMilestone = ACADEMIC_EVENTS_2026_2027.find((e) => {
    if (e.endDate) {
      return deadlineDateStr >= e.date && deadlineDateStr <= e.endDate
    }
    return e.date === deadlineDateStr
  })

  // Calculate percentage elapsed
  const startDate = new Date(2026, 6, 1, 0, 0, 0).getTime()
  const deadlineTime = deadlineDateTime.getTime()
  const currentTime = Math.min(Math.max(refDateTime.getTime(), startDate), deadlineTime)
  const totalDuration = deadlineTime - startDate
  const elapsedDuration = currentTime - startDate
  const percentageElapsed = totalDuration > 0 ? Math.min(100, Math.max(0, Math.round((elapsedDuration / totalDuration) * 100))) : 0

  return {
    deadlineDateStr,
    refDateStr,
    refTimeMinutes,
    isPassed,
    isToday,
    calendarDaysRemaining,
    calendarHoursRemaining,
    calendarMinutesRemaining,
    totalCalendarMinutes,
    calendarCountdownFormatted,
    totalWorkingMinutesRemaining,
    workingHoursFormatted,
    workingDecimalHours,
    workingDaysEquivalentFormatted,
    schoolDaysRemaining,
    nonSchoolDaysRemaining,
    teacherDaysRemaining,
    holidayBreakDaysRemaining,
    totalDaysInRange,
    percentageElapsed,
    matchedMilestone
  }
}

