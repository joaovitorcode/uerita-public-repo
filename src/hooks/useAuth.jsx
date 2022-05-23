import { createContext, useState, useEffect, useContext } from 'react'
import { auth, db } from '../../firebaseClient'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  applyActionCode,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signOut as LogOut,
  signInWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail as updateEmailFirebase,
  updatePassword as updatePasswordFirebase,
} from 'firebase/auth'
import _ from 'lodash'

const AuthContext = createContext({})
export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])

  // Todas as funções de autenticação aqui...

  const signUp = async (name, email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
    await sendEmailVerification(auth.currentUser)
    await setDoc(doc(db, 'users', auth.currentUser.uid), {
      bio: '',
      followers: [],
      following: [],
      identity: auth.currentUser.uid,
      importedVerificationURL: '',
      name: name,
      photoURL: '',
      status: '',
      verified: false,
    })
  }

  const verifyEmail = async oobCode => {
    await applyActionCode(auth, oobCode)
  }

  const forgotPassword = async email => {
    await sendPasswordResetEmail(auth, email)
  }

  const resetPassword = async (oobCode, newPassword) => {
    await confirmPasswordReset(auth, oobCode, newPassword)
  }

  const signOut = async () => {
    await LogOut(auth)
  }

  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const newAuthenticate = async currentPassword => {
    const user = auth.currentUser
    const cred = EmailAuthProvider.credential(user.email, currentPassword)
    await reauthenticateWithCredential(user, cred)
  }

  const updateEmail = async newEmail => {
    await updateEmailFirebase(auth.currentUser, newEmail)
    await sendEmailVerification(auth.currentUser)
  }

  const updatePassword = async newPassword => {
    await updatePasswordFirebase(auth.currentUser, newPassword)
  }

  const resendEmailVerification = async () => {
    await sendEmailVerification(auth.currentUser)
  }

  // Obter o acesso ao documento do usuário atual
  const [currentUserData, setCurrentUserData] = useState({})
  useEffect(() => {
    // Fix the React memory leak warning
    let cancel = false
    const getData = async () => {
      const userRef = doc(db, 'users', currentUser?.uid)
      const userSnap = await getDoc(userRef)
      if (cancel) return
      setCurrentUserData({ id: userSnap.id, ...userSnap.data() })
    }

    !_.isEmpty(currentUser) && getData()
    return () => {
      cancel = true
    }
  }, [currentUser])

  const value = {
    currentUser,
    signUp,
    verifyEmail,
    forgotPassword,
    resetPassword,
    signOut,
    signIn,
    currentUserData,
    newAuthenticate,
    updateEmail,
    updatePassword,
    resendEmailVerification,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
