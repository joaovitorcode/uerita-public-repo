// Módulos
import { useState } from 'react'
import { Button, useToast } from '@chakra-ui/react'
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

// Diretórios
import { db } from '../../../firebaseClient'
import { useAuth } from '../../hooks/useAuth'

export const FollowButton = ({ user, ...rest }) => {
  const toast = useToast()
  const { currentUser, currentUserData } = useAuth()
  const [isActive, setIsActive] = useState(
    user.followers.includes(currentUser?.uid)
  )

  const handleFollow = async () => {
    // Validação de usuário
    if (!currentUser)
      return toast({
        description:
          'É necessário entrar com a sua conta para realizar esta ação.',
        status: 'info',
      })
    // if (!currentUser?.emailVerified)
    //   return toast({
    //     description:
    //       'É necessário verificar o seu e-mail para realizar esta ação.',
    //     status: 'info',
    //   })

    setIsActive(value => !value)

    // Atualiza os dados do usuário acessado
    const userRef = doc(db, 'users', user.id)
    await updateDoc(userRef, {
      followers: user.followers.includes(currentUser?.uid)
        ? arrayRemove(currentUser?.uid)
        : arrayUnion(currentUser?.uid),
    })

    // Atualiza os dados do usuário atual
    const currentUserRef = doc(db, 'users', currentUser?.uid)
    await updateDoc(currentUserRef, {
      following: currentUserData.following.includes(user.id)
        ? arrayRemove(user.id)
        : arrayUnion(user.id),
    })
  }

  return (
    <>
      <Button
        size="sm"
        variant={isActive ? 'default' : 'brand'}
        onClick={handleFollow}
        {...rest}
      >
        {isActive ? 'Seguindo' : 'Seguir'}
      </Button>
    </>
  )
}
