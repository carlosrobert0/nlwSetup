import './lib/dayjs'
import './styles/global.css'

import { useAuth } from './hooks/auth'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { SummaryProvider } from './hooks/summary'

export function App() {
  const { user } = useAuth()

  return (
    user?.accessToken ? 
      <SummaryProvider>
        <Home />
      </SummaryProvider> 
      : 
      <SignIn />
  )
}
