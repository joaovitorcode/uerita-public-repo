/* eslint-disable react/no-children-prop */
// Módulos
import { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
  VStack,
  Button,
  Text,
  useColorModeValue,
  useBreakpointValue,
  chakra,
  useToast,
} from '@chakra-ui/react'
import { setChecks } from '../../helpers/setChecks'

export const VerificationModal = ({ targetUserIdentity, isOpen, onClose }) => {
  const bg = useColorModeValue('white', 'gray.800')
  const modalFull = useBreakpointValue({ base: 'full', md: 'xl' })
  const [reference, setReference] = useState('')
  const toast = useToast()

  const onSubmit = async e => {
    e.preventDefault()

    if (!reference)
      return toast({
        description: 'Insira um link para realizar a importação.',
        status: 'error',
      })

    if (reference.length > 50)
      return toast({
        description: 'O link pdeve ter no máximo 50 caracteres.',
        status: 'error',
      })

    try {
      await setChecks('waiting', reference, targetUserIdentity)
      toast({
        description: 'Pedido de importação realizado com sucesso.',
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
    <Modal
      scrollBehavior="inside"
      size={modalFull}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <chakra.form onSubmit={onSubmit}>
        <ModalContent bg={bg} p={4} borderRadius={{ base: 'none', md: 'lg' }}>
          <ModalHeader pos="relative" px={4}>
            Importar verificação
            <ModalCloseButton
              borderRadius="full"
              pos="absolute"
              top={4}
              right={4}
            />
          </ModalHeader>
          <ModalBody pt={0} pb={4} px={4}>
            <VStack spacing={4} align="start">
              <Text>
                ✅ Insira o link de uma publicação feita por você em outra rede
                social.
              </Text>
              <Text>
                ✅ Nessa publicação deve haver uma menção ao seu perfil no
                Uerita.
              </Text>
              <Text>
                ✅ O seu nome de perfil nessa rede social deve ser o mesmo do
                seu perfil no Uerita.
              </Text>
              <Text>
                ✅ A sua foto de perfil nessa rede social deve ser a mesma do
                seu perfil no Uerita.
              </Text>
              <Text fontWeight="semibold">Redes sociais aceitas</Text>
              <Text>
                Facebook, Instagram, Youtube, TikTok, Telegram e Twitter.
              </Text>
              <FormControl>
                <FormLabel fontWeight="semibold">Link da publicação</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="https://" />
                  <Input
                    variant="outline"
                    placeholder="www.instagram.com/..."
                    value={reference}
                    onChange={e => setReference(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <Text fontWeight="semibold">Prazo de verificação</Text>
              <Text>
                O prazo de verificação é de até 3 dias (úteis) contados a partir
                da data da solicitação de importação.
              </Text>
              <Button type="submit" variant="brand">
                Solicitar importação
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </chakra.form>
    </Modal>
  )
}
