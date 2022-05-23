// Módulos
import { collection, addDoc } from 'firebase/firestore'

// Diretórios
import { db } from '../../firebaseClient'

export const setReports = async (
  analyze,
  note,
  reference,
  targetUserId,
  rulesBroken
) => {
  const reportRef = collection(db, 'reports')

  await addDoc(reportRef, {
    analyze: analyze,
    date: new Date(),
    note,
    reference,
    rulesBroken,
    targetUserId,
  })
}
