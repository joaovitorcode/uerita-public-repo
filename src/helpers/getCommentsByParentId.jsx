import { db } from '../../firebaseClient'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { getUsers } from '../helpers/getUsers'
import _ from 'lodash'

export const getCommentsByParentId = async parentId => {
  const commentsDoc = []

  const commentsRef = collection(db, 'comments')
  const commentsQuery = query(commentsRef, where('parentId', '==', parentId))
  const commentsSnap = await getDocs(commentsQuery)

  commentsSnap.forEach(comment => {
    commentsDoc.push({
      id: comment.id,
      ...comment.data(),
      date: comment.data().date.toDate(),
    })
  })

  const users = await getUsers()
  commentsDoc.forEach(comment => {
    users.forEach(user => {
      if (comment.authorId === user.id) {
        _.merge(comment, { authorInfos: { ...user } })
      }
    })
  })

  return commentsDoc
}
