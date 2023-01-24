import { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx'
import dayjs from 'dayjs';

import { HabitsList } from './HabitsList';
import { ProgressBar } from './ProgressBar';
interface HabitDayProps {
  date: Date
  amount?: number
  defaultCompleted?: number
}

export function HabitDay({ amount = 0, defaultCompleted = 0, date }: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted)

  const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0

  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')

  const today = dayjs().startOf('day').toDate()
  const isCurrentDay = dayjs(date).isSame(today)

  function handleCompletedChanged(completed: number) {
    setCompleted(completed)
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx('w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-background', {
          ['bg-zinc-900 border-zinc-800']: completedPercentage === 0,
          ['bg-green-900 border-green-800']: completedPercentage > 0 && completedPercentage < 20,
          ['bg-green-800 border-green-600']: completedPercentage >= 20 && completedPercentage < 40,
          ['bg-green-600 border-green-400']: completedPercentage >= 40 && completedPercentage < 60,
          ['bg-green-400 border-green-200']: completedPercentage >= 60 && completedPercentage < 80,
          ['bg-green-200 border-green-100']: completedPercentage >= 80,
          ['border-white border-4']: isCurrentDay
        })}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="'font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">{dayAndMonth}</span>

          <ProgressBar progress={completedPercentage} />

          <HabitsList date={date} onCompletedChanged={handleCompletedChanged} />

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}