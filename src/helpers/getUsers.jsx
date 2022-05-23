import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebaseClient'

export const getUsers = async () => {
  const usersCol = []

  const usersRef = collection(db, 'users')
  const usersSnap = await getDocs(usersRef)

  usersSnap.forEach(user => {
    usersCol.push({
      id: user.id,
      ...user.data(),
    })
  })

  return usersCol
}
