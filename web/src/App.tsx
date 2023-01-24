import './lib/dayjs'
import './styles/global.css'

import { useAuth } from './hooks/auth'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'

export function App() {
  const { user } = useAuth()

  return (
    user?.accessToken ? <Home /> : <SignIn />
  )
}
