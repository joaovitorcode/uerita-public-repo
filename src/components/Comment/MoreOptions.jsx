// Módulos
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react'
import { MdMoreHoriz, MdOutlinedFlag } from 'react-icons/md'

// Diretórios
import { ReportModal } from '../../views/ReportModal'

export const MoreOptions = ({ comment, currentUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bgList = useColorModeValue('white', '#1A202C')
  const bgItem = useColorModeValue('#EDF2F7', '#2D3748')

  if (comment?.authorId === currentUser?.uid) return null
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
          {comment?.authorId !== currentUser?.uid && (
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
        targetUserId={comment.authorId}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}
