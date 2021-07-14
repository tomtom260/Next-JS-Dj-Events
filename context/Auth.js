import { useState, createContext, useEffect, useCallback } from 'react'
import { FRONTEND_URL } from '@/config/index'

export function AuthProvider({ children }) {
  const [user, setUser] = useState({})

  useEffect(() => {
    checkIfLoggedIn()
  }, [])

  const login = useCallback(async ({ email, password }, setError) => {
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
      setError(data.message)
    } else {
      setUser(data.user.user)
    }

    return res.ok
  }, [])

  const logout = async () => {
    const res = await fetch(`${FRONTEND_URL}/api/auth/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res.ok) {
      setUser({})
    }
    return res.ok
  }

  const checkIfLoggedIn = async () => {
    const res = await fetch(`${FRONTEND_URL}/api/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res.ok) {
      const user = await res.json()
      setUser(user)
    }
  }

  const register = async ({ email, password, username }, setError) => {
    const res = await fetch(`${FRONTEND_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.message)
    } else {
      setUser(data.newUser)
    }

    return res.ok
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
