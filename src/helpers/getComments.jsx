import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebaseClient'

export const getComments = async () => {
  const commentsCol = []

  const commentsRef = collection(db, 'comments')
  const commentsSnap = await getDocs(commentsRef)

  commentsSnap.forEach(comment => {
    commentsCol.push({
      id: comment.id,
      ...comment.data(),
    })
  })

  return commentsCol
}
