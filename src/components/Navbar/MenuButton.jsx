// Módulos
import {
  IconButton,
  Box,
  useDisclosure,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react'
import { MdMenu } from 'react-icons/md'

// Diretórios
import { MenuDrawer } from '../../views/MenuDrawer'

export const MenuButton = ({ ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('#1A202C', 'white')
  const sizeIcon = useBreakpointValue({ base: '1.25rem', md: '1.5rem' })
  const sizeButton = useBreakpointValue({ base: 'sm', md: 'md' })

  return (
    <Box {...rest}>
      <IconButton
        aria-label="Botão de menu"
        icon={<MdMenu size={sizeIcon} color={bg} />}
        variant="ghost"
        borderRadius="full"
        size={sizeButton}
        onClick={onOpen}
      />
      <MenuDrawer isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}
