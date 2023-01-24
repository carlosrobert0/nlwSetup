import { Routes, Route } from 'react-router-dom'

import { SignIn } from './pages/SignIn'
import { Home } from './pages/Home'

export function Router() {
  return (
    <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
    </Routes>
  )
}