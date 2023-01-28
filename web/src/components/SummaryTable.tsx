import { HabitDay } from "./HabitDay"
import { generateRangeDatesFromYearStart } from './../../utils/generate-range-between-dates'
import { useEffect } from "react"
import dayjs from "dayjs"
import { useSummary } from "../hooks/summary"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateRangeDatesFromYearStart()

const minimumSummaryDatesSize = 18 * 7
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

export function SummaryTable() {
  const { summary, getSummary } = useSummary()
  
  useEffect(() => {
    getSummary() 
    
    return () => {
      getSummary()
    }
  }, [])
  return (
    <div className="w-full h-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {
          weekDays.map((weekDay, i) => {
            return (
              <div
                key={`${weekDay}-${i}`}
                className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
              >
                {weekDay}
              </div>
            )
          })
        }
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {
          summary.length > 0 && summaryDates.map((date: any) => {
            const dayInSummary = summary.find((day: any) => {
              return dayjs(date).isSame(day.date, 'day')
            })

            return (
              <HabitDay
                key={date.toString()}
                date={date}
                amount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
              />
            )
          })}

        {
          amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => {
            return (
              <div
                key={i}
                className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
              />
            )
          })
        }
      </div>
    </div>
  )
}