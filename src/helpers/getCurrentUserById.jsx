// Módulos
import { doc, getDoc } from 'firebase/firestore'
import _ from 'lodash'

// Diretórios
import { db } from '../../firebaseClient'

export const getCurrentUserById = async id => {
  const currentUser = {}

  const userRef = doc(db, 'users', id)
  const userSnap = await getDoc(userRef)
  _.merge(currentUser, {
    id: userSnap.id,
    ...userSnap.data(),
  })

  return currentUser
}
