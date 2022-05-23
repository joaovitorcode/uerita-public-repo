// Módulos
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore'

// Diretórios
import { db } from '../../firebaseClient'

export const getFollowingPosts = followingIds => {
  const postsCol = []

  const postsRef = collection(db, 'posts')
  followingIds.forEach(async id => {
    const postsQuery = query(postsRef, where('authorId', '==', id))

    const postsSnap = await getDocs(postsQuery)
    postsSnap.forEach(async post => {
      const userRef = doc(db, 'users', post.data().authorId)
      const userSnap = await getDoc(userRef)

      postsCol.push({
        authorInfos: { ...userSnap.data() },
        id: post.id,
        ...post.data(),
        date: post.data().date.toDate(),
      })
    })
  })

  return postsCol
}
