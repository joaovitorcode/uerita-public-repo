// Módulos
import { collection, query, where, getDocs } from 'firebase/firestore'

// Diretórios
import { db } from '../../firebaseClient'
import { getUserByIdentity } from '../helpers/getUserByIdentity'

export const getCommentsByidentity = async identity => {
  const user = await getUserByIdentity(identity)
  const commentsCol = []
  const commentsRef = collection(db, 'comments')
  const commentsQuery = query(commentsRef, where('authorId', '==', user.id))
  const commentsSnap = await getDocs(commentsQuery)

  commentsSnap.forEach(comment => {
    commentsCol.push({
      authorInfos: { ...user },
      id: comment.id,
      ...comment.data(),
      date: comment.data().date.toDate(),
    })
  })

  return commentsCol
}
