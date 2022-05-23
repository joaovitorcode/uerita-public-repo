// Módulos
import {
  VStack,
  Text,
  Button,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react'

// Diretórios
import { Card } from '../Card'
import { VerificationModal } from '../../views/VerificationModal'

export const ImportVerification = ({ targetUserIdentity, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const secondaryColor = useColorModeValue('#4A5568', '#CBD5E0')

  return (
    <>
      <Card as={VStack} spacing={4} align="start" {...rest}>
        <Text fontWeight="semibold">Importar verificação</Text>
        <Text fontSize="sm" color={secondaryColor}>
          A única maneira de ter o seu perfil verificado no Uerita é através da
          importação de um selo de verificação de outra rede social, caso você
          possua um.
        </Text>
        <Button variant="default" onClick={onOpen}>
          Importar verificação
        </Button>
      </Card>
      <VerificationModal
        targetUserIdentity={targetUserIdentity}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}
