import { Plus, SignOut, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog';
import colors from 'tailwindcss/colors'

import logoImage from './../assets/logo.svg';
import { NewHabitForm } from './NewHabitForm';
import { useState } from 'react';
import { useAuth } from '../hooks/auth';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const [open, setOpen] = useState(false)
  const { signOutApplication } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    try {
      await signOutApplication()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full max-w-3xl mx-auto flex items-center justify-between'>
      <img src={logoImage} alt="Habits" />

      <div className="flex justify-between relative">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger
            type="button"
            className='border border-green-200 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-green-100 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-background'
          >
            <Plus size={20} className={colors.green[200]} />
            Novo hábito
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />

            <Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Dialog.Close className="absolute right-6 top-6 text-zinc-400 rounded-lg hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900">
                <X size={24} aria-label="Fechar" />
              </Dialog.Close>

              <Dialog.Title className="text-3xl leading-tight font-extrabold">
                Criar hábito
              </Dialog.Title>

              <NewHabitForm />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <SignOut 
          size={24} 
          color={colors.green[800]} 
          onClick={handleSignOut} 
          className="absolute -right-[93px] cursor-pointer" 
        />
      </div>
    </div>
  )
}