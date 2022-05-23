// Módulos
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

// Diretórios
import { db } from '../../firebaseClient'

export const getPostsTrending = async () => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  const postsCol = []

  const postsRef = collection(db, 'posts')
  const postsQuery = query(postsRef, orderBy('date', 'desc'))

  const postsSnap = await getDocs(postsQuery)
  postsSnap.forEach(post => {
    postsCol.push({
      id: post.id,
      ...post.data(),
      date: post.data().date.toDate(),
    })
  })

  return postsCol
}
