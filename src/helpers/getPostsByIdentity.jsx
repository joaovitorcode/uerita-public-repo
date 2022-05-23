// Módulos
import { collection, query, where, getDocs } from 'firebase/firestore'

// Diretórios
import { db } from '../../firebaseClient'
import { getUserByIdentity } from '../helpers/getUserByIdentity'

export const getPostsByIdentity = async identity => {
  const user = await getUserByIdentity(identity)
  const postsCol = []
  const postsRef = collection(db, 'posts')
  const postsQuery = query(postsRef, where('authorId', '==', user.id))
  const postsSnap = await getDocs(postsQuery)

  postsSnap.forEach(post => {
    postsCol.push({
      authorInfos: { ...user },
      id: post.id,
      ...post.data(),
      date: post.data().date.toDate(),
    })
  })

  return postsCol
}
