import { FormEvent } from 'react'

import { SignInSocialButton } from '../components/SignInSocialButton'
import { useAuth } from '../hooks/auth'
import logoImage from './../assets/logo.svg'
import logoSummaryHabits from './../assets/habits.png'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/axios'
export function SignIn() {
  const { signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  async function handleSignInWithGoogle(event: FormEvent) {
    event.preventDefault()

    try {
      const {
        uid,
        displayName,
        email,
        photoURL
      } = await signInWithGoogle()

      try {
        await api.post('/user', {
          uid,
          displayName,
          email,
          photoURL
        })

        navigate('/home')
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
      alert('Não foi possivel conectar a conta Google')
    }
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
        <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
          <img src={logoImage} alt="Habits" />
        </div>

        <div className="flex items-start justify-around">
          <img src={logoSummaryHabits} alt="Summary habits" className='w-96 h-80 object-contain' />

          <div className='-ml-16 mt-6'>
            <h2 className="text-white font-semibold text-xl text-center mb-10">Gerencie seus hábitos aqui</h2>
            <SignInSocialButton
              title="Entrar com Google"
              svg="/google.svg"
              onClick={handleSignInWithGoogle}
            />
          </div>
        </div>
      </div>
    </div>
  )
}