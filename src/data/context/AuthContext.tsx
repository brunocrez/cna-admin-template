import { createContext, useEffect, useState } from 'react'
import route from 'next/router'
import Cookies from 'js-cookie'

import firebase from '../../firebase/config'

// models
import { IUser } from '../../models/User'

// utils
import { ADMIN_TEMPLATE_AUTH } from '../../utils'

type AuthContextProps = {
  user?: IUser
  loginGoogle?: () => Promise<void>
  children?: React.ReactNode
  logout?: () => Promise<void>
  isLoading?: boolean
  login?: (email: string, password: string) => Promise<void>
  register?: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function normalizeUser(firebaseUser: firebase.User): Promise<IUser> {
  const token = await firebaseUser.getIdToken()
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    name: firebaseUser.displayName,
    provider: firebaseUser.providerData[0].providerId,
    token,
    image_url: firebaseUser.photoURL
  }
}

function cookieManagement(isLogged: boolean) {
  if (isLogged) {
    Cookies.set(ADMIN_TEMPLATE_AUTH, isLogged, { expires: 1 })
  } else {
    Cookies.remove(ADMIN_TEMPLATE_AUTH)
  }
}

export function AuthProvider(props: AuthContextProps) {
  const [user, setUser] = useState<IUser>(null)
  const [isLoading, setIsLoading] = useState(true)

  async function settingSection(firebaseUser: firebase.User) {
    if (firebaseUser?.email) {
      const user = await normalizeUser(firebaseUser)
      setUser(user)
      cookieManagement(true)
      setIsLoading(false)
      return user.email
    } else {
      setUser(null)
      cookieManagement(false)
      setIsLoading(false)
      return false
    }
  }

  async function login(email: string, password: string) {
    try {
      setIsLoading(true)
      const response = await firebase.auth().signInWithEmailAndPassword(email, password)  
      await settingSection(response.user)
      route.push('/')
    } finally {
      setIsLoading(false)
    }
  }

  async function register(email: string, password: string) {
    try {
      setIsLoading(true)
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password)  
      await settingSection(response.user)
      route.push('/')
    } finally {
      setIsLoading(false)
    }
  }

  async function loginGoogle() {
    try {
      setIsLoading(true)
      const response = await firebase.auth().signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      )
  
      await settingSection(response.user)
      route.push('/')
    } finally {
      setIsLoading(false)
    }
  }

  async function logout() {
    try {
      setIsLoading(true)
      await firebase.auth().signOut()
      await settingSection(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (Cookies.get(ADMIN_TEMPLATE_AUTH)) {
      const cancelWatcher = firebase.auth().onIdTokenChanged(settingSection)
      return () => cancelWatcher()
    } else {
      setIsLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      loginGoogle,
      logout,
      isLoading,
      login,
      register
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext