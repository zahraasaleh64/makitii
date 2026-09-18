import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import api from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('makitii_user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(true)

  const persistUser = useCallback((nextUser) => {
    setUser(nextUser)
    if (nextUser) {
      localStorage.setItem('makitii_user', JSON.stringify(nextUser))
    } else {
      localStorage.removeItem('makitii_user')
    }
  }, [])

  const refreshMe = useCallback(async () => {
    const token = localStorage.getItem('makitii_token')
    if (!token) {
      setLoading(false)
      return
    }
    try {
      const { data } = await api.get('/me')
      persistUser(data.data)
    } catch {
      persistUser(null)
      localStorage.removeItem('makitii_token')
    } finally {
      setLoading(false)
    }
  }, [persistUser])

  useEffect(() => {
    refreshMe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = async (email, password) => {
    const { data } = await api.post('/login', { email, password })
    localStorage.setItem('makitii_token', data.token)
    persistUser(data.user)
    return data.user
  }

  const register = async (payload) => {
    const { data } = await api.post('/register', payload)
    localStorage.setItem('makitii_token', data.token)
    persistUser(data.user)
    return data.user
  }

  const logout = async () => {
    try {
      await api.post('/logout')
    } catch {
      // pas grave si la requête échoue, on nettoie quand même côté client
    }
    localStorage.removeItem('makitii_token')
    persistUser(null)
  }

  const updateStoredUser = (nextUser) => {
    persistUser(nextUser)
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, refreshMe, updateStoredUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit être utilisé à l\'intérieur de AuthProvider')
  return ctx
}
