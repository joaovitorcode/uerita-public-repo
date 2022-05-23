// Módulos
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
  MdOutlinedFlag,
  MdBlock,
} from 'react-icons/md'

// Diretórios
import { ReportModal } from '../../views/ReportModal'

export const MoreOptions = ({ user, currentUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bgList = useColorModeValue('white', '#1A202C')
  const bgItem = useColorModeValue('#EDF2F7', '#2D3748')
  const toast = useToast()

  const handleBlock = () => {
    return toast({
      description: 'Essa funcionalidade será implementada em breve.',
      status: 'info',
    })
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
          {user?.id === currentUser?.uid && (
            <>
              <MenuItem
                icon={<MdOutlineModeEdit size="1.5rem" />}
                _hover={{ bg: bgItem }}
                _focus={{ bg: bgItem }}
                borderRadius="base"
                onClick={handleBlock}
              >
                Editar
              </MenuItem>
            </>
          )}
          {user?.id !== currentUser?.uid && (
            <>
              <MenuItem
                icon={<MdBlock size="1.5rem" />}
                _hover={{ bg: bgItem }}
                _focus={{ bg: bgItem }}
                borderRadius="base"
                onClick={handleBlock}
              >
                Bloquear
              </MenuItem>
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
      <ReportModal targetUserId={user.id} isOpen={isOpen} onClose={onClose} />
    </>
  )
}
