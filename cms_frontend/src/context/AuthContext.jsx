/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const storedTokens = authService.getStoredTokens()
  const [accessToken, setAccessToken] = useState(storedTokens.access)
  const [refreshToken, setRefreshToken] = useState(storedTokens.refresh)

  const login = useCallback(async ({ username, password }) => {
    const tokens = await authService.login({ username, password })
    setAccessToken(tokens.access)
    setRefreshToken(tokens.refresh)
    return tokens
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setAccessToken(null)
    setRefreshToken(null)
  }, [])

  useEffect(() => {
    const handleForcedLogout = () => logout()
    window.addEventListener('auth:logout', handleForcedLogout)

    return () => {
      window.removeEventListener('auth:logout', handleForcedLogout)
    }
  }, [logout])

  const value = useMemo(
    () => ({
      accessToken,
      refreshToken,
      login,
      logout,
      isAuthenticated: Boolean(accessToken && refreshToken),
    }),
    [accessToken, refreshToken, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
