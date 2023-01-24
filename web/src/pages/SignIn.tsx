import { FormEvent, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { SignInSocialButton } from '../components/SignInSocialButton'
import { AuthContext } from '../lib/auth'
import logoImage from './../assets/logo.svg'
import logoSummaryHabits from './../assets/habits.png'
export function SignIn() {
  const { signInWithGoogle } = useContext(AuthContext)
  const navigate = useNavigate()

  async function handleSignInWithGoogle(event: FormEvent) {
    event.preventDefault()

    try {
      await signInWithGoogle()
      navigate('/home')
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
            <h2 className="text-white font-semibold text-xl text-center mb-14">Gerencie seus hábitos aqui</h2>
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
