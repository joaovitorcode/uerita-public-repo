import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebaseClient'

export const getChecks = async () => {
  const checksCol = []

  const checksRef = collection(db, 'checks')
  const requestQuery = query(checksRef, where('analyze', '==', 'waiting'))

  const checksSnap = await getDocs(requestQuery)
  checksSnap.forEach(check => {
    checksCol.push({
      id: check.id,
      ...check.data(),
      date: check.data().date.toDate(),
    })
  })

  return checksCol
}
