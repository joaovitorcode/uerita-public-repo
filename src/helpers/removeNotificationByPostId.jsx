// Módulos
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'

// Diretórios
import { db } from '../../firebaseClient'

export const removeNotificationByPostId = async (postId, currentUserId) => {
  const postRef = doc(db, 'posts', postId)

  await updateDoc(postRef, {
    notificationSeen: arrayUnion(currentUserId),
  })
}
