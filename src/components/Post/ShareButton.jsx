// Módulos
import {
  Flex,
  IconButton,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { HiOutlineShare } from 'react-icons/hi'
import { doc, updateDoc, increment } from 'firebase/firestore'
import { CopyToClipboard } from 'react-copy-to-clipboard'

// Diretórios
import { db } from '../../../firebaseClient'

export const ShareButton = ({ post, ...rest }) => {
  const secondaryColor = useColorModeValue('#4A5568', '#CBD5E0')
  const toast = useToast()

  const incrementReadCounter = async () => {
    try {
      await updateDoc(doc(db, 'posts', post.id), {
        shares: increment(1),
      })
      toast({
        description: 'Link copiado com sucesso.',
        status: 'success',
      })
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
      })
    }
  }

  return (
    <Flex align="center" {...rest}>
      <CopyToClipboard
        text={`uerita.vercel.app/${post.authorInfos.identity}/post/${post.id}`}
      >
        <IconButton
          aria-label="Botão de compartilhamento"
          icon={<HiOutlineShare size="1.125rem" color={secondaryColor} />}
          size="sm"
          borderRadius="full"
          variant="ghost"
          onClick={incrementReadCounter}
          mr={2}
        />
      </CopyToClipboard>
      <Text fontSize="sm" fontWeight="semibold" color={secondaryColor}>
        {post.shares}
      </Text>
    </Flex>
  )
}
