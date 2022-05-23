import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebaseClient'

export const getUserById = async id => {
  const userRef = doc(db, 'users', id)
  const userSnap = await getDoc(userRef)

  return userSnap.data()
}
