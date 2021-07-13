import { useState, createContext } from 'react'
import { FRONTEND_URL } from '../config'

export function AuthProvider({ children }) {
  const [user, setUser] = useState({})

  const login = async ({ email, password }, setError) => {
    const res = await fetch(`${FRONTEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      return setError(data.message)
    }
    setUser(data.user.user)
  }

  const logout = user => {
    setUser(null)
  }

  const checkIfLoggedIn = () => {
    console.log('checking...')
  }

  const register = user => {
    console.log('registering...', user)
  }

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        checkIfLoggedIn,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const AuthContext = createContext()
