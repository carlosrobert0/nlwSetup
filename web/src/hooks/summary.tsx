import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { api } from '../lib/axios'
import { useAuth } from './auth'

type Summary = {
  id: string
  date: string
  amount: number
  completed: number
}[]

type SummaryContextData = {
  summary: Summary | any
  getSummary(): Promise<any>
}

type SummaryProviderProps = {
  children: ReactNode
}

export const SummaryContext = createContext({} as SummaryContextData)

function SummaryProvider({ children }: SummaryProviderProps) {
  const [summary, setSummary] = useState<Summary>([])

  const { user } = useAuth()
  const { email } = user
  
  async function getSummary() {
    const response = await api.get(`summary/${email}`)
    setSummary(response.data)
  }

  useEffect(() => {
    getSummary()
    return () => {
      getSummary()
    }
  }, [])

  return (
    <SummaryContext.Provider
      value={{
        getSummary,
        summary
      }}
    >
      {children}
    </SummaryContext.Provider>
  )
}

function useSummary() {
  const context = useContext(SummaryContext)

  return context
}

export { SummaryProvider, useSummary }
