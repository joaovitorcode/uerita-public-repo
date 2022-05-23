// Módulos
import { useState } from 'react'
import {
  Box,
  Flex,
  Button,
  Spacer,
  useColorModeValue,
  chakra,
  useToast,
} from '@chakra-ui/react'
import { MdMode } from 'react-icons/md'
import { addDoc, collection } from 'firebase/firestore'
import { useRouter } from 'next/router'

// Diretórios
import { AutoResizeTextarea } from '../AutoResizeTextarea'
import { Counter } from '../Counter'
import { db } from '../../../firebaseClient'
import { useAuth } from '../../hooks/useAuth'

export const WriteComment = ({ parentId, postId, ...rest }) => {
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('blackAlpha.200', 'blackAlpha.600')
  const [body, setBody] = useState('')
  const [isActive, setIsActive] = useState(false)
  const { currentUser } = useAuth()
  const toast = useToast()
  const router = useRouter()

  const onSubmit = async () => {
    try {
      await addDoc(collection(db, 'comments'), {
        authorId: currentUser.uid,
        body,
        date: new Date(),
        downvotes: [],
        parentId,
        postId,
        upvotes: [],
        visibility: true,
      })
      toast({
        description: 'Comentário publicado com sucesso.',
        status: 'success',
      })
      router.reload(window.location.pathname)
    } catch (error) {
      toast({
        description: error.message,
        status: 'success',
      })
    }
  }

  return (
    <chakra.form w="full" onSubmit={onSubmit} {...rest}>
      <Box
        w="full"
        p={4}
        bg={bg}
        borderRadius="base"
        border="1px solid"
        borderColor={borderColor}
      >
        <AutoResizeTextarea
          value={body}
          onChange={e => setBody(e.target.value)}
          onFocus={() => setIsActive(true)}
          variant={isActive ? 'flushed' : 'unstyled'}
          pt={0}
          pb={2}
          p={!isActive && 0}
          placeholder="Escreva um comentário..."
          fontSize={{ base: 'sm', md: 'md' }}
        />
        {isActive && (
          <Flex w="full" mt={2}>
            <Counter icon={MdMode} visuallyHidden="Mínimo de caracteres" mr={4}>
              mín. {body.length}/1
            </Counter>
            <Counter icon={MdMode} visuallyHidden="Máximo de caracteres">
              máx. {body.length}/1.000
            </Counter>
            <Spacer />
            <Button
              isDisabled={body.length < 1 || (body.length > 1000 && true)}
              type="submit"
              size="sm"
              variant="brand"
            >
              Comentar
            </Button>
          </Flex>
        )}
      </Box>
    </chakra.form>
  )
}
