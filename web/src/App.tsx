import { useContext } from 'react'
import { Header } from './components/Header'
import { SummaryTable } from './components/SummaryTable'
import { AuthContext, AuthProvider } from './lib/auth'
import './lib/dayjs'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import './styles/global.css'

export function App() {
  const { user } = useContext(AuthContext)

  return (
    <AuthProvider>
      { user ? <Home /> : <SignIn /> }
    </AuthProvider>
  )
}
