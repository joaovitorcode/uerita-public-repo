import { collection, getDocs, query, where } from 'firebase/firestore'
import _ from 'lodash'
import { db } from '../../firebaseClient'

export const getUserByIdentity = async id => {
  const userDoc = {}

  const userRef = collection(db, 'users')
  const userQuery = query(userRef, where('identity', '==', id))

  const userSnap = await getDocs(userQuery)
  userSnap.forEach(user => {
    _.merge(userDoc, { id: user.id, ...user.data() })
  })

  return userDoc
}
