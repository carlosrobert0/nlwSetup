import dayjs from 'dayjs'

export function generateRangeDatesFromYearStart() {
  const firstDayOfTheYear = dayjs().startOf('year')
  const today = new Date()

  let dateRange: any = []
  let compareDate = firstDayOfTheYear

  while (compareDate.isBefore(today)) {
    dateRange.push(compareDate.toDate())
    compareDate = compareDate.add(1, 'day')
  }

  return dateRange
}