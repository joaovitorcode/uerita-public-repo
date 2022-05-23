/* eslint-disable react/no-children-prop */
// Módulos
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
  VStack,
  Button,
  Flex,
  Text,
  useToast,
} from '@chakra-ui/react'

// Diretórios
import { Card } from '../Card'
import { updateChecksById } from '../../helpers/updateChecksById'

export const VerificationModeration = ({ check, ...rest }) => {
  const toast = useToast()

  const handleAccepted = async () => {
    try {
      await updateChecksById(check.id, 'accepted')
      toast({
        description: 'A verificação foi importada com sucesso.',
        status: 'success',
      })
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
      })
    }
  }

  const handleRejected = async () => {
    try {
      await updateChecksById(check.id, 'rejected')
      toast({
        description: 'A verificação foi rejeitada com sucesso.',
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
    <Card as={VStack} spacing={4} align="start" {...rest}>
      <FormControl>
        <FormLabel fontWeight="semibold">Requisitos exigidos</FormLabel>
        <VStack spacing={4} align="start">
          <Text>
            ✅ O nome de perfil em ambos os perfis devem ser os mesmos.
          </Text>
          <Text>
            ✅ A foto de perfil em ambos os perfis devem ser as mesmas.
          </Text>
          <Text>
            ✅ No perfil do [rede social] deve haver uma menção ao perfil no
            Uerita.
          </Text>
        </VStack>
      </FormControl>
      <FormControl>
        <FormLabel fontWeight="semibold">Perfil no Uerita</FormLabel>
        <InputGroup>
          <InputLeftAddon children="https://" />
          <Input
            variant="outline"
            value={`uerita.com/${check.targetUserIdentity}`}
            readOnly
          />
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel fontWeight="semibold">Perfil em outra rede</FormLabel>
        <InputGroup>
          <InputLeftAddon children="https://" />
          <Input variant="outline" value={check.reference} readOnly />
        </InputGroup>
      </FormControl>
      <Flex w="full">
        <Button onClick={handleAccepted} variant="brand" mr={2}>
          Verificar
        </Button>
        <Button onClick={handleRejected} variant="ghost">
          Rejeitar
        </Button>
      </Flex>
    </Card>
  )
}
