import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebaseClient'

export const getPosts = async () => {
  const postsCol = []

  const postsRef = collection(db, 'posts')
  const postsSnap = await getDocs(postsRef)

  const usersRef = collection(db, 'users')
  const usersSnap = await getDocs(usersRef)

  postsSnap.forEach(post => {
    usersSnap.forEach(user => {
      if (post.data().authorId === user.id) {
        postsCol.push({
          authorInfos: { ...user.data() },
          id: post.id,
          ...post.data(),
        })
      }
    })
  })

  return postsCol
}
