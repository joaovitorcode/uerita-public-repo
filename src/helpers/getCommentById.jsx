import { doc, getDoc } from 'firebase/firestore'
import _ from 'lodash'
import { db } from '../../firebaseClient'

export const getCommentById = async id => {
  const commentDoc = {}

  const commentRef = doc(db, 'comments', id)
  const commentSnap = await getDoc(commentRef)

  const userRef = doc(db, 'users', commentSnap.data()?.authorId)
  const userSnap = await getDoc(userRef)

  _.merge(commentDoc, {
    authorInfos: { ...userSnap.data() },
    id: commentSnap.id,
    ...commentSnap.data(),
    date: commentSnap.data().date.toDate(),
  })

  return commentDoc
}
