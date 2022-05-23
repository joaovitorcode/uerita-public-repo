// Módulos
import { doc, updateDoc } from 'firebase/firestore'

// Diretórios
import { db } from '../../firebaseClient'

export const updateChecksById = async (id, analyze) => {
  const requestRef = doc(db, 'checks', id)

  await updateDoc(requestRef, {
    analyze: analyze,
  })
}
