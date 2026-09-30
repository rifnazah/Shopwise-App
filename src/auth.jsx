import { createContext, useContext, useState } from 'react'

// Front-end only auth. Users live in localStorage.
// Replace the functions below with real API calls when a backend exists.
const USERS_KEY = 'shopwise_users'
const SESSION_KEY = 'shopwise_session'

const AuthContext = createContext(null)

const readUsers = () => {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || [] } catch { return [] }
}
const readSession = () => {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)) } catch { return null }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readSession)

  const register = ({ name, email, password }) => {
    const users = readUsers()
    const key = email.trim().toLowerCase()
    if (users.some((u) => u.email === key)) {
      throw new Error('An account with this email already exists. Log in instead.')
    }
    users.push({ name: name.trim(), email: key, password })
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    const session = { name: name.trim(), email: key }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
  }

  const login = ({ email, password }) => {
    const key = email.trim().toLowerCase()
    const found = readUsers().find((u) => u.email === key && u.password === password)
    if (!found) throw new Error('Email or password is incorrect.')
    const session = { name: found.name, email: found.email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
