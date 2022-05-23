// Módulos
import { useRef, useState } from 'react'
import {
  VStack,
  Text,
  Button,
  useColorModeValue,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
} from '@chakra-ui/react'
import { getAuth } from 'firebase/auth'

// Diretórios
import { Card } from '../Card'
import { removeProfileById } from '../../helpers/removeProfileById'

export const DangerZone = ({ ...rest }) => {
  const secondaryColor = useColorModeValue('#4A5568', '#CBD5E0')
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const auth = getAuth()
  const [currentPassword, setCurrentPassword] = useState('')

  const handleBlock = async () => {
    if (currentPassword.length < 8 || currentPassword.length > 15) {
      return toast({
        description: 'A senha deve ter no mínimo 8 caracteres e no máximo 15.',
        status: 'error',
      })
    }

    onClose()
    await removeProfileById(auth.currentUser.uid, currentPassword)
    return toast({
      description: 'Usuário excluído com sucesso.',
      status: 'success',
    })
  }

  return (
    <Card as={VStack} spacing={4} align="start" {...rest}>
      <Text fontWeight="semibold">Zona de perigo</Text>
      <Text fontSize="sm" color={secondaryColor}>
        Essa ação excluirá o seu perfil permanentemente e, portanto, não poderá
        ser desfeita.
      </Text>
      <Button variant="destructive" onClick={onOpen}>
        Excluír perfil
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Excluír usuário
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text>Você tem certeza? Essa ação não poderá ser desfeita.</Text>
              <FormControl mt={4}>
                <FormLabel fontWeight="semibold">Senha atual</FormLabel>
                <InputGroup>
                  <Input
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    variant="outline"
                    type="password"
                    placeholder="********"
                  />
                </InputGroup>
              </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleBlock} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Card>
  )
}
