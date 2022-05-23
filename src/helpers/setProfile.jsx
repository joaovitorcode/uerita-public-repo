// Módulos
import { doc, updateDoc } from 'firebase/firestore'

// Diretórios
import { db } from '../../firebaseClient'

export const setProfileById = async (id, field, value) => {
  const userRef = doc(db, 'users', id)

  switch (field) {
    case 'name':
      await updateDoc(userRef, {
        name: value,
      })
      break
    case 'identity':
      await updateDoc(userRef, {
        identity: value,
      })
      break
    case 'bio':
      await updateDoc(userRef, {
        bio: value,
      })
      break
    case 'photoURL':
      await updateDoc(userRef, {
        photoURL: value,
      })
      break
    default:
      break
  }
}
