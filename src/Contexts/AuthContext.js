import React, { useContext, useState, useEffect, createContext } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import {stateContext} from './stateContext'
import { auth } from './firebase'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({children}) {

  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  const userContext = useContext(stateContext)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
       
      setCurrentUser(user)
      userContext.setCurrentUser(user.email)
      setLoading(false)
    })
    return unsubscribe
  },[])

  const logOutUser = () => {
    setCurrentUser()
  }

  const value = {
    currentUser,
    signup,
    login,
    logOutUser
  }

  return (
    <AuthContext.Provider value={value}>
    {children}
    </AuthContext.Provider>
  )
}