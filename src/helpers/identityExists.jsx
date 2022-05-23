import { getUsers } from './getUsers'

export const identityExists = async identity => {
  const users = await getUsers()
  let exists = false

  users.forEach(user => {
    if (user.identity === identity) {
      exists = true
    }
  })

  return exists
}
