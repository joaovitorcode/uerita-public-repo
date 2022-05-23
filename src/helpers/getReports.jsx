import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebaseClient'

export const getReports = async () => {
  const reportsCol = []

  const reportsRef = collection(db, 'reports')
  const requestQuery = query(reportsRef, where('analyze', '==', 'waiting'))

  const reportsSnap = await getDocs(requestQuery)
  reportsSnap.forEach(req => {
    reportsCol.push({
      id: req.id,
      ...req.data(),
      date: req.data().date.toDate(),
    })
  })

  return reportsCol
}
