import { createContext, useState } from 'react'
import route from 'next/router'

import firebase from '../../firebase/config'

// models
import { IUser } from '../../models/User'

type AuthContextProps = {
  user?: IUser
  loginGoogle?: () => Promise<void>
  children?: React.ReactNode
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

export function AuthProvider(props: AuthContextProps) {
  const [user, setUser] = useState<IUser>(null)

  async function loginGoogle() {
    const response = await firebase.auth().signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )

    if (response.user?.email) {
      const finalUser = await normalizeUser(response.user)
      setUser(finalUser)
      route.push('/')
    }
  }

  return (
    <AuthContext.Provider value={{ user, loginGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext