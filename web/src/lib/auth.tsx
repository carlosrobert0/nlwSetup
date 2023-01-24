import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { auth } from '../lib/firebase'

type User = {
  email: string
  permissions?: string[]
  roles?: string[]
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  user: any
  signInWithGoogle(): Promise<void>
  signOutApplication(): Promise<void>
  isAuthenticated: boolean
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any>({})
  const isAuthenticated = !!user
  
  const provider = new GoogleAuthProvider()

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider)

      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken

      setUser(result.user)
    } catch (error) {
      console.log(error)
    }
  }

  const signOutApplication = async () => {
    await signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signInWithGoogle,
        isAuthenticated,
        user,
        signOutApplication
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
