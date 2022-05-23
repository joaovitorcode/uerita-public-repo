// Módulos
import {
  Button,
  Box,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react'

// Diretórios
import { AuthModal } from '../../views/AuthModal'

export const AuthButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const sizeButton = useBreakpointValue({ base: 'sm', md: 'md' })

  return (
    <Box>
      <Button
        aria-label="Botão de entrar"
        size={sizeButton}
        variant="brand"
        onClick={onOpen}
      >
        Entrar
      </Button>
      <AuthModal isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}
