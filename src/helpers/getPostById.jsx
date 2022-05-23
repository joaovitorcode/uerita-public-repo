import { doc, getDoc } from 'firebase/firestore'
import _ from 'lodash'
import { db } from '../../firebaseClient'

export const getPostById = async id => {
  const postDoc = {}

  const postRef = doc(db, 'posts', id)
  const postSnap = await getDoc(postRef)

  const userRef = doc(db, 'users', postSnap.data().authorId)
  const userSnap = await getDoc(userRef)

  _.merge(postDoc, {
    authorInfos: { ...userSnap.data() },
    id: postSnap.id,
    ...postSnap.data(),
    date: postSnap.data().date.toDate(),
  })

  return postDoc
}
