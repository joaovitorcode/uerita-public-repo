// Módulos
import { collection, addDoc } from 'firebase/firestore'

// Diretórios
import { db } from '../../firebaseClient'

export const setChecks = async (analyze, reference, targetUserIdentity) => {
  const checkRef = collection(db, 'checks')

  await addDoc(checkRef, {
    analyze: analyze,
    date: new Date(),
    reference,
    targetUserIdentity,
  })
}
