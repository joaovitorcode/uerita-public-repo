// Módulos
import { doc, updateDoc } from 'firebase/firestore'

// Diretórios
import { db } from '../../firebaseClient'

export const updateReportsById = async (id, analyze) => {
  const requestRef = doc(db, 'reports', id)

  await updateDoc(requestRef, {
    analyze: analyze,
  })
}
