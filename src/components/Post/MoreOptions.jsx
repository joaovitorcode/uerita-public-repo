// Módulos
import Router from 'next/router'
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import {
  MdMoreHoriz,
  MdOutlineModeEdit,
  MdDeleteOutline,
  MdOutlinedFlag,
} from 'react-icons/md'
import { doc, deleteDoc } from 'firebase/firestore'

// Diretórios
import { ReportModal } from '../../views/ReportModal'
import { db } from '../../../firebaseClient'

export const MoreOptions = ({ post, currentUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bgList = useColorModeValue('white', '#1A202C')
  const bgItem = useColorModeValue('#EDF2F7', '#2D3748')
  const toast = useToast()

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'posts', post.id))
      toast({
        description: 'Publicação excluída com sucesso',
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
    <>
      <Menu placement="bottom-end">
        <MenuButton
          aria-label="Botão de mais opções"
          as={IconButton}
          icon={<MdMoreHoriz size="1.25rem" />}
          variant="ghost"
          borderRadius="full"
          size="sm"
        />
        <MenuList
          p={2}
          bg={bgList}
          borderColor={bgItem}
          borderRadius="lg"
          shadow="md"
        >
          {post?.authorId === currentUser?.uid && (
            <>
              <MenuItem
                icon={<MdOutlineModeEdit size="1.25rem" />}
                _hover={{ bg: bgItem }}
                _focus={{ bg: bgItem }}
                borderRadius="base"
                onClick={() =>
                  Router.push(
                    `/${post?.authorInfos.identity}/post/${post.id}/edit`
                  )
                }
              >
                Editar
              </MenuItem>
              <MenuItem
                icon={<MdDeleteOutline size="1.5rem" />}
                _hover={{ bg: bgItem }}
                _focus={{ bg: bgItem }}
                borderRadius="base"
                onClick={handleDelete}
              >
                Excluir
              </MenuItem>
            </>
          )}
          {post?.authorId !== currentUser?.uid && (
            <>
              <MenuItem
                icon={<MdOutlinedFlag size="1.5rem" />}
                _hover={{ bg: bgItem }}
                _focus={{ bg: bgItem }}
                borderRadius="base"
                onClick={onOpen}
              >
                Denúnciar
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
      <ReportModal
        targetUserId={post.authorId}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}
