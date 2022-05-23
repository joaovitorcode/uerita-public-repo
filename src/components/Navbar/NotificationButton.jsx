// Módulos
import {
  IconButton,
  Flex,
  useDisclosure,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react'
import { MdNotificationsNone } from 'react-icons/md'

// Diretórios
// import { CounterNotification } from './CounterNotification'
import { NotificationModal } from '../../views/NotificationModal'

export const NotificationButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('#1A202C', 'white')
  const sizeIcon = useBreakpointValue({ base: '1.25rem', md: '1.5rem' })
  const sizeButton = useBreakpointValue({ base: 'sm', md: 'md' })

  return (
    <Flex pos="relative">
      <IconButton
        aria-label="Botão de notificações"
        icon={<MdNotificationsNone size={sizeIcon} color={bg} />}
        variant="ghost"
        borderRadius="full"
        size={sizeButton}
        onClick={onOpen}
      />
      {/* <CounterNotification pos="absolute" top="-.375rem" left={left} /> */}
      <NotificationModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  )
}
