// Módulos
import Router from 'next/router'
import { useState, useEffect } from 'react'
import {
  HStack,
  IconButton,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import {
  FaRegHandPointUp,
  FaHandPointUp,
  FaRegHandPointDown,
  FaHandPointDown,
} from 'react-icons/fa'
import {
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  onSnapshot,
} from 'firebase/firestore'

// Diretórios
import { useAuth } from '../../hooks/useAuth'
import { db } from '../../../firebaseClient'

export const VoteButtons = ({ comment, ...rest }) => {
  const secondaryColor = useColorModeValue('#4A5568', '#CBD5E0')
  const green = useColorModeValue('#00A884', '#37F6B6')
  const red = useColorModeValue('#E53E3E', '#FC8181')
  const toast = useToast()

  const [positive, setPositive] = useState(false)
  const [negative, setNegative] = useState(false)
  const [votes, setVotes] = useState(0)
  const { currentUser } = useAuth()

  useEffect(() => {
    const commentRef = doc(db, 'comments', comment.id)
    const unsub = onSnapshot(commentRef, commentSnap => {
      try {
        setPositive(commentSnap.data().upvotes?.includes(currentUser?.uid))
        setNegative(commentSnap.data().downvotes?.includes(currentUser?.uid))
        setVotes(
          commentSnap.data().upvotes?.length -
            commentSnap.data().downvotes.length
        )
      } catch {
        Router.reload(window.location.pathname)
      }
    })
    return unsub
  }, [comment, currentUser])

  const handlePositive = async () => {
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

    const commentRef = doc(db, 'comments', comment.id)
    await updateDoc(commentRef, {
      upvotes: comment.upvotes?.includes(currentUser?.uid)
        ? arrayRemove(currentUser.uid)
        : arrayUnion(currentUser.uid),
    })

    if (negative) {
      await updateDoc(commentRef, {
        downvotes: arrayRemove(currentUser.uid),
      })
    }
  }

  const handleNegative = async () => {
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

    const commentRef = doc(db, 'comments', comment.id)
    await updateDoc(commentRef, {
      downvotes: comment.downvotes?.includes(currentUser?.uid)
        ? arrayRemove(currentUser.uid)
        : arrayUnion(currentUser.uid),
    })

    if (positive) {
      await updateDoc(commentRef, {
        upvotes: arrayRemove(currentUser.uid),
      })
    }
  }

  return (
    <HStack spacing={2} p={0} {...rest}>
      <IconButton
        aria-label="Botão de voto positivo"
        icon={
          positive ? (
            <FaHandPointUp size="1.125rem" color={green} />
          ) : (
            <FaRegHandPointUp size="1.125rem" color={secondaryColor} />
          )
        }
        size="sm"
        borderRadius="full"
        variant="ghost"
        onClick={handlePositive}
      />
      <Text fontSize="sm" fontWeight="semibold" color={secondaryColor}>
        {votes}
      </Text>
      <IconButton
        aria-label="Botão de voto negativo"
        icon={
          negative ? (
            <FaHandPointDown size="1.125rem" color={red} />
          ) : (
            <FaRegHandPointDown size="1.125rem" color={secondaryColor} />
          )
        }
        size="sm"
        borderRadius="full"
        variant="ghost"
        onClick={handleNegative}
      />
    </HStack>
  )
}
