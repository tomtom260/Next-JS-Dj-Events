import { useState, createContext } from 'react'

export function AuthProvider({ children }) {
  const [user, setUser] = useState({})

  const login = user => {
    setUser(user)
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
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const AuthContext = createContext()
