// Módulos
import { doc, deleteDoc } from 'firebase/firestore'
import {
  getAuth,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth'

// Diretórios
import { getPosts } from './getPosts'
import { getComments } from './getComments'
import { db } from '../../firebaseClient'

export const removeProfileById = async (id, currentPassword) => {
  const posts = await getPosts()
  const comments = await getComments()

  const commentIDs = getCommentIDs(comments, id)
  commentIDs.forEach(async commentID => {
    try {
      await deleteDoc(doc(db, 'comments', commentID))
    } catch (error) {
      console.log(error)
    }
  })

  const postIDs = getPostIDs(posts, id)
  postIDs.forEach(async postID => {
    try {
      await deleteDoc(doc(db, 'posts', postID))
    } catch (error) {
      console.log(error)
    }
  })

  try {
    await deleteDoc(doc(db, 'users', id))
  } catch (error) {
    console.log(error)
  }

  try {
    await newAuthenticate(currentPassword)
    await removeUser()
  } catch (error) {
    console.log(error)
  }
}

const getPostIDs = (posts, id) => {
  const postsDoc = []

  posts.forEach(post => {
    if (post.authorId === id) {
      postsDoc.push(post.id)
    }
  })

  return postsDoc
}

const getCommentIDs = (comments, id) => {
  const commentsDoc = []

  comments.forEach(comment => {
    if (comment.authorId === id) {
      commentsDoc.push(comment.id)
    }
  })

  return commentsDoc
}

const removeUser = async () => {
  const auth = getAuth()
  const user = auth.currentUser
  await deleteUser(user)
}

const newAuthenticate = async currentPassword => {
  const auth = getAuth()
  const user = auth.currentUser
  const cred = EmailAuthProvider.credential(user.email, currentPassword)
  await reauthenticateWithCredential(user, cred)
}
